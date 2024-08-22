"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavSongsList = exports.addfavSongToList = exports.getSongs = exports.addsong = void 0;
const addMusic_1 = require("../models/addMusic");
const Aws = __importStar(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
if (!process.env.secretAccessKey || !process.env.accessKeyId) {
    throw new Error("env variable missing");
}
const awsAccessKeyId = process.env.accessKeyId;
const awsAccessSecretKey = process.env.secretAccessKey;
const s3 = new Aws.S3({
    region: "ap-south-1", // e.g., 'us-west-1'
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsAccessSecretKey,
});
const addsong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { songName, artist, Movie, img, audio } = req.body;
        const bufferImage = Buffer.from(img, "base64");
        const bufferSong = Buffer.from(audio, "base64");
        const bucketName = "vinays";
        const fileName = `product_${Date.now()}.jpg`;
        const fileName2 = `song${Date.now()}.mp3`;
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: bufferImage,
            ContentType: "image/jpeg",
            ACL: "public-read",
        };
        const params2 = {
            Bucket: bucketName,
            Key: fileName2,
            Body: bufferSong,
            ContentType: "audio/mpeg",
            ACL: "public-read",
        };
        const s3Image = yield s3.upload(params).promise();
        const ImgLOction = s3Image.Location;
        const s3Audio = yield s3.upload(params2).promise();
        const audioLocation = s3Audio.Location;
        const addMusic = new addMusic_1.addmusic({
            songName,
            artist,
            Movie,
            img: ImgLOction,
            audio: audioLocation,
        });
        addMusic.save();
        res.status(200).json(addMusic);
    }
    catch (error) {
        res.status(500).json("server error");
    }
});
exports.addsong = addsong;
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSongs = yield addMusic_1.addmusic.find();
        res.status(200).json(getSongs);
    }
    catch (error) {
        console;
        res.status(500).json("server Error");
    }
});
exports.getSongs = getSongs;
const addfavSongToList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const songId = req.body;
        const jwtToken = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(jwtToken);
        if (!jwtToken) {
            return res
                .status(401)
                .json({ message: "Access denied. No token provided." });
        }
        const decoded = jsonwebtoken_1.default.verify(jwtToken, "SECRET_KEY");
        console.log("Decoded payload:", decoded);
        if (!decoded || !decoded.id) {
            return res
                .status(401)
                .json({ message: "Access denied. No token provided." });
        }
        const favSong = new addMusic_1.addfavSong({
            songId: songId,
            userId: decoded.id,
        });
        yield favSong.save();
        res.status(200).json("Added to Fav List");
    }
    catch (error) {
        res.status(500).json("server error");
    }
});
exports.addfavSongToList = addfavSongToList;
const getFavSongsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const jwtToken = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!jwtToken) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    const decoded = jsonwebtoken_1.default.verify(jwtToken, "SECRET_KEY");
    console.log("Decoded payload:", decoded);
    if (!decoded || !decoded.id) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    const favSongsIds = yield addMusic_1.addfavSong.find({ userId: decoded.id });
    const songIds = favSongsIds.map((song) => song.songId);
    const favSongsDetails = yield addMusic_1.addmusic.find({ _id: { $in: songIds } });
    return res.status(200).json(favSongsDetails);
    console.log();
});
exports.getFavSongsList = getFavSongsList;

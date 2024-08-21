"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addfavSong = exports.addmusic = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const addMusic = new mongoose_1.default.Schema({
    songName: {
        type: String,
    },
    artist: {
        type: String,
    },
    Movie: {
        type: String,
    },
    img: {
        type: String,
    },
    audio: {
        type: String,
    },
});
const addFavList = new mongoose_1.default.Schema({
    songId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
});
const addmusic = mongoose_1.default.model("addmusic", addMusic);
exports.addmusic = addmusic;
const addfavSong = mongoose_1.default.model("addfavSong", addFavList);
exports.addfavSong = addfavSong;

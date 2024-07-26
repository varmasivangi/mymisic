"use strict";
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
exports.userLogin = exports.verifyUser = exports.addUserDetals = void 0;
const userDetailsModel_1 = require("../models/userDetailsModel");
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transportMail = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "varmathelegend996@gmail.com",
        pass: " bqqg wnae enpr rjeq",
    },
});
const addUserDetals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, createUserName, createPassword, confirmPassword, } = req.body;
    try {
        const isUserDetails = yield userDetailsModel_1.userDetails.findOne({ email });
        console.log(isUserDetails);
        if (!isUserDetails) {
            const generateOTP = () => {
                const otp = Math.floor(100000 + Math.random() * 900000);
                return otp;
            };
            const otp = generateOTP();
            const info = yield transportMail.sendMail({
                from: "varmathelegend996@gmail.com",
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<b>Hello world?${otp}</b>`, // html body
            });
            const userDetail = yield userDetailsModel_1.userDetails.create({
                name,
                email,
                phone,
                createUserName,
                createPassword,
                confirmPassword,
                isActive: false,
                otp: otp,
            });
            userDetail.save();
            res.status(200).json(userDetail);
        }
        else {
            res.status(401).json("Email already exist");
        }
    }
    catch (error) {
        res.status(500).json("server Error");
    }
});
exports.addUserDetals = addUserDetals;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const userDetailsstatus = yield userDetailsModel_1.userDetails.findOne({ email });
        if (userDetailsstatus) {
            if (userDetailsstatus.otp == otp) {
                userDetailsstatus.isActive = true;
                userDetailsstatus.save();
                res.status(200).json("OTP verified");
            }
            else {
                res.status(400).json("Invalid OtP");
            }
        }
        else {
            res.status(401).json("unauthorized");
        }
    }
    catch (error) {
        res.status(500).json("server Error");
    }
});
exports.verifyUser = verifyUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userDetailsValidate = yield userDetailsModel_1.userDetails.findOne({ email });
        if (userDetailsValidate) {
            if (userDetailsValidate.email == email &&
                userDetailsValidate.createPassword == password) {
                const token = jsonwebtoken_1.default.sign({ id: userDetailsValidate._id, email: userDetailsValidate.email }, "SECRET_KEY", {
                    expiresIn: "1h",
                });
                res.status(200).json({ jwt: token });
            }
            else {
                res.status(400).json("invalid user name or password");
            }
        }
    }
    catch (error) {
        res.status(500).json("server error");
    }
});
exports.userLogin = userLogin;

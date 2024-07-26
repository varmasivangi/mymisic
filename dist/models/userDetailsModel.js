"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userDetailsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    createUserName: {
        type: String,
        require: true
    },
    createPassword: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    },
    otp: {
        type: Number,
        require: true
    }
});
exports.userDetails = mongoose_1.default.model("userDetails", userDetailsSchema);

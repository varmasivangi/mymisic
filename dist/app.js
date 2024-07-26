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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userDetailsRoutes_1 = __importDefault(require("./routes/userDetailsRoutes"));
const app = (0, express_1.default)();
// import * as newName from "./controllers/userDetailsController"
dotenv_1.default.config();
const PORT = process.env.PORT || 7000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/userDetails", userDetailsRoutes_1.default);
app.use("/verifyOTP", userDetailsRoutes_1.default);
app.use("/userLogin", userDetailsRoutes_1.default);
function dbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://DummyBoy:15DbqkDOzrDrj8ok@cluster0.hurzcht.mongodb.net/mymusic");
            console.log("running on ", PORT);
        }
        catch (error) {
            console.log(error);
        }
    });
}
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("server started");
    yield dbConnection();
}));

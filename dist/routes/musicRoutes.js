"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const musicController_1 = require("../controllers/musicController");
const express_1 = __importDefault(require("express"));
const musicRouter = express_1.default.Router();
musicRouter.post("/addsong", musicController_1.addsong);
musicRouter.get("/getMusic", musicController_1.getSongs),
    musicRouter.post("/addFavSong", musicController_1.addfavSongToList);
musicRouter.get("/getFavSongs", musicController_1.getFavSongsList);
module.exports = musicRouter;

import { addsong,getSongs,addfavSongToList ,getFavSongsList} from "../controllers/musicController";

import express from "express"

const musicRouter = express.Router()

musicRouter.post("/addsong",addsong)

musicRouter.get("/getMusic",getSongs),

musicRouter.post("/addFavSong",addfavSongToList)
musicRouter.get("/getFavSongs",getFavSongsList)


export = musicRouter






import { addsong,getSongs } from "../controllers/musicController";

import express from "express"

const musicRouter = express.Router()

musicRouter.post("/addsong",addsong)

musicRouter.get("/getMusic",getSongs)


export = musicRouter






import mongoose from "mongoose";

const addMusic = new mongoose.Schema({
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

export const addmusic = mongoose.model("addmusic", addMusic);

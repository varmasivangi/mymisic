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

const addFavList = new mongoose.Schema({

    songId:{
      type:String,
      require:true
    },
    userId:{
      type:String,
      require:true

    }
  
})

const addmusic = mongoose.model("addmusic", addMusic);

const addfavSong = mongoose.model("addfavSong",addFavList)

export {addmusic,addfavSong}
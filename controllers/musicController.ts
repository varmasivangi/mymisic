import { addmusic, addfavSong } from "../models/addMusic";
import * as Aws from "aws-sdk";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { userDetails } from "../models/userDetailsModel";
dotenv.config();
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

export const addsong = async (req: any, res: any) => {
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

    const s3Image = await s3.upload(params).promise();
    const ImgLOction = s3Image.Location;

    const s3Audio = await s3.upload(params2).promise();
    const audioLocation = s3Audio.Location;
    const addMusic = new addmusic({
      songName,
      artist,
      Movie,
      img: ImgLOction,
      audio: audioLocation,
    });
    addMusic.save();
    res.status(200).json(addMusic);
  } catch (error) {
    res.status(500).json("server error");
  }
};

export const getSongs = async (req: any, res: any) => {
  try {
    const getSongs = await addmusic.find();

    res.status(200).json(getSongs);
  } catch (error) {
    console;
    res.status(500).json("server Error");
  }
};

export const addfavSongToList = async (req: any, res: any) => {
  try {
    const songId = req.body;
    const jwtToken = req.header("Authorization")?.split(" ")[1];

    console.log(jwtToken)

    if (!jwtToken) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded: any = jwt.verify(jwtToken, "SECRET_KEY");
    console.log("Decoded payload:", decoded);
    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const favSong = await new addfavSong({
      songId: songId,
      userId: decoded.id,
    });
    res.status(200).json("Added to Fav List");

    favSong.save();
  } catch (error) {
    res.status(500).json("server error");
  }
};

export const getFavSongsList = async (req: any, res: any) => {
  const jwtToken = req.header("Authorization")?.split(" ")[1];
  if (!jwtToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const decoded: any = jwt.verify(jwtToken, "SECRET_KEY");
  console.log("Decoded payload:", decoded);
  if (!decoded || !decoded.id) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const favSongsIds = await addfavSong.find({ userId: decoded.id });
    const songIds = favSongsIds.map((song: any) => song.songId); 

    const favSongsDetails = await addmusic.find({ _id: { $in: songIds } });

    return res.status(200).json(favSongsDetails);

  console.log()
};

import express from "express";
import dotEnv from "dotenv";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/userDetailsRoutes"
const app = express();
// import * as newName from "./controllers/userDetailsController"
dotEnv.config();

const PORT = process.env.PORT || 7000;
app.use(bodyparser.json())
app.use(cors())
app.use("/userDetails",router);
app.use("/verifyOTP",router)
app.use("/userLogin",router)

async function dbConnection() {
  try {
  
    await mongoose.connect("mongodb+srv://DummyBoy:15DbqkDOzrDrj8ok@cluster0.hurzcht.mongodb.net/mymusic");
    console.log("running on ",PORT)
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, async () => {
  console.log("server started");
  await dbConnection();
});
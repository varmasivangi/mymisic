import { userDetails } from "../models/userDetailsModel";
import nodeMailer from "nodemailer";

import jwt from "jsonwebtoken";

const transportMail = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: " varmasivangi949@gmail.com",
    pass: "kieh tgkk fkqr cdts",
  },
});

export const addUserDetals = async (req: any, res: any) => {
  const {
    name,
    email,
    phone,
    createUserName,
    createPassword,
    confirmPassword,
  } = req.body;

  
  console.log(req.body);
  try {
    const isUserDetails = await userDetails.findOne({ email });

    console.log(isUserDetails);

    if (!isUserDetails) {
      const generateOTP = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
      };
      const otp = generateOTP();
      const info = await transportMail.sendMail({
        from: "varmathelegend996@gmail.com",
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello world?${otp}</b>`, // html body
      });
      const userDetail = await userDetails.create({
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
    } else {
      res.status(401).json("Email already exist");
    }
  } catch (error) {
    res.status(500).json("server Error");
  }
};

export const verifyUser = async (req: any, res: any) => {
  try {
    const { email, otp } = req.body;

    const userDetailsstatus = await userDetails.findOne({ email });

    if (userDetailsstatus) {
      if (userDetailsstatus.otp == otp) {
        userDetailsstatus.isActive = true;

        userDetailsstatus.save();

        res.status(200).json("OTP verified");
      } else {
        res.status(400).json("Invalid OtP");
      }
    } else {
      res.status(401).json("unauthorized");
    }
  } catch (error) {
    res.status(500).json("server Error");
  }
};

export const userLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    console.log(password)

    const userDetailsValidate = await userDetails.findOne({ email });

    if (userDetailsValidate) {
      if (
        userDetailsValidate.email == email &&
        userDetailsValidate.createPassword == password
      ) {
        const token = jwt.sign(
          { id: userDetailsValidate._id, email: userDetailsValidate.email },
          "SECRET_KEY",
         
        );

        res.status(200).json({ jwt: token });
      } else {
        res.status(400).json("invalid user name or password");
      }
    }
  } catch (error) {
    res.status(500).json("server error");
  }
};

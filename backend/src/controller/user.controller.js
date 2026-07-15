import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.SECRET_KEY_FOR_ENCRPT);

import UserModel from "../models/user.model.js";
import {
  AlreadyExist,
  BadRequest,
  Created,
  InternalServerError,
  NotFound,
} from "../utils/response.js";
import { SendOtpMail } from "../utils/nodemailer.js";
import { generateToken } from "../utils/helper.js";

const Register = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) return AlreadyExist(res);
    const encryptedPass = cryptr.encrypt(password);


    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + 3 * 60 * 1000;
    const mailSent = await SendOtpMail(email , otp);

if(!mailSent){
  return InternalServerError(res,"OTP mail not sent");
}

    const userdata = await UserModel.create({
      name,
      email,
      password: encryptedPass,
      number,
      otp,
      otpExpire,
    });
    return Created(res, "Data Created");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const Read = async (req, res) => {
  try {
    const user = await UserModel.find();

    res.status(200).json({
      messege: "Data Fetched",
      success: true,
      user,
    });
  } catch (error) {
    return InternalServerError(res, "internal server error", error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) return NotFound(res, "user Not found");
    const decryptPass = cryptr.decrypt(user.password);
    if (decryptPass != password) {
      return BadRequest(res);
    }
    const token = generateToken(user._id)
       res.cookie('jwt',token, {
        maxAge: 30*24*60*60*10000, // Expires after 15 minutes (in milliseconds)
        httpOnly: true, // Protects against XSS attacks by hiding cookie from client-side JS
        secure:false, // Sends over HTTPS only in production
        sameSite: 'strict' // Helps protect against CSRF attacks
    });
    return Created(res, "login succesfull");
  } catch (error) {
    console.log(error , "abhayy")
    return InternalServerError(res, "internal Server Error", error);
  }
};

const VerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) return NotFound(res);
    if (otp !== user.otp) return BadRequest(res, "invalid otp");
    if (user.otpExpire < Date.now()) return BadRequest(res, "otp expired");
    ((user.isVerified = true), (user.otp = undefined));
    user.otpExpire = undefined;
    await user.save();
    return Created(res, "Data Created");

    return Created(res, "otp verified succesfully");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const ResendOTP = async (req, res) => {
  try {
    return Created(res, "Data Created");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const ForgotPassword = async (req, res) => {
  try {
    return Created(res, "Data Created");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const ResetPassword = async (req, res) => {
  try {
    return Created(res, "Data Created");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const AddAddress = async (req, res) => {
  try {
    return Created(res, "Data Created");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const UpdateAddress = async (req, res) => {
  try {
    return Created(res, "Data Created");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const DeleteAddress = async (req, res) => {
  try {
    return Created(res, "Data Created");
  } catch (error) {
    return InternalServerError(res, "internal Server Error", error);
  }
};

const deletebyId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID:", id);

    const user = await UserModel.findById(id);

    if (!user) {
      return NotFound(res);
    }

    await UserModel.findByIdAndDelete(id);

    return Created(res, "Data Deleted Successfully");
  } catch (error) {
    return InternalServerError(res, "Data Not Deleted", error);
  }
};

export {
  Register,
  Login,
  VerifyOTP,
  ResendOTP,
  ForgotPassword,
  ResetPassword,
  AddAddress,
  UpdateAddress,
  DeleteAddress,
  Read,
  deletebyId,
};

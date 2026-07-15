import express from "express";

import {
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
  deletebyId
} from "../controller/user.controller.js";

const UserRouter = express.Router();

// Authentication
UserRouter.post("/register", Register);
UserRouter.get("/get", Read);
UserRouter.post("/login", Login);
UserRouter.delete("/delete/:id", deletebyId);
UserRouter.post("/verify-otp", VerifyOTP);
UserRouter.post("/resend-otp", ResendOTP);
UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.post("/reset-password", ResetPassword);

// Address
UserRouter.post("/address", AddAddress);
UserRouter.put("/address/:addressId", UpdateAddress);
UserRouter.delete("/address/:addressId", DeleteAddress);


export default UserRouter;
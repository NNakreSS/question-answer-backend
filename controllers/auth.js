import User from "../models/User.js";
// async error wrapper
import asyncErrorWrapper from "express-async-handler";
// helpoers authorization
import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.js";
import validateUserInput from "../helpers/input/inputHelpers.js";
import CustomError from "../helpers/errors/CustomError.js";
import comparePassword from "../helpers/authorization/comparePassword.js";

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(newUser, res);
});

const tokentest = (req, res, next) => {
  res.json({
    success: true,
    message: "welcomme",
  });
};

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password))
    return next(new CustomError("Please check your inputs", 400));

  //? get user
  const user = await User.findOne({ email: email }).select("+password");

  //? check password
  if (!comparePassword(password, user.password))
    return next(new CustomError("Please check your credentials"), 400);

  sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "production",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: req.user,
  });
};

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "image upload success",
    data: user,
  });
});

export { register, tokentest, getUser, login, logout, imageUpload };

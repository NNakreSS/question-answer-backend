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

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: req.user,
  });
};

export { register, tokentest, getUser, login };

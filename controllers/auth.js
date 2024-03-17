import User from "../models/User.js";
// async error wrapper
import asyncErrorWrapper from "express-async-handler";

const register = asyncErrorWrapper(async (req, res, next) => {
  // fake post data
  const name = "NAKRES bool";
  const email = "naakress@gmail.com";
  const password = "456";

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    data: newUser,
  });
});

const errorTest = (req, res, next) => {
  // Some codes
  return next(new TypeError());
  // Some codes
};

export { register, errorTest };

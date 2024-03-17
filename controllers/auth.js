import User from "../models/User.js";
// async error wrapper
import asyncErrorWrapper from "express-async-handler";

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = newUser.generateJwtFromUser();
  console.log(token);

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

import asyncErrorWrapper from "express-async-handler";
import User from "../models/User.js";

const getUserById = asyncErrorWrapper(async (req, res, next) => {
  const user = req.data;

  return res.status(200).json({
    success: true,
    data: user,
  });
});

const getAllUsers = asyncErrorWrapper(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    data: users,
  });
});

export { getUserById, getAllUsers };

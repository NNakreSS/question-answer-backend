import User from "../models/User.js";
import asyncErrorWrapper from "express-async-handler";

const getUserById = asyncErrorWrapper(async (req, res, next) => {
  const user = req.data;

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export { getUserById };

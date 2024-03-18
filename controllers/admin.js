import asyncErrorWrapper from "express-async-handler";
import User from "../models/User.js";

const blockUser = asyncErrorWrapper(async (req, res, next) => {
  const user = req.data;
  user.blocked = !user.blocked;

  console.log(user);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Block / Unbloc successfully",
  });
});

const deleteUser = asyncErrorWrapper(async (req, res, next) => {
  const user = req.data;
  await user.deleteOne();
  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export { blockUser, deleteUser };

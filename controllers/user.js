import CustomError from "../helpers/errors/CustomError.js";
import User from "../models/User.js";
import asyncErrorWrapper from "express-async-handler";

const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user)
    return next(new CustomError("There is not such user with that id"), 400);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export { getSingleUser };

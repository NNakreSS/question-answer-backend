import User from "../models/User.js";
// async error wrapper
import asyncErrorWrapper from "express-async-handler";
// helpoers authorization
import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.js";

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

export { register, tokentest };

import User from "../models/User.js";
// async error wrapper
import asyncErrorWrapper from "express-async-handler";
// helpers
import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.js";
import validateUserInput from "../helpers/input/inputHelpers.js";
import CustomError from "../helpers/errors/CustomError.js";
import comparePassword from "../helpers/authorization/comparePassword.js";
import sendEmail from "../helpers/libraries/sendEmail.js";

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

const forgotpassword = asyncErrorWrapper(async (req, res, next) => {
  const { email: resetEmail } = req.body;
  const user = await User.findOne({ email: resetEmail });
  if (!user)
    return next(new CustomError("There is no user with that email", 400));

  const resetPassWordToken = user.getResetPasswordTokenFromUser();

  await user.save();

  const resetPasswordUrl = `https://localhost:5000/api/auth/resetpassword?reset_password_token=${resetPassWordToken}`;

  const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p> This <a href="${resetPasswordUrl}" target="_blank">link</a> will expire in 1 hour</p>
  `;

  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset Your Password",
      html: emailTemplate,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return next(new CustomError("Email could Not be Sent", 500));
  }
});

const resetPassword = asyncErrorWrapper(async (req, res, next) => {
  const { reset_password_token } = req.query;
  const { password } = req.body;

  if (!reset_password_token)
    return next(new CustomError("Please Provide a valid token", 400));

  const user = await User.findOne({
    resetPasswordToken: reset_password_token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(new CustomError("Invalid Token or Session Expired", 404));

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

const editDetails = asyncErrorWrapper(async (req, res, next) => {
  const editInformation = req.body;
  const id = req.user.id;
  const user = await User.findByIdAndUpdate(id, editInformation, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export {
  register,
  tokentest,
  getUser,
  login,
  logout,
  imageUpload,
  forgotpassword,
  resetPassword,
  editDetails,
};

import asyncErrorWrapper from "express-async-handler";
import CustomError from "../../helpers/errors/CustomError.js";
import User from "../../models/User.js";
import Question from "../../models/Question.js";

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new CustomError("User not found", 404));

  req.data = user;
  return next();
});

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) return next(new CustomError("Question not found", 404));

  req.data = question;
  return next();
});

export { checkUserExist, checkQuestionExist };

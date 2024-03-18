import CustomError from "../helpers/errors/CustomError.js";
import Question from "../models/Question.js";
import asyncErrorWrapper from "express-async-handler";

const getAllQuestions = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Question",
  });
};

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    author: req.user.id,
  });

  return res.status(200).json({
    success: true,
    data: question,
  });
});

export { getAllQuestions, askNewQuestion };

import CustomError from "../helpers/errors/CustomError.js";
import Question from "../models/Question.js";
import asyncErrorWrapper from "express-async-handler";

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  const questions = await Question.find();
  res.status(200).json({
    success: true,
    data: questions,
  });
});

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

const getQuestionById = asyncErrorWrapper(async (req, res, next) => {
  const question = req.data;

  return res.status(200).json({
    success: true,
    data: question,
  });
});

const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  let question = req.data;
  const { title, content } = req.body;

  question.title = title;
  question.content = content;

  question = await question.save();

  return res.status(200).json({
    success: true,
    data: question,
  });
});

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question = req.data;

  await question.deleteOne();

  return res.status(200).json({
    success: true,
    data: "Deleted question",
  });
});

export {
  getAllQuestions,
  askNewQuestion,
  getQuestionById,
  editQuestion,
  deleteQuestion,
};

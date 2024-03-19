import CustomError from "../helpers/errors/CustomError.js";
import Question from "../models/Question.js";
import asyncErrorWrapper from "express-async-handler";

const getAllQuestions = asyncErrorWrapper(async (req, res, next) =>
  res.status(200).json(res.queryResults)
);

const addNewQuestion = asyncErrorWrapper(async (req, res, next) => {
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

const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question = req.data;

  if (question.likes.includes(req.user.id))
    return next(new CustomError("Question already liked"), 400);

  question.likes.push(req.user.id);
  question.likeCount = question.likes.length;
  await question.save();

  return res.status(200).json({
    success: true,
    message: "Liked question",
    data: question,
  });
});

const unLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question = req.data;

  if (!question.likes.includes(req.user.id))
    return next(new CustomError("Question already not liked"), 400);

  const index = question.likes.indexOf(req.user.id);
  question.likes.splice(index, 1);
  question.likeCount = question.likes.length;
  await question.save();

  return res.status(200).json({
    success: true,
    message: "Unliked question",
    data: question,
  });
});

export {
  getAllQuestions,
  addNewQuestion,
  getQuestionById,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  unLikeQuestion,
};

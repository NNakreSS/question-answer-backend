import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import asyncErrorWrapper from "express-async-handler";
import CustomError from "../helpers/errors/CustomError.js";

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id: question_id } = req.params;
  const user_id = req.user.id;
  const information = req.body;

  const answer = await Answer.create({
    ...information,
    question: question_id,
    author: user_id,
  });

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const getAllAnswersByQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question_id = req.params.id;
  const question = await Question.findById(question_id).populate("answers");
  const asnwers = question.answers;

  res.status(200).json({
    success: true,
    count: asnwers.length,
    data: asnwers,
  });
});

export { addNewAnswerToQuestion, getAllAnswersByQuestion };

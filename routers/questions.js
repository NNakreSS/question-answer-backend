import express from "express";

//? middlewares
import {
  getAccessToRoute,
  getQuestionOwnerAccess,
} from "../middlewares/authorization/auth.js";
import { checkQuestionExist } from "../middlewares/database/dbErrorHelpers.js";

//? controllers
import {
  getAllQuestions,
  addNewQuestion,
  getQuestionById,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  unLikeQuestion,
} from "../controllers/question.js";

//? answer router
import answer from "./answer.js";
import Question from "../models/Question.js";
import questionQueryMiddleware from "../middlewares/query/questionQuery.js";
import answerQueryMiddleware from "../middlewares/query/answerQuery.js";

const router = express.Router();

//? get methods
router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "author",
      select: "name profile_image",
    },
  }),
  getAllQuestions
);

router.get(
  "/:id",
  [
    checkQuestionExist,
    answerQueryMiddleware(Question, {
      population: [
        {
          path: "author",
          select: "name profile_image",
        },
        {
          path: "answers",
          select: "content author",
        },
      ],
    }),
  ],
  getQuestionById
);

router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/unlike",
  [getAccessToRoute, checkQuestionExist],
  unLikeQuestion
);

//? post methods
router.post("/add", getAccessToRoute, addNewQuestion);

//? put methods
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);

//? delete methods
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);

//? answer router
router.use("/:id/answers", checkQuestionExist, answer);

export default router;

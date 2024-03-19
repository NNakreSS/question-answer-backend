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

const router = express.Router();

//? get methods
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getQuestionById);
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

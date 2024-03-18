import express from "express";
import {
  getAccessToRoute,
  getQuestionOwnerAccess,
} from "../middlewares/authorization/auth.js";
import { checkQuestionExist } from "../middlewares/database/dbErrorHelpers.js";
//? controllers
import {
  getAllQuestions,
  askNewQuestion,
  getQuestionById,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  unLikeQuestion
} from "../controllers/question.js";

const router = express.Router();

//? get methods
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getQuestionById);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get("/:id/unlike", [getAccessToRoute, checkQuestionExist], unLikeQuestion);

//? post methods
router.post("/ask", getAccessToRoute, askNewQuestion);

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

export default router;

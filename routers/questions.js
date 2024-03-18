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
} from "../controllers/question.js";

const router = express.Router();

//? get methods
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getQuestionById);

//? post methods
router.post("/ask", getAccessToRoute, askNewQuestion);

//? put methods
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);

export default router;

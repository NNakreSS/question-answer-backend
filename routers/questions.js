import express from "express";
import { getAccessToRoute } from "../middlewares/authorization/auth.js";
import { checkQuestionExist } from "../middlewares/database/dbErrorHelpers.js";
//? controllers
import {
  getAllQuestions,
  askNewQuestion,
  getQuestionById,
} from "../controllers/question.js";

const router = express.Router();

//? get methods
router.get("/", getAllQuestions);
router.get("/question/:id", checkQuestionExist, getQuestionById);

//? post methods
router.post("/ask", getAccessToRoute, askNewQuestion);

export default router;

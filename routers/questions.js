import express from "express";
import { getAccessToRoute } from "../middlewares/authorization/auth.js";
import { askNewQuestion } from "../controllers/question.js";

const router = express.Router();

//? controllers
import { getAllQuestions } from "../controllers/question.js";

//? get methods
router.get("/", getAllQuestions);

//? post methods
router.post("/ask", getAccessToRoute, askNewQuestion);

export default router;

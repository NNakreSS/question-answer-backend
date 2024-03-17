import express from "express";
const router = express.Router();

//? controllers
import { getAllQuestions } from "../controllers/question.js";

//? get methods
router.get("/", getAllQuestions);

router.get("/delete", (req, res) => {
  res.send("<h1>Questions Delete Page</h1>");
});

export default router;

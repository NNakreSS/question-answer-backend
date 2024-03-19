import { Router } from "express";

//? middlewares
import { getAccessToRoute } from "../middlewares/authorization/auth.js";
import { checkAnswerExist } from "../middlewares/database/dbErrorHelpers.js";

//? controllers
import {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getAnswerById,
} from "../controllers/answer.js";

const router = Router({ mergeParams: true });

//? get methods
router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkAnswerExist, getAnswerById);

//? post methods
router.post("/", getAccessToRoute, addNewAnswerToQuestion);

export default router;

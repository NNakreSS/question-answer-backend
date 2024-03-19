import { Router } from "express";

//? middlewares
import { getAccessToRoute } from "../middlewares/authorization/auth.js";

//? controllers
import {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
} from "../controllers/answer.js";

const router = Router({ mergeParams: true });

//? get methods
router.get("/", getAllAnswersByQuestion);

//? post methods
router.post("/", getAccessToRoute, addNewAnswerToQuestion);

export default router;

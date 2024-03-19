import { Router } from "express";

//? middlewares
import {
  getAccessToRoute,
  getAnswerOwnerAccess,
} from "../middlewares/authorization/auth.js";
import { checkAnswerExist } from "../middlewares/database/dbErrorHelpers.js";

//? controllers
import {
  addNewAnswerToQuestion,
  editAnswer,
  getAllAnswersByQuestion,
  getAnswerById,
  deleteAnswer,
  likeAnswer,
  unLikeAnswer
} from "../controllers/answer.js";

const router = Router({ mergeParams: true });

//? get methods
router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkAnswerExist, getAnswerById);
router.get(
  "/:answer_id/like",
  [checkAnswerExist, getAccessToRoute],
  likeAnswer
);
router.get(
  "/:answer_id/unlike",
  [checkAnswerExist, getAccessToRoute],
  unLikeAnswer
);

//? post methods
router.post("/", getAccessToRoute, addNewAnswerToQuestion);

//? put methods
router.put(
  "/:answer_id/edit",
  [checkAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);

//? delete methods
router.delete(
  "/:answer_id/delete",
  [checkAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  deleteAnswer
);

export default router;

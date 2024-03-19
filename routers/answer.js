import { Router } from "express";
import { getAccessToRoute } from "../middlewares/authorization/auth.js";
import { addNewAnswerToQuestion } from "../controllers/answer.js";

const router = Router({ mergeParams: true });

//? get methods
router.get("/", function (req, res, next) {
  res.status(200).json({
    success: true,
    message: "Answers",
    data: req.data.answers,
  });
});

//? post methods
router.post("/", getAccessToRoute, addNewAnswerToQuestion);

export default router;

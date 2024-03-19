import { Router } from "express";

const router = Router();

//? get methods
router.get("/", function (req, res, next) {
  res.status(200).json({
    success: true,
    message: "Answers",
    data: req.data.answers,
  });
});

export default router;

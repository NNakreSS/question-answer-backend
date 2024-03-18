import express from "express";
//routers imports
import questions from "./questions.js";
import auth from "./auth.js";
import user from "./user.js";

//? /api
const router = express.Router();

// routers
router.use("/questions", questions);
router.use("/auth", auth);
router.use("/users", user);

export default router;

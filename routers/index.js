import express from "express";
//routers imports
import questions from "./questions.js";
import auth from "./auth.js";
import user from "./user.js";
import admin from "./admin.js";

//? /api
const router = express.Router();

// routers
router.use("/questions", questions);
router.use("/auth", auth);
router.use("/users", user);
router.use("/admin", admin);

export default router;

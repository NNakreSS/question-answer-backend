import express from "express";
//? controllers
import { register , errorTest } from "../controllers/auth.js";

const router = express.Router();

//? post methods
router.post("/register", register);
router.get("/error", errorTest);

export default router;

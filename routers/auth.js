import express from "express";
//? controllers
import { register } from "../controllers/auth.js";

const router = express.Router();

//? post methods
router.post("/register", register);

export default router;

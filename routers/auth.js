import express from "express";
//? controllers
import { register , tokentest } from "../controllers/auth.js";

const router = express.Router();

//? post methods
router.post("/register", register);
router.get("/tokentest", tokentest);

export default router;

import express from "express";
//? controllers
import { register, tokentest } from "../controllers/auth.js";
//? middlewares
import { getAccessToRoute } from "../middlewares/authorization/auth.js";

const router = express.Router();

//? post methods
router.post("/register", register);
router.get("/tokentest", getAccessToRoute, tokentest);

export default router;

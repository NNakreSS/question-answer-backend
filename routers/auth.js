import express from "express";
//? controllers
import { register, tokentest, getUser, login } from "../controllers/auth.js";
//? middlewares
import { getAccessToRoute } from "../middlewares/authorization/auth.js";

const router = express.Router();

//? post methods
router.post("/register", register);
router.post("/login", login);

//? get methods
router.get("/profile", getAccessToRoute, getUser);

export default router;

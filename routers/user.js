import { Router } from "express";
import { getUserById } from "../controllers/user.js";
// middlewares
import { checkUserExist } from "../middlewares/database/dbErrorHelpers.js";

const router = Router();

//? get methods
router.get("/:id", checkUserExist, getUserById);

export default router;

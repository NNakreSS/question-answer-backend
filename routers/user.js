import { Router } from "express";
import { getUserById, getAllUsers } from "../controllers/user.js";
// middlewares
import { checkUserExist } from "../middlewares/database/dbErrorHelpers.js";

const router = Router();

//? get methods
router.get("/", getAllUsers);
router.get("/:id", checkUserExist, getUserById);

export default router;

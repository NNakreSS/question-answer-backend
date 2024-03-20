import { Router } from "express";
import { getUserById, getAllUsers } from "../controllers/user.js";
// middlewares
import { checkUserExist } from "../middlewares/database/dbErrorHelpers.js";
import userQueryMiddleware from "../middlewares/query/userQuery.js";
import User from "../models/User.js";

const router = Router();

//? get methods
router.get("/", userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExist, getUserById);

export default router;

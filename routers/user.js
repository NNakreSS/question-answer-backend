import { Router } from "express";
import { getSingleUser } from "../controllers/user.js";

const router = Router();

//? get methods
router.get("/:id", getSingleUser);

export default router;

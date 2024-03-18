import { Router } from "express";
import {
  getAccessToRoute,
  getAdminAccess,
} from "../middlewares/authorization/auth.js";

//? get methods

const router = Router();

router.use([getAccessToRoute, getAdminAccess]);
router.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "admin page",
  });
});

export default router;

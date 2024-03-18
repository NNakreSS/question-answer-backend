import { Router } from "express";
import {
  getAccessToRoute,
  getAdminAccess,
} from "../middlewares/authorization/auth.js";
import { blockUser  , deleteUser} from "../controllers/admin.js";
import { checkUserExist } from "../middlewares/database/dbErrorHelpers.js";

const router = Router();

router.use([getAccessToRoute, getAdminAccess]);

//? get methods
router.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Admin Page",
  });
});

router.get("/block/:id", checkUserExist, blockUser);

// delete methods
router.delete("/delete/:id", checkUserExist, deleteUser);

export default router;

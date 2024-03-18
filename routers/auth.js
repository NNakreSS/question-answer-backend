import express from "express";
//? controllers
import {
  register,
  tokentest,
  getUser,
  login,
  logout,
  imageUpload,
  forgotpassword,
  resetPassword,
} from "../controllers/auth.js";
//? middlewares
import { getAccessToRoute } from "../middlewares/authorization/auth.js";
import profileImageUpload from "../middlewares/libraries/profileImageUpload.js";

const router = express.Router();

//? post methods
router.post("/register", register); // register account
router.post("/login", login); // login account
router.post(
  "/upload",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
); // user profile image upload
router.post("/forgotpassword", forgotpassword); // forgot password

//? put methods
router.put("/resetpassword", resetPassword); // reset password

//? get methods
router.get("/profile", getAccessToRoute, getUser);
router.get("/logout", getAccessToRoute, logout);

export default router;

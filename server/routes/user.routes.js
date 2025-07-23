import express from "express"
import { Router } from "express";
import {getUserProfile, logOut, register, updateProfile} from "../controllers/user.controller.js";
import {login} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router=express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/profile").get(isAuthenticated,getUserProfile);
router.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"), updateProfile);





export default router;
import express from "express"
import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getCreatorCourse } from "../controllers/courses.controller.js";


const router=express.Router();
router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getCreatorCourse);


export default router;
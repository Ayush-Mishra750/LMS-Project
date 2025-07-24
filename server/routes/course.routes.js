import express from "express"
import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getCreatorCourses } from "../controllers/courses.controller.js";


const router=express.Router();
router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);


export default router;
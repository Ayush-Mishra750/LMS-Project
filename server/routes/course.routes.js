import express from "express"
import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, editCourse, getCourse, getCreatorCourses } from "../controllers/courses.controller.js";
import  upload  from "../utils/multer.js";


const router=express.Router();
router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(isAuthenticated,getCourse);




export default router;
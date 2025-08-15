import { Course } from "../models/courses.model.js";
import {User} from "../models/user.model.js"
import { Lecture } from "../models/lecture.model.js";

import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const createCourse = async (req, res) => {
  try {
    console.log(req.body);
    const { courseTitle, category } = req.body;
    console.log(courseTitle, category);
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "course title and category is required",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: "course created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to create course",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      res.status(404).json({
        courses: [],
        message: "courses not found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to create course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;

    const thumbnail = req.file;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let courseThumbnail = course.courseThumbnail; // fallback to existing

    if (thumbnail) {
      // delete old thumbnail if it exists
      if (typeof course.courseThumbnail === 'string') {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      // upload new thumbnail
      const uploaded = await uploadMedia(thumbnail.path);
      courseThumbnail = uploaded?.secure_url;
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail:courseThumbnail,
    };
    console.log(updateData)
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    console.log(course)

    return res.status(200).json({
      course,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error("Edit course error:", error);
    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const {courseId} = req.params;
    let course = await Course.findById(courseId);
    // console.log(course)
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
      return res.status(200).json({
      course,
      message: "Course updated successfully",
    });  
  } catch (error) {
    console.error("Edit course error:", error);
    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};

export const createLecture=async(req,res)=>{
  try {
    const {lectureTitle}=req.body;
    const {courseId}=req.params;
// console.log(lectureTitle,courseId)
    if(!lectureTitle ||!courseId){
      return res.status(400).json({
        message:"Lecture title is required"
      })
    }
//creating lecture
    const lecture=await Lecture.create({lectureTitle});
    const course=await Course.findById(courseId);
    // console.log("creating success")
    if(course){
      course.lectures.push(lecture._id);
      await course.save();
    }
    console.log("created successfully");
    return res.status(201).json({
      lecture,
      message:"lecture created successfully"
    })
    
  } catch (error) {
     return res.status(500).json({
      message: "Failed to update course",
    });
  }
}

export const getCourseLecture=async(req,res)=>{
try {
  const {courseId}=req.params;
    let course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
      return res.status(200).json({
      lectures:course.lectures,
      message: "Course updated successfully",
    });  

  
} catch (error) {
   console.error("Edit course error:", error);
    return res.status(500).json({
      message: "Failed to update course",
    });
}
}
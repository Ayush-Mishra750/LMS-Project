import { Course } from "../models/courses.model.js";

export const createCourse = async (req, res) => {
  try {
    console.log(req.body);
    const { courseTitle, category } = req.body;
    console.log(courseTitle,category);
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

export const getCreatorCourse=async(req,res)=>{
  try {
    const userId=req.id;
    const courses=await Course.find({creator:userId});
    if(!courses){
      res.status(404).json({
        courses:[],
        message:"courses not found"
      })
    }
    return res.status(200).json({
      courses,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"failed to create course",
    })

  }
}
import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditCourseMutation, useGetCourseQuery } from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
   const params=useParams();
  const courseId=params.courseId;
  // const {data:courseById,isLoading:isLoadingById}=useGetCourseQuery(courseId);
  // const course=courseById?.course;
  // console.log(course)
  // useEffect(()=>{
  //   if(course){
  //     setInput({
  //        courseTitle: course.courseTitle,
  //   subTitle:course.subTitle,
  //   description:course.description ,
  //   category: course.category,
  //   courseLevel: course.courseLevel,
  //   coursePrice: course.coursePrice,
  //   courseThumbnail: ""
  //     })
  //   }
  // },[courseById])
  const navigate = useNavigate();
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
 
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  const [editCourse, { data, isLoading, isSuccess }] = useEditCourseMutation();
  // console.log("data",data)
  const updateCourseHandler=async()=>{
    const formData=new FormData();
    formData.append("courseTitle",input.courseTitle); 
    formData.append("subTitle",input.subTitle);
    formData.append("description",input.description);
    formData.append("category",input.category);
    formData.append("courseLevel",input.courseLevel);
    formData.append("coursePrice",input.coursePrice);
    formData.append("courseThumbnail",input.courseThumbnail);
    
  await editCourse({formData,courseId});
}
// console.log(editCourse)
useEffect(()=>{
  if(isSuccess){
    toast.success(data.message||"course update successfully")
    navigate('/admin/course');
  }
 
},[isSuccess])


// console.log("thumb",input)

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
console.log(input.coursePrice)
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   const { name, value } = e.target;
  //   setInput({ ...input, [name]: value });
  // };
  //   const isPublished = false;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make Changes to Your courses. Click save when you done.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white shadow-md rounded-md p-4 space-y-6 w-full max-w-5xl mx-auto">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Ex: FullStack Developer"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-medium mb-1">Subtitle</label>
            <input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter course subtitle"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows={7}
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter course description"
            />
          </div>

          {/* Category, Difficulty, Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="React.js">React.js</SelectItem>
                    <SelectItem value="Next.js">Next.js</SelectItem>
                    <SelectItem value="FullStack Development">
                      FullStack Development
                    </SelectItem>
                    <SelectItem value="MERN stack">MERN stack</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Difficulty Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-full"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-full sm:w-fit"
              onChange={selectThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Course Thumbnail Preview"
                className="mt-2 w-full max-w-xs h-32 sm:h-40 object-contain rounded-md border bg-gray-50 shadow"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Unpublish
              </Button>
              <Button variant="destructive">Remove Course</Button>
            </div>

            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                variant="outline"
                onClick={() => navigate("/admin/course")}
              >
                Cancel
              </Button>  

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={updateCourseHandler}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

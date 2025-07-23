import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
    const [createCourse, { data, isSuccess, isLoading ,isError}] =
      useCreateCourseMutation();
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [Category, setCourseCategory] = useState("");
  
  // const isLoading=false;
  // display toast

  const getSelectedCategory = (value) => {
    setCourseCategory(value);
  };
  const createCourseHandler = async () => {
  await createCourse({
    courseTitle,
    category: Category,
  });
};


  useEffect( ()=>{
    if(isSuccess){
        // console.log('course created')
        toast.success(data?.message ||"course created")
        setCourseTitle("");
       setCourseCategory("");
    }
    if(isError){
        toast.error(data.message||"Invalid input ")
    }

},[isSuccess,isError])
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course ,add some basic course details for your new course
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          totam aliquam, ex inventore error tempore ipsam exercitationem natus
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="your course name"
            
          />
        </div>
        <div>
          <Label>Category</Label>
         <Select value={Category} onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
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
        <div className="flex items-center gap-2 ">
          <Button variant={"outline"} onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Create "
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

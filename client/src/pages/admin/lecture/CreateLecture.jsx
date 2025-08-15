import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateLectureMutation, useGetCourseLectureQuery } from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
// import { error } from "console";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CreateLecture() {
  const [lectureTitle, setLectureTitle] = useState("");
    const params=useParams();
    const courseId=params.courseId;
    const navigate=useNavigate();
//   const [description, setDescription] = useState("");
//   const [video, setVideo] = useState(null);

  const [createLecture,{data,isLoading,isSuccess,error}]=useCreateLectureMutation("");
  const {data:lectureData,isLoading:LectureLoading}=useGetCourseLectureQuery(courseId);
  console.log(lectureData);
const createLectureHandler=async()=>{
await createLecture({lectureTitle,courseId})
}
console.log("chal gya");
useEffect(()=>{
  if(isSuccess){
    toast.success(data.message||"lecture created successfully");
  }
  if(error){
    toast.error(error.data.message);
  }
},[isSuccess,error])
 return (
     <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add lecture ,add some basic lecture details for your new lecture
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
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture Title Name"
            
          />
        </div>
      
        <div className="flex items-center gap-2 ">
          <Button variant={"outline"} onClick={() => navigate(`/admin/course/${courseId}`)}>
            Back To Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler} >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Create lecture "
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

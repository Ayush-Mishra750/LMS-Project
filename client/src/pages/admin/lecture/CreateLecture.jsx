import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

export default function CreateLecture() {
    const params=useParams();
    const courseId=params.courseId;
    const navigate=useNavigate();
  const [lecture, setLectureTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [video, setVideo] = useState(null);
  const isLoading=false;
const createLectureHandler=()=>{

}

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
            value={lecture}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture Title Name"
            
          />
        </div>
      
        <div className="flex items-center gap-2 ">
          <Button variant={"outline"} onClick={() => navigate(`/admin/course/${courseId}`)}>
            Back To Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
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

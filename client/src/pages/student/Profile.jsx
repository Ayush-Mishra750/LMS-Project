import { Dialog } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi"; // ✅ Correct
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading } = useLoadUserQuery();
  const [updateUser, { data:updateUserData, isLoading:updateIsLoading , isError, isSuccess }] = useUpdateUserMutation();

 

  useEffect(() => {
    if (isSuccess) {
      toast.success(updateUserData?.message || "Profile updated");
      navigate("/my-profile");
    }
    if (isError) {
      toast.error(isError?.message || "Profile not updated");
    }
  }, [isError, isSuccess,updateUserData]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  
  //changes in user profile data
  const updateUserHandler = async () => {
    // console.log(name,profilePhoto);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);

  };
  if (isLoading) return <h1>Profile Loading ...</h1>;
  const { user } = data;
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-md mt-18">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar>
          <AvatarImage
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt="@shadcn"
            className="rounded-full object-cover w-10" // ✅ Makes image circular
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Name: {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Email:{user.email}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Role: {user.role}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className={"bg-black text-white mt-3"}>
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/*"
                    className={"col-span-3"}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateIsLoading}
                  type="submit"
                  onClick={updateUserHandler}
                >
                  {updateIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 text-center">
        <div className="bg-blue-100 dark:bg-gray-800 rounded-lg py-4">
          <p className="text-xl font-bold text-blue-700 dark:text-white">
            {user.enrolledCourses}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled</p>
        </div>
        <div className="bg-green-100 dark:bg-gray-800 rounded-lg py-4">
          <p className="text-xl font-bold text-green-700 dark:text-white">
            {user.completedCourses}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
        </div>
        <div className="bg-purple-100 dark:bg-gray-800 rounded-lg py-4 col-span-2 sm:col-span-1">
          <p className="text-xl font-bold text-purple-700 dark:text-white">
            ⭐ 4.5
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
        </div>
      </div>
      <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols gap-4 items-center">
        {user.enrolledCourses.length === 0 ? (
          <h1>You haven't enrolled yet</h1>
        ) : (
          user.enrolledCourses.map((course) => (
            <Course course={course} key={course._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;

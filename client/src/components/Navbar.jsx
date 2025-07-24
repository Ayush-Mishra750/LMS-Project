import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DarkMode from "@/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogOutUserMutation();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    await logoutUser();
  };
  console.log(user);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "user logged out");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-gray-200 fixed top-0 left-0 right-0 duration-300 sticky z-10">
      {/* // desktop ke liye  */}
      <div className="max-w-7xl mx-auto hidden  md:flex justify-between items-center gp-10 h-full cursor-pointer" >
        <div className="flex items-center gap-3">
          <School size={"30"} />
         <Link to={'/'}> <h1 className="hidden md:block font-extrabold text-2xl" >
            E-Learning
          </h1></Link>
        </div>
        {/* //dark and bright mode ke liye */}
        <div className="flex items-between gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                    className="rounded-full object-cover w-10" // ✅ Makes image circular
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>
                  <Link to="/my-profile">My Account</Link>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-profile">Profile</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logOutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>SignUp</Button>
            </div>
          )}

          <DarkMode />
        </div>
      </div>
      {/* mobile device ke liye */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileDevice />
      </div>
    </div>
  );
};

export default Navbar;

export const MobileDevice = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-300"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="font-extrabold text-xl cursor-pointer">
            E-Learning
          </SheetTitle>
          <DarkMode className="bg-amber-300" />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 ml-3 ">
          <span className="hover:bg-slate-300 rounded">My-Learning</span>
          <span className="hover:bg-slate-300 rounded">Edit Profile</span>
          <p className="hover:bg-slate-300 rounded">Log Out</p>
        </nav>
        {role === "instructor" && (
          <SheetFooter className="mb-100">
            <Button type="submit">Dashboard</Button>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

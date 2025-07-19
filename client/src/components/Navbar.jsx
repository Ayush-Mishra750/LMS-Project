import { Menu, School } from "lucide-react";
import React from "react";
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DarkMode from "@/DarkMode";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* // desktop ke liye  */}
      <div className="max-w-7xl mx-auto hidden  md:flex justify-between items-center gp-10 h-full">
        <div className="flex items-center gap-3">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>
        {/* //dark and bright mode ke liye */}
        <div className="flex items-between gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full object-cover w-10" // ✅ Makes image circular
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>Log out</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>SignUp</Button>
            </div>
          )}

         <DarkMode/>
        </div>
      </div>
      {/* mobile device ke liye */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileDevice/>
      </div>
      
    </div>
  );
};

export default Navbar;


export const MobileDevice=()=>{
    return (
       
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-300" variant="outline">
<Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-row">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
        
    )
}
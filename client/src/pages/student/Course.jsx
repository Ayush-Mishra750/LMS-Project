import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "lucide-react";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://imgs.search.brave.com/dPFPvTozY0s5Sy_0WhdMKk-ajcLlP7PMhVMpSLPhnXA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMjMw/MjAyMTQzNjM2L05F/WFQtanMtdHV0b3Jp/YWwtMS5wbmc"
          alt="Next Js course"
          className="w-full  h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className={'mt-2'}>
        <h1 className="hover:underline font-bold text-lg truncate">
          Next js complete course in 2025
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full object-cover w-10" //  Makes image circular
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Ayush Mishra</h1>
          </div>
          <div className="flex flex-col items-start gap-2">
  <Badge className="bg-blue-600 text-black px-7 py-1 text-xs rounded-full">
   Advance
  </Badge>
 
</div>
        </div>
        <div>
            <span>
                499
            </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;

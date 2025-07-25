import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";


const HeroSection = () => {
  return (
    
     <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 px-6 text-center"> */}
  <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
    <h1 className="text-white text-5xl font-extrabold leading-tight mb-4">
      Find the Perfect Course to Level Up
    </h1>
    <p className="text-white/80 dark:text-gray-300 text-lg mb-10">
      Explore curated content, learn from top instructors, and boost your skills for the future you deserve.
    </p>

    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-xl items-center bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 mb-6"
    >
      <input
        type="text"
        placeholder="What do you want to learn?"
        className="flex-grow border-none bg-transparent px-6 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
      />
      <button
        type="submit"
        className="bg-blue-600 dark:bg-gray-700 text-white px-6 py-4 font-medium hover:bg-blue-700 dark:hover:bg-gray-600 transition"
      >
        Search
      </button>
    </form>

    <button className="bg-white text-blue-600 dark:bg-gray-200 rounded-full px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-300 transition">
      Explore All Courses
    </button>
   </div> 
</div>


  );
};

export default HeroSection;

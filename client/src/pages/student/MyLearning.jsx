import React from "react";
import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [1,2];
  return (
  <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
  <h1 className="font-bold text-2xl text-center mb-6">MY LEARNING</h1>
  <div className="my-5">
    {isLoading ? (
      <MyLearningSkeleton />
    ) : myLearningCourses.length === 0 ? (
      <p className="text-center text-gray-500">You are not enrolled in any courses.</p>
    ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 gap-4">
        {
            [1,2].map((course ,index)=> <Course key={index}/>)
        }
     </div>
            
                
    )}
  </div>
</div>

  );
};

export default MyLearning;

const MyLearningSkeleton = () => {
    return(
  <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols gap-4 items-center">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
    )
};

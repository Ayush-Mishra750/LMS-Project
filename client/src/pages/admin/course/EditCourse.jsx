import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CourseTab from './CourseTab';

const EditCourse= ({ courseData, onSave, onRemove }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(courseData?.title || '');
  const [subtitle, setSubtitle] = useState(courseData?.subtitle || '');
  const [description, setDescription] = useState(courseData?.description || '');

 

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Add detail information regarding course</h2>
        <button
          onClick={() => navigate('/admin/lecture')}
          className="text-blue-600 text-sm underline hover:text-blue-800"
        >
          Go to lectures page
        </button>
      </div>
          <CourseTab/>
      
    </div>
  );
};

export default EditCourse;

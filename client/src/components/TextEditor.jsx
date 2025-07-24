import React from "react";
//baad me change karuga
const TextEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };
  return (
    <textarea
      rows={7}
      name="description"
         value={input.description}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
      placeholder="Enter course description"
    />
  );
};

export default TextEditor;

import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { AppBar } from "../components/AppBar";
import { Link } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = () => {
    axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title,
      content
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => {
      
      window.location.href = "/blogs";   // ✅ go back to blogs list
    })
    .catch(() => {
      
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* AppBar with Publish button */}
      <div className="border-b flex justify-between items-center px-10 py-4">
        <Link to={"/blogs"}><div className="text-xl cursor-pointer font-bold">Medium </div></Link>
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
        >
          Publish
        </button>
      </div>

      {/* Editor */}
      <div className="flex justify-center mt-10 px-6">
        <div className="w-full max-w-3xl">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-5xl font-bold outline-none placeholder-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Tell your story..."
            className="w-full h-[500px] mt-6 text-xl outline-none placeholder-gray-400 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

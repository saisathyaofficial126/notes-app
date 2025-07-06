import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa6";
import toast from "react-hot-toast";

function ViewNotes() {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.note.notes);
  const note = allNotes.find((p) => p._id === id);

  // Copy Content
  const copyToClipboard = () => {
    navigator.clipboard.writeText(note.content);
    toast.success("Note copied to clipboard!");
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg relative">
        {/* Title (Read-Only) */}
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-100 cursor-not-allowed"
          value={note.title}
          disabled
        />

        {/* Content (Read-Only) */}
        <div className="mt-6 relative">
          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-3 text-yellow-500 hover:text-gray-700"
          >
            <FaCopy size={20} />
          </button>

          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 bg-gray-100 cursor-not-allowed"
            value={note.content}
            disabled
            rows={10}
          />
        </div>
      </div>
    </>
  );
}

export default ViewNotes;

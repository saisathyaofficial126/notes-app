import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../redux/notesSlice";
import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";

function Notes() {
  // Function to format date & time
  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `Date : ${formattedDate} Time : ${formattedTime}`;
  }

  const notes = useSelector((state) => state.note.notes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Filtered Notes List
  const filterdData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete Note Function
  function handleDelete(noteId) {
    dispatch(removeFromNotes(noteId));
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        {/* Search Bar */}
        <input
          type="search"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Notes List */}
        <div className="mt-6 flex flex-col gap-5">
          {filterdData.length > 0 &&
            filterdData.map((note) => (
              <div
                key={note._id}
                className="border border-gray-300 p-4 rounded-lg shadow-md bg-white flex flex-col gap-2"
              >
                {/* Title & Content */}
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-900">{note.title}</h2>
                  <p className="text-gray-700">{note.content}</p>
                </div>

                {/* Date & Time */}
                <p className="text-sm text-gray-500">{formatDateTime(note.createdAt)}</p>

                {/* Icons (Buttons) */}
                <div className="flex items-center gap-4 mt-2 self-end">
                  {/* Edit Note */}
                  <a href={`/?noteId=${note._id}`} className="text-blue-500 hover:text-blue-600">
                    <FaEdit size={18} />
                  </a>

                  {/* View Note */}
                  <a href={`/notes/${note._id}`} className="text-green-500 hover:text-green-600">
                    <FaEye size={18} />
                  </a>

                  {/* Delete Note */}
                  <button onClick={() => handleDelete(note._id)} className="text-red-500 hover:text-red-600">
                    <FaTrash size={18} />
                  </button>

                  {/* Copy Note Content */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(note?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <FaCopy size={18} />
                  </button>

                  {/* Share Note */}
                  <button
                    onClick={() => {
                      const shareableLink = `${window.location.origin}/notes/${note._id}`;
                      navigator.clipboard.writeText(shareableLink);
                      toast.success("Link Copied!");
                    }}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    <FaShareAlt size={18} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Notes;

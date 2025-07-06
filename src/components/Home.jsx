import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToNotes, updateToNotes } from '../redux/notesSlice';

function Home() {
  // Redux state se notes lena
  const allNotes = useSelector((state) => state.note.notes);
  const [title, setTitle] = useState('');
  const [noteData, setNoteData] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get('noteId');
  const dispatch = useDispatch();

  useEffect(() => {
    if (noteId) {
      const note = allNotes.find((p) => p._id === noteId);
      if (note) {
        setTitle(note.title);
        setNoteData(note.content);
      }
    }
  }, [noteId]); // Note ID change hone pe effect chalega

  function createNote() {
    const note = {
      title: title,
      content: noteData,
      _id: noteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (noteId) {
      // Note update karna
      dispatch(updateToNotes(note));
    } else {
      // Naya note create karna
      dispatch(addToNotes(note));
    }

    // Form reset
    setTitle('');
    setNoteData('');
    setSearchParams({});
  }

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        {/* Input & Button Row */}
        <div className="flex flex-row gap-5 items-center">
          <input
            type="text"
            className="w-2/3 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createNote}
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all"
          >
            {noteId ? 'Update Note' : 'Create Note'}
          </button>
        </div>

        {/* Textarea for note content */}
        <div className="mt-6">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={noteData}
            placeholder="Enter note here..."
            onChange={(e) => setNoteData(e.target.value)}
            rows={8}
          />
        </div>
      </div>
    </>
  );
}

export default Home;

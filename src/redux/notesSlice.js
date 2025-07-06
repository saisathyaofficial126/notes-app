import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Initial state with localStorage handling
const initialState = {
  notes: (() => {
    try {
      const storedNotes = localStorage.getItem('notes');
      return storedNotes ? JSON.parse(storedNotes) : [];
    } catch (error) {
      console.error('Failed to parse notes from localStorage:', error);
      return [];
    }
  })(),
};

// Redux slice for managing notes
export const notesSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // Add a new note
    addToNotes: (state, action) => {
      const note = action.payload;
      const exists = state.notes.some((item) => item._id === note._id);

      if (!exists) {
        state.notes.push(note);
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success('Note Created Successfully');
      } else {
        toast.error('Note with this ID already exists');
      }
    },

    // Update an existing note
    updateToNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);

      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success('Note Updated Successfully');
      } else {
        toast.error('Note not found');
      }
    },

    // Remove a note by ID
    removeFromNotes: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((item) => item._id === noteId);

      if (index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success('Note Deleted Successfully');
      } else {
        toast.error('Note not found');
      }
    },

    // Reset all notes
    resetAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem('notes');
      toast.success('All Notes Cleared');
    },
  },
});

// Exporting actions and reducer
export const { addToNotes, updateToNotes, resetAllNotes, removeFromNotes } = notesSlice.actions;

export default notesSlice.reducer;

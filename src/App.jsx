import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewNotes from './components/ViewNotes';
import Notes from './components/Notes';

// Routes setup using react-router-dom
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar /> {/* Navbar visible on all pages */}
        <Home /> {/* Home page */}
      </div>
    ),
  },
  {
    path: '/notes',
    element: (
      <div>
        <Navbar />
        <Notes /> {/* Notes listing page */}
      </div>
    ),
  },
  {
    path: '/notes/:id',
    element: (
      <div>
        <Navbar />
        <ViewNotes /> {/* View a specific note */}
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} /> {/* Provides routing to the app */}
    </>
  );
}

export default App;

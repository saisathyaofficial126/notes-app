import React from 'react';
import { NavLink } from 'react-router-dom';

// Function to add active class styling
const linkClass = ({ isActive }) =>
  `relative pb-2 ${
    isActive
      ? "after:content-[''] after:absolute after:w-full after:h-1 after:bg-blue-500 after:bottom-0 after:left-0"
      : ''
  }`;

function Navbar() {
  return (
    // Navbar container with flexbox for horizontal alignment
    <div className="flex flex-row justify-center gap-12 p-5 bg-gray-800 text-white">
      
      {/* Home Link */}
      <NavLink to="/" className={linkClass}>
        HOME
      </NavLink>

      {/* Notes Link */}
      <NavLink to="/notes" className={linkClass}>
        NOTES
      </NavLink>

    </div>
  );
}

export default Navbar;

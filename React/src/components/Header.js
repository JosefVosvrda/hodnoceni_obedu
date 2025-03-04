import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Smazání JWT cookie
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Přesměrování na login stránku
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center shadow-md">
      <div className="flex space-x-4">
        <Link to="/homepage" className="hover:underline">Hlavní stránka</Link>
        <Link to="/my-reviews" className="hover:underline">Moje hodnocení</Link>
        <Link to="/summaries" className="hover:underline">Statistiky</Link>
      </div>
      
      <div className="relative">
        <FaUserCircle 
          className="text-2xl cursor-pointer" 
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2">
            <button 
              onClick={handleLogout} 
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Odhlásit se
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

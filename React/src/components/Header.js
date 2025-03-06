import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    // Získání aktuálního stavu newsletteru
    fetch("/api/newsletter", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setNewsletterSubscribed(data.newsletter))
      .catch(() => console.error("Nepodařilo se načíst stav newsletteru"));
  }, []);

  const handleNewsletterChange = async () => {
    const newState = !newsletterSubscribed;
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newsletter: newState }),
      });
      
      if (response.ok) {
        setNewsletterSubscribed(newState);
        alert(newState ? "Newsletter je úspěšně odebírán" : "Přestal jste newsletter odebírat");
      } else {
        throw new Error("Chybná odpověď ze serveru");
      }
    } catch (error) {
      alert("Něco se pokazilo, zkuste to znovu");
      console.error(error);
    }
  };

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
            <div className="px-4 py-2 flex items-center">
              <input 
                type="checkbox" 
                checked={newsletterSubscribed} 
                onChange={handleNewsletterChange} 
                className="mr-2"
              />
              <span>newsletter</span>
            </div>
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
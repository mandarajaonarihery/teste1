import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Header = ({ toggleMobileSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const adminName = "Admin";
  const adminInitial = adminName.charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-30">
      {/* Left section : Burger + Logo */}
      <div className="flex items-center gap-3">
        {/* Burger (mobile only) */}
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden text-gray-700 hover:text-gray-900"
        >
          <Menu size={28} />
        </button>

        {/* Logo */}
        <Link
          to="/admin/dashboard"
          className="flex items-center font-bold text-lg text-gray-800"
        >
          <svg
            className="h-9 w-9 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 16v-2m8-6h2M4 12H2m15.364-7.364l1.414-1.414M6.222 17.778l-1.414 1.414M17.778 17.778l1.414 1.414M6.222 6.222 4.808 4.808"
            />
          </svg>
          <span className="hidden sm:block">Gestion de Paie</span>
        </Link>
      </div>

      {/* Right section : User menu */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-100 text-blue-700 font-semibold">
            {adminInitial}
          </div>
          <span className="hidden md:block font-medium">{adminName}</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-30 overflow-hidden">
            <Link
              to="/admin/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Profil
            </Link>
            <button
              onClick={() => {
                alert("Déconnexion...");
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-20 text-red-500 hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Briefcase,
  Clock,
  Star,
  Wallet,
  Percent,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  TrendingDown,
  FileText,  
} from "lucide-react";

const links = [
  { label: "Tableau de bord", icon: <Home size={20} />, to: "/admin/dashboard" },
  { label: "Employés", icon: <Users size={20} />, to: "/admin/employes" },
  { label: "Poste", icon: <Briefcase size={20} />, to: "/admin/poste" },
  {
    label: "Gestion des paies",
    icon: <Wallet size={20} />,
    children: [
      { label: "Bulletin", to: "/admin/paies", icon: <FileText size={20} /> },
      { label: "Primes", to: "/admin/primes", icon: <Star size={20} /> },
      { label: "Retenues", to: "/admin/retenues", icon: <TrendingDown size={20} /> },
      { label: "Cotisations", to: "/admin/cotisations", icon: <Percent size={20} /> },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const toggleSubMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
      isActive
        ? "bg-blue-100 text-blue-800 border-l-4 border-blue-600 shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl border-r z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b bg-gradient-to-r from-blue-100 to-blue-50">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <button
            className="text-gray-700 hover:bg-gray-200 p-2 rounded-md transition-colors"
            onClick={toggleMobileSidebar}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 flex flex-col space-y-1 px-2">
          {links.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => toggleSubMenu(item.label)}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {openMenus[item.label] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {openMenus[item.label] && (
                  <div className="ml-6 flex flex-col border-l border-gray-200 pl-2 mt-1 mb-2">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={linkClass}
                        onClick={toggleMobileSidebar}
                      >
                        <span className="w-6 h-6 flex items-center justify-center">{child.icon}</span>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={toggleMobileSidebar}
              >
                <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex md:flex-col h-full border-r bg-white shadow-sm transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b bg-gradient-to-r from-blue-100 to-blue-50">
          {isOpen && <h2 className="text-lg font-bold text-gray-800">Menu</h2>}
          <button
            className="text-gray-700 hover:bg-gray-200 p-2 rounded-md transition-colors"
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-4 flex flex-col space-y-1 px-2">
          {links.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => !isOpen && setHoveredMenu(item.label)}
                onMouseLeave={() => !isOpen && setHoveredMenu(null)}
              >
                <button
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors ${
                    isOpen ? "justify-between" : "justify-center"
                  }`}
                  onClick={() => isOpen && toggleSubMenu(item.label)}
                >
                  <span className={`flex items-center ${isOpen ? "gap-3" : ""}`}>
                    <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                    {isOpen && <span>{item.label}</span>}
                  </span>
                  {isOpen &&
                    (openMenus[item.label] ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                </button>

                {/* Sous-menu en mode étendu */}
                {isOpen && openMenus[item.label] && (
                  <div className="ml-6 flex flex-col border-l border-gray-200 pl-2 mt-1 mb-2">
                    {item.children.map((child) => (
                      <NavLink key={child.to} to={child.to} className={linkClass}>
                        <span className="w-6 h-6 flex items-center justify-center">{child.icon}</span>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}

                {/* Sous-menu en mode réduit (au survol) */}
                {!isOpen && hoveredMenu === item.label && (
                  <div className="absolute left-full top-0 ml-1 w-56 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200">
                    <div className="px-3 py-2 font-medium text-gray-700 border-b border-gray-100 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                      {item.label}
                    </div>
                    <div className="flex flex-col">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? "bg-blue-100 text-blue-800 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                          }
                        >
                          <span className="w-6 h-6 flex items-center justify-center">{child.icon}</span>
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* Mobile toggle button */}
      {!isMobileOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      )}
    </>
  );
};

export default Sidebar;

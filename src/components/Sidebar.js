import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Briefcase,
  Calendar,
  Clock,
  Star,
  Wallet,
  History,
  Percent,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const links = [
  {
    label: "Tableau de bord",
    icon: <Home size={20} />,
    to: "/admin/dashboard",
  },
  {
    label: "Employés",
    icon: <Users size={20} />,
    to: "/admin/employes",
  },
  {
    label: "Poste",
    icon: <Briefcase size={20} />,
    to: "/admin/poste",
  },
  {
    label: "Retenues",
    icon: <Calendar size={20} />,
    to :"admin/retenues",
  },
  {
    label: "Paies",
    icon: <Wallet size={20} />,
    to : "/admin/paies",
  },
  {
    label: "Cotisations",
    icon: <Percent size={20} />,
    to: "/admin/cotisations",
  },
  {
    label: "Paramètres",
    icon: <Settings size={20} />,
    children: [
      { label: "Types de contrats", to: "/admin/parametres/contrats" },
      { label: "Postes standards", to: "/admin/parametres/postes" },
      { label: "Taux & Cotisations", to: "/admin/parametres/taux" },
      { label: "Généraux", to: "/admin/parametres/general" },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({}); // pour gérer sous-sections ouvertes

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const toggleSubMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
     ${
       isActive
         ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
         : "text-gray-700 hover:bg-gray-50"
     }`;

  return (
    <>
      {/* ---- Mobile Sidebar ---- */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-40 transform transition-transform duration-300 md:hidden
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <button className="text-gray-600" onClick={toggleMobileSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 flex flex-col space-y-1 flex-1">
          {links.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => toggleSubMenu(item.label)}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {openMenus[item.label] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {openMenus[item.label] && (
                  <div className="ml-8 flex flex-col">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={linkClass}
                        onClick={toggleMobileSidebar}
                      >
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
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* ---- Desktop Sidebar ---- */}
      <aside
        className={`hidden md:flex md:flex-col h-ful  border-r border-gray-200l bg-white  transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {isOpen && <h2 className="text-lg font-bold text-gray-800">Menu</h2>}
          <button className="text-gray-600" onClick={toggleSidebar}>
            {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-4 flex flex-col space-y-1 flex-1">
          {links.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                    isOpen ? "" : "justify-center"
                  }`}
                  onClick={() => toggleSubMenu(item.label)}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {isOpen && <span>{item.label}</span>}
                  </span>
                  {isOpen &&
                    (openMenus[item.label] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}
                </button>
                {openMenus[item.label] && isOpen && (
                  <div className="ml-8 flex flex-col">
                    {item.children.map((child) => (
                      <NavLink key={child.to} to={child.to} className={linkClass}>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* ---- Mobile Toggle Button ---- */}
      {!isMobileOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;

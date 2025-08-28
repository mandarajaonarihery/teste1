"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, Bell, Search, User, DollarSign, FileText, Clock } from "lucide-react"

const Header = ({ toggleMobileSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const adminName = "Admin"
  const adminInitial = adminName.charAt(0).toUpperCase()

  const notifications = [
    {
      id: 1,
      type: "user",
      title: "Nouvel employé ajouté",
      message: "Marie Dubois a été ajoutée au système",
      time: "Il y a 2 heures",
      unread: true,
      icon: User,
    },
    {
      id: 2,
      type: "payment",
      title: "Paie traitée",
      message: "La paie de janvier a été traitée avec succès",
      time: "Il y a 5 heures",
      unread: true,
      icon: DollarSign,
    },
    {
      id: 3,
      type: "document",
      title: "Rapport généré",
      message: "Le rapport mensuel est prêt à télécharger",
      time: "Il y a 1 jour",
      unread: false,
      icon: FileText,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleLogout = () => {
    setShowLogoutConfirm(true)
    setIsDropdownOpen(false)
  }

  const confirmLogout = async () => {
    setIsLoggingOut(true)
    setShowLogoutConfirm(false)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    window.location.href = "/"
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <Link
            to="/admin/dashboard"
            className="flex items-center font-bold text-xl text-gray-800 hover:text-blue-600 transition-colors"
          >
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 16v-2m8-6h2M4 12H2m15.364-7.364l1.414-1.414M6.222 17.778l-1.414 1.414M17.778 17.778l1.414 1.414M6.222 6.222 4.808 4.808"
                />
              </svg>
            </div>
            <span className="hidden sm:block">Gestion de Paie</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-700">Tout marquer comme lu</button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              notification.type === "user"
                                ? "bg-green-100 text-green-600"
                                : notification.type === "payment"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <IconComponent size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                              {notification.unread && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <Clock size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="px-4 py-3 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors focus:outline-none"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
                {adminInitial}
              </div>
              <span className="hidden md:block font-medium">{adminName}</span>
              <svg
                className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{adminName}</p>
                  <p className="text-sm text-gray-500">jaoninasissiethephanie@gmail.com</p>
                </div>
                <Link
                  to="/admin/profile_admin"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Mon Profil
                </Link>
                <Link
                  to="/admin/settings"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Paramètres
                </Link>
                <hr className="border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmer la déconnexion</h3>
            <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoggingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Déconnexion en cours...</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header


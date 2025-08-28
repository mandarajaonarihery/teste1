"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Shield, Settings, Camera, Edit3, Save, X } from "lucide-react"

export default function MonProfil() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    nom: "JAONINA",
    prenom: "Sissie",
    email: "jaoninasissiethephanie@gmail.com",
    telephone: "+33 1 23 45 67 89",
    adresse: "123 Rue de la Paix, 75001 Paris",
    poste: "Administrateur Système",
    dateEmbauche: "15 Janvier 2020",
    departement: "IT & Sécurité",
  })

  const [tempData, setTempData] = useState(profileData)

  const handleEdit = () => {
    setIsEditing(true)
    setTempData(profileData)
  }

  const handleSave = () => {
    setProfileData(tempData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const stats = [
    { label: "Années d'expérience", value: "4+", icon: Calendar },
    { label: "Projets gérés", value: "127", icon: Settings },
    { label: "Équipes supervisées", value: "8", icon: User },
    { label: "Taux de satisfaction", value: "98%", icon: Shield },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-1">Gérez vos informations personnelles et paramètres</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit3 size={16} />
              Modifier
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={16} />
                Sauvegarder
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X size={16} />
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Profile Card */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {profileData.prenom.charAt(0)}
                    {profileData.nom.charAt(0)}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <Camera size={12} />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profileData.prenom} {profileData.nom}
                </h3>
                <p className="text-gray-600 mb-3 text-sm">{profileData.poste}</p>
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  En ligne
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex-1">
              <h4 className="text-base font-semibold text-gray-900 mb-3">Statistiques</h4>
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                        <stat.icon size={14} className="text-blue-600" />
                      </div>
                      <span className="text-gray-700 text-xs">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Information Details */}
          <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Informations Personnelles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Prénom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.prenom}
                      onChange={(e) => handleInputChange("prenom", e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-1.5">
                      <User size={14} className="text-gray-400" />
                      <span className="text-gray-900 text-sm">{profileData.prenom}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.nom}
                      onChange={(e) => handleInputChange("nom", e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-1.5">
                      <User size={14} className="text-gray-400" />
                      <span className="text-gray-900 text-sm">{profileData.nom}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-1.5">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-gray-900 text-sm">{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.telephone}
                      onChange={(e) => handleInputChange("telephone", e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-1.5">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-gray-900 text-sm">{profileData.telephone}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Adresse</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.adresse}
                      onChange={(e) => handleInputChange("adresse", e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-1.5">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-gray-900 text-sm">{profileData.adresse}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Informations Professionnelles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Poste</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.poste}
                      onChange={(e) => handleInputChange("poste", e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-1.5">
                      <Settings size={14} className="text-gray-400" />
                      <span className="text-gray-900 text-sm">{profileData.poste}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Département</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.departement}
                      onChange={(e) => handleInputChange("departement", e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-1.5">
                      <Shield size={14} className="text-gray-400" />
                      <span className="text-gray-900 text-sm">{profileData.departement}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date d'embauche</label>
                  <div className="flex items-center gap-2 p-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-gray-900 text-sm">{profileData.dateEmbauche}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Sécurité</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">Authentification à deux facteurs</h5>
                    <p className="text-xs text-gray-600">Sécurisez votre compte avec 2FA</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </div>

                <button className="w-full md:w-auto px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Changer le mot de passe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
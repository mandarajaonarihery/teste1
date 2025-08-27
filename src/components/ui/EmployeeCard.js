import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64 flex flex-col items-center text-center">
      {/* Photo */}
      <img
        src={employee.profileFile}
        alt={`${employee.nom} ${employee.prenom}`}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />

      {/* Nom et prénom */}
      <h2 className="text-lg font-bold text-gray-800">
        {employee.nom} {employee.prenom}
      </h2>

      {/* Poste */}
      <p className="text-gray-600 mt-1">{employee.poste?.titre}</p>

      {/* Contact */}
      <p className="text-gray-500 mt-1">{employee.contact}</p>

      {/* Statut */}
      <span
        className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
          employee.statusEmploye === "actif"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {employee.statusEmploye}
      </span>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => onEdit(employee)}
          className="text-blue-600 hover:text-blue-800"
          title="Modifier"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(employee)}
          className="text-red-600 hover:text-red-800"
          title="Supprimer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

// src/components/modalComponents/AddBulletinForm.js
import React, { useState, useEffect } from "react";
import { getEmployes } from "../../service/employeService";
import { addBulletin } from "../../service/bulletinService";

const AddBulletinForm = ({ onClose, onAdded }) => {
  const [employeId, setEmployeId] = useState(null);
  const [employeSearch, setEmployeSearch] = useState("");
  const [employes, setEmployes] = useState([]);
  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await getEmployes(1, 10000);
        // Flatten des employés actifs
        const allEmployes = Object.values(response.data).flatMap(group => group.actif);
        setEmployes(allEmployes);
        setFilteredEmployes(allEmployes);
      } catch (err) {
        console.error("Erreur récupération employés :", err);
      }
    };
    fetchEmployes();
  }, []);

  const handleEmployeChange = (value) => {
    setEmployeSearch(value);
    setShowSuggestions(true);

    if (!value.trim()) {
      setFilteredEmployes(employes);
      return;
    }

    const filtered = employes.filter(
      (emp) =>
        emp.nom.toLowerCase().includes(value.toLowerCase()) ||
        emp.prenom.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployes(filtered);
  };

  const handleSelectEmploye = (emp) => {
    setEmployeSearch(`${emp.nom} ${emp.prenom}`);
    setEmployeId(Number(emp.id)); // conversion en nombre
    setShowSuggestions(false);
    };
    
const handleSubmit = async (e) => {
  e.preventDefault();

  const id = parseInt(employeId, 10); // conversion en entier
  if (!id || id <= 0) {
    setError("Veuillez sélectionner un employé valide");
    return;
  }

  try {
    await addBulletin(id); // envoi correct
    if (onAdded) onAdded();
    onClose();
  } catch (err) {
    console.error(err);
    setError(err.message || "Erreur lors de l'ajout du bulletin");
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-lg font-bold mb-4">Ajouter un bulletin</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Employé</label>
            <input
              type="text"
              value={employeSearch}
              onChange={(e) => handleEmployeChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Rechercher un employé..."
              className="w-full border rounded px-3 py-2"
              required
            />
            {showSuggestions && filteredEmployes.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-200 w-full max-h-40 overflow-y-auto rounded mt-1 shadow">
                {filteredEmployes.map((emp) => (
                  <li
                    key={emp.id}
                    onClick={() => handleSelectEmploye(emp)}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {emp.nom} {emp.prenom}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBulletinForm;

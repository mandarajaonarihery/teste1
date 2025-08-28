// src/components/modalComponents/AddRetenueForm.js
import React, { useState, useEffect } from "react";
import { addRetenue } from "../../service/retenueService";
import { getEmployes } from "../../service/employeService";
import { useSnackbar } from "../ui/SnackbarContext"; 
const AddRetenueForm = ({ onClose, onAdded }) => {
  const [type, setType] = useState("");
  const [montant, setMontant] = useState("");
  const [motif, setMotif] = useState("");
  const [employeId, setEmployeId] = useState("");
  const [employeSearch, setEmployeSearch] = useState("");
  const [employes, setEmployes] = useState([]);
  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { showSnackbar } = useSnackbar();
  // Récupération des employés
  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await getEmployes(1, 10000);
        const allEmployes = Object.values(response.data).flatMap(group =>
          Object.values(group).flat()
        );
        setEmployes(allEmployes);
        setFilteredEmployes(allEmployes);
      } catch (err) {
        console.error("Erreur lors de la récupération des employés", err);
      }
    };
    fetchEmployes();
  }, []);

  // Recherche d’employé
  const handleEmployeChange = (value) => {
    setEmployeSearch(value);
    setShowSuggestions(true);
    if (!value.trim()) {
      setFilteredEmployes(employes);
      return;
    }
    const filtered = employes.filter(emp =>
      emp.nom.toLowerCase().includes(value.toLowerCase()) ||
      emp.prenom.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployes(filtered);
  };

  const handleSelectEmploye = (emp) => {
    setEmployeSearch(`${emp.nom} ${emp.prenom}`);
    setEmployeId(emp.id);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!type || !montant || !motif || !employeId) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      await addRetenue({
        type,
        montant: Number(montant),
        motif,
        employeId: Number(employeId),
      });
      if (onAdded) onAdded();
      showSnackbar("Retenue ajoutée avec succès", "success");
      onClose();
    } catch (err) {
      console.error(err);
      showSnackbar("Erreur lors de l'ajout de la retenue", "error");
      setError(
        err.response?.data?.message?.join?.(", ") || "Erreur lors de l'ajout de la retenue"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-lg font-bold mb-4">Ajouter une retenue</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">-- Sélectionnez un type --</option>
              <option value="avance Salaire">Avance Salaire</option>
              <option value="prêt">Prêt</option>
              <option value="Amende administrative">Amende administrative</option>
            </select>
          </div>

          {/* Montant */}
          <div>
            <label className="block text-sm font-medium mb-1">Montant</label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              placeholder="20000"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Motif */}
          <div>
            <label className="block text-sm font-medium mb-1">Motif</label>
            <input
              type="text"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Employé */}
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
                {filteredEmployes.map(emp => (
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

          {/* Actions */}
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

export default AddRetenueForm;

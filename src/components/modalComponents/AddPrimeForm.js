// src/pages/Primes/AddPrimeForm.js
import React, { useState, useEffect } from "react";
import { createPrime } from "../../service/primeService";
import { getEmployes } from "../../service/employeService";
import { useSnackbar } from "../ui/SnackbarContext"; 
const AddPrimeForm = ({ onClose, onAdded }) => {
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");
  const [employeId, setEmployeId] = useState("");
  const [employeSearch, setEmployeSearch] = useState("");
  const [employes, setEmployes] = useState([]);
  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await getEmployes(1, 10000);

        // 🔥 transformer la réponse en tableau plat
        const allEmployes = Object.values(response.data)
          .flatMap((group) => Object.values(group).flat());

        setEmployes(allEmployes);
        setFilteredEmployes(allEmployes);
      } catch (error) {
        console.error("Erreur lors de la récupération des employés", error);
      }
    };
    fetchEmployes();
  }, []);

  const handleEmployeChange = (value) => {
    setEmployeSearch(value);
    setShowSuggestions(true);

    if (value.trim() === "") {
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
    setEmployeId(emp.id);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const primeData = { nom, montant, employeId: parseInt(employeId, 10) };
      await createPrime(primeData);
      showSnackbar("Prime créée avec succès", "success");
      if (onAdded) onAdded();
      onClose();
    } catch (err) {
      setError(err.message || "Erreur lors de la création de la prime");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-md relative">
      <h2 className="text-lg font-bold mb-4">Ajouter une prime</h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Punctualité, Rendement..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Montant</label>
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="30000"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Employé</label>
          <input
            type="text"
            value={employeSearch}
            onChange={(e) => handleEmployeChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full border rounded px-3 py-2"
            placeholder="Rechercher un employé..."
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

        <div className="flex justify-end gap-2">
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
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPrimeForm;

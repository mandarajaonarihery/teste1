// src/components/modalComponents/AddBulletinForm.js
import React, { useState, useEffect } from "react";
import { getEmployes } from "../../service/employeService";
import { addBulletin, getBulletins } from "../../service/bulletinService";
import { useSnackbar } from "../ui/SnackbarContext";

const AddBulletinForm = ({ onClose, onAdded }) => {
  const [employeSearch, setEmployeSearch] = useState("");
  const [employes, setEmployes] = useState([]);
  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUnpaidEmployes = async () => {
      try {
        // Récupérer tous les employés actifs
        const response = await getEmployes(1, 10000);
        const allEmployes = Object.values(response.data).flatMap(group => group.actif);

        // Récupérer les bulletins du mois courant
        const bulletinsRes = await getBulletins(1, 1000); // page=1, limit=1000
        const bulletinsMois = bulletinsRes.data || [];
        const paidIds = bulletinsMois.map(b => b.employe.id);

        // Ne garder que les employés non payés
        const unpaidEmployes = allEmployes.filter(emp => !paidIds.includes(emp.id));

        setEmployes(unpaidEmployes);
        setFilteredEmployes(unpaidEmployes);
      } catch (err) {
        console.error("Erreur récupération employés :", err);
      }
    };

    fetchUnpaidEmployes();
  }, []);

  // Filtrage auto-complétion
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
    setSelectedEmploye(emp);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmploye?.id) {
      setError("Veuillez sélectionner un employé valide");
      return;
    }

    try {
      await addBulletin(selectedEmploye.id);
      showSnackbar("Bulletin créé avec succès ✅", "success");
      if (onAdded) onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Erreur lors de l'ajout du bulletin");
      showSnackbar("Erreur lors de l’ajout du bulletin ❌", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-lg font-bold mb-4">Ajouter un bulletin</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Sélection Employé */}
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
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                  >
                    {emp.profileFile && (
                      <img
                        src={emp.profileFile}
                        alt="Profil"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span>{emp.nom} {emp.prenom} — {emp.poste.titre}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Infos auto-complétées */}
          {selectedEmploye && (
            <div className="grid grid-cols-2 gap-3">
              {selectedEmploye.profileFile && (
                <div className="col-span-2 flex justify-center mb-2">
                  <img
                    src={selectedEmploye.profileFile}
                    alt="Profil"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium">Matricule</label>
                <input
                  type="text"
                  value={selectedEmploye.matricule}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date de naissance</label>
                <input
                  type="date"
                  value={selectedEmploye.dateNaissance}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date d’embauche</label>
                <input
                  type="date"
                  value={selectedEmploye.dateEmbauche}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Poste</label>
                <input
                  type="text"
                  value={selectedEmploye.poste.titre}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Salaire de base</label>
                <input
                  type="text"
                  value={selectedEmploye.poste.salaire_base}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">CNAPS</label>
                <input
                  type="text"
                  value={selectedEmploye.cnaps}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded bg-gray-200">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBulletinForm;

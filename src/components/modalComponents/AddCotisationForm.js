// src/components/modalComponents/AddCotisationForm.js
import { useState } from "react";
import { addCotisation } from "../../service/cotisationService";
import { useSnackbar } from "../ui/SnackbarContext"; 
const AddCotisationForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nomCotisation: "",
    tauxPourcentage: "",
    plafondMontant: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
//  const [showSuggestions, setShowSuggestions] = useState(false);

  const { showSnackbar } = useSnackbar();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Convertir les champs numériques
      const payload = {
        ...formData,
        tauxPourcentage: parseFloat(formData.tauxPourcentage),
        plafondMontant: parseInt(formData.plafondMontant, 10),
      };

      const added = await addCotisation(payload);
      showSnackbar("Cotisation créée avec succès ✅"); // 🎉 succès
      onSuccess && onSuccess(added.data); // Mettre à jour la liste
      onClose();
    } catch (err) {
      if (err.response?.data?.message) {
        // Si l'API renvoie des messages détaillés
        setError(err.response.data.message.join(", "));
      } else {
        setError(err.message || "Erreur lors de l'ajout");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Ajouter une cotisation</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="nomCotisation"
            placeholder="Nom cotisation"
            value={formData.nomCotisation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="tauxPourcentage"
            placeholder="Taux (%)"
            value={formData.tauxPourcentage}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="0"
            step="0.01"
            required
          />
          <input
            type="number"
            name="plafondMontant"
            placeholder="Plafond montant"
            value={formData.plafondMontant}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="0"
            step="1"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCotisationForm;

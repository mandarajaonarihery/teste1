// src/components/modalComponents/AddServiceForm.js
import { useState } from "react";
import { addService } from "../../service/serviceService";
import { Button } from "../ui/button";

export default function AddServiceForm({ onSuccess }) {
  const [serviceData, setServiceData] = useState({ nom_service: "" });
  const [loading, setLoading] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addService({ nom_service: serviceData.nom_service }); // 🔹 uniquement nom_service
    onSuccess?.();
    setServiceData({ nom_service: "" });
  } catch (error) {
    console.error("Erreur lors de l'ajout du service:", error);
  }
};
    
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nom du service */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom du service
        </label>
        <input
          type="text"
          placeholder="Ex: Comptabilité"
          value={serviceData.nom_service}
          onChange={(e) =>
            setServiceData({ ...serviceData, nom_service: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Bouton soumettre */}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}

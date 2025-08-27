// src/pages/Cotisations.js
import { useEffect, useState } from "react";
import { getCotisations } from "../../service/cotisationService";
import Card from "../../components/common/Card";
import AddCotisationForm from "../../components/modalComponents/AddCotisationForm"; 
import { Plus } from "lucide-react";

const Cotisations = () => {
  const [cotisations, setCotisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  // 🔹 Charger les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCotisations();
        setCotisations(res.data || []); // l’API renvoie { message, data, status }
      } catch (err) {
        setError("Impossible de charger les cotisations");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Filtrer par recherche
  const filtered = cotisations.filter(
    (c) =>
      c.nomCotisation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tauxPourcentage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-gray-600">Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Card className="flex-1">
        {/* En-tête avec bouton Ajouter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold">Liste des cotisations</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Ajouter
          </button>
        </div>

        {/* Champ recherche */}
        <input
          type="text"
          placeholder="Rechercher par nom ou taux..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full p-2 border rounded-lg"
        />

        {/* Tableau */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Taux (%)</th>
                <th className="px-4 py-2 border">Plafond</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{c.nomCotisation}</td>
                  <td className="border px-4 py-2">{c.tauxPourcentage}</td>
                  <td className="border px-4 py-2">{c.plafondMontant}</td>
                  <td className="border px-4 py-2">{c.description}</td>
                  <td className="px-3 py-5 flex gap-2 justify-center items-center">
                    <button
                      onClick={() => console.log("Détails", c.id)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Détails</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal ajout cotisation */}
        {showForm && (
          <AddCotisationForm
            onClose={() => setShowForm(false)}
            onSuccess={(newCot) => setCotisations((prev) => [...prev, newCot])}
          />
        )}
      </Card>
    </div>
  );
};

export default Cotisations;

// src/pages/Retenue.js
import { useEffect, useState } from "react";
import { getRetenues } from "../../service/retenueService";
import Card from "../../components/common/Card";
import AddRetenueForm from "../../components/modalComponents/AddRetenueForm";

export default function Retenue() {
  const [retenues, setRetenues] = useState([]);
  const [filteredRetenues, setFilteredRetenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchRetenues = async () => {
    setLoading(true);
    try {
      const res = await getRetenues(page, limit);
      const data = res.data || [];
      setRetenues(data);
      setFilteredRetenues(data);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Erreur récupération retenues :", err);
      setRetenues([]);
      setFilteredRetenues([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetenues();
  }, [page, limit]);

  // Filtrage des retenues selon la recherche
  useEffect(() => {
    if (!search) {
      setFilteredRetenues(retenues);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = retenues.filter(
        (r) =>
          r.type.toLowerCase().includes(lowerSearch) ||
          r.motif.toLowerCase().includes(lowerSearch) ||
          `${r.employe?.nom} ${r.employe?.prenom}`
            .toLowerCase()
            .includes(lowerSearch)
      );
      setFilteredRetenues(filtered);
    }
  }, [search, retenues]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Liste des retenues</h2>
          <button
            onClick={() => setShowModal(true)}
             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Ajouter une retenue
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par type, motif ou employé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tableau */}
        <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
                      <tr >
                          <th className="border border-gray-300 p-2">Employé</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Montant</th>
              <th className="border border-gray-300 p-2">Motif</th>
              
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Chargement...
                </td>
              </tr>
            ) : filteredRetenues.length > 0 ? (
              filteredRetenues.map((r) => (
                  <tr key={r.id}>
                       <td className="border border-gray-300 p-2">
                    {r.employe ? `${r.employe.nom} ${r.employe.prenom}` : "-"}
                  </td>
                  <td className="border border-gray-300 p-2">{r.type}</td>
                  <td className="border border-gray-300 p-2">{r.montant}</td>
                  <td className="border border-gray-300 p-2">{r.motif}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Aucune retenue trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="px-4 py-2">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </Card>

      {/* Modal ajout */}
      {showModal && (
        <AddRetenueForm
          onClose={() => setShowModal(false)}
          onAdded={() => {
            fetchRetenues(); // rafraîchir après ajout
          }}
        />
      )}
    </div>
  );
}

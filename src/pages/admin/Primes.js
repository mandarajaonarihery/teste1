import React, { useState, useEffect } from "react";
import { getPrimes } from "../../service/primeService";
import Card from "../../components/common/Card";
import AddPrimeForm from "../../components/modalComponents/AddPrimeForm";

export default function Primes() {
  const [primes, setPrimes] = useState([]);
  const [filteredPrimes, setFilteredPrimes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPrimes = async () => {
    setLoading(true);
    try {
      const response = await getPrimes(page, limit);
      setPrimes(response.data || []);
      setFilteredPrimes(response.data || []);
    } catch (error) {
      alert("Erreur lors de la récupération des primes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrimes();
  }, [page]);

  // Filtrage local à chaque changement de search
  useEffect(() => {
    if (!search) {
      setFilteredPrimes(primes);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = primes.filter(
        (p) =>
          p.nom.toLowerCase().includes(lowerSearch) ||
          p.employe?.nom?.toLowerCase().includes(lowerSearch) ||
          p.employe?.prenom?.toLowerCase().includes(lowerSearch)
      );
      setFilteredPrimes(filtered);
    }
  }, [search, primes]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Liste des Primes</h1>
          <button
            onClick={() => setShowForm(true)}
             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Ajouter une prime
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par nom de prime ou employé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
              <tr >
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Montant</th>
                <th className="px-4 py-2 border">Employé</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrimes.length > 0 ? (
                filteredPrimes.map((prime) => (
                  <tr key={prime.id}>
                    <td className="px-4 py-2 border">{prime.nom}</td>
                    <td className="px-4 py-2 border">{prime.montant}</td>
                    <td className="px-4 py-2 border">
                      {prime.employe?.nom} {prime.employe?.prenom}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-2 border">
                    Aucune prime trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        )}

        {/* Pagination simple */}
        {/* <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Précédent
          </button>
          <span className="px-4 py-2">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Suivant
          </button>
        </div> */}
      </Card>

      {/* Modale pour ajouter une prime */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <AddPrimeForm
            onClose={() => setShowForm(false)}
            onAdded={fetchPrimes}
          />
        </div>
      )}
    </div>
  );
}

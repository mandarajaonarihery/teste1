// src/pages/Primes.js
import React, { useState, useEffect } from "react";
import { getPrimes } from "../../service/primeService";
import Card from "../../components/common/Card";
import AddPrimeForm from "../../components/modalComponents/AddPrimeForm";

export default function Primes() {
  const [primes, setPrimes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPrimes = async () => {
    setLoading(true);
    try {
      const response = await getPrimes(page, limit);
      setPrimes(response.data || []); // <-- récupère le tableau de primes
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Card className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Liste des Primes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter une prime
          </button>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Montant</th>
                <th className="px-4 py-2 border">Employé</th>
              </tr>
            </thead>
            <tbody>
              {primes.length > 0 ? (
                primes.map((prime) => (
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
        )}

        {/* Pagination simple */}
        <div className="flex justify-between mt-4">
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
        </div>
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

import React, { useState, useEffect } from "react";
import { getBulletins } from "../../service/bulletinService";
import Card from "../../components/common/Card";

const Salaire = () => {
  const [bulletins, setBulletins] = useState([]);
  const [filteredBulletins, setFilteredBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBulletins = async () => {
    setLoading(true);
    try {
      const res = await getBulletins(1, 100); // On récupère les 100 premiers
      const data = res.data || [];
      setBulletins(data);
      setFilteredBulletins(data);
    } catch (err) {
      console.error("Erreur récupération bulletins :", err);
      setBulletins([]);
      setFilteredBulletins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulletins();
  }, []);

  // Filtrage selon recherche
  useEffect(() => {
    if (!search) {
      setFilteredBulletins(bulletins);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = bulletins.filter((b) =>
        b.employe?.nom.toLowerCase().includes(lowerSearch) ||
        b.employe?.prenom.toLowerCase().includes(lowerSearch)
      );
      setFilteredBulletins(filtered);
    }
  }, [search, bulletins]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Gestion des Salaires
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Rechercher un employé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 mb-4 md:mb-0 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition"
          />
          <button
             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={() => alert("Ajouter un bulletin")}
          >
            + Ajouter un bulletin
          </button>
        </div>

        <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employé</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Montant</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mois</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Année</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : filteredBulletins.length > 0 ? (
                filteredBulletins.map((b) => (
                  <tr key={b.id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4 text-gray-800">
                      {b.employe ? `${b.employe.nom} ${b.employe.prenom}` : "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{b.montant}</td>
                    <td className="px-6 py-4 text-gray-800">{b.mois}</td>
                    <td className="px-6 py-4 text-gray-800">{b.annee}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    Aucun bulletin trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
      </Card>
    </div>
  );
};

export default Salaire;
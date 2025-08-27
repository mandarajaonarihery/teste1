// src/pages/Salaire.js
import React, { useState, useEffect } from "react";
import { getBulletins } from "../../service/bulletinService";

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
      const filtered = bulletins.filter(
        (b) =>
          b.employe?.nom.toLowerCase().includes(lowerSearch) ||
          b.employe?.prenom.toLowerCase().includes(lowerSearch)
      );
      setFilteredBulletins(filtered);
    }
  }, [search, bulletins]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Gestion des Salaires</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher un employé..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert("Ajouter un bulletin")}
        >
          Ajouter un bulletin
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Employé</th>
            <th className="border border-gray-300 p-2">Montant</th>
            <th className="border border-gray-300 p-2">Mois</th>
            <th className="border border-gray-300 p-2">Année</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Chargement...
              </td>
            </tr>
          ) : filteredBulletins.length > 0 ? (
            filteredBulletins.map((b) => (
              <tr key={b.id}>
                <td className="border border-gray-300 p-2">
                  {b.employe ? `${b.employe.nom} ${b.employe.prenom}` : "-"}
                </td>
                <td className="border border-gray-300 p-2">{b.montant}</td>
                <td className="border border-gray-300 p-2">{b.mois}</td>
                <td className="border border-gray-300 p-2">{b.annee}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Aucun bulletin trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Salaire;

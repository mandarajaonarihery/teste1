// src/pages/Salaire.js
import React, { useState, useEffect } from "react";
import { getBulletins } from "../../service/bulletinService";
import Card from "../../components/common/Card";
import AddBulletinForm from "../../components/modalComponents/AddBulletinForm";

const Salaire = () => {
  const [bulletins, setBulletins] = useState([]);
  const [filteredBulletins, setFilteredBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchBulletins = async () => {
    setLoading(true);
    try {
      const res = await getBulletins(1, 100);
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Gestion des Salaires</h1>
        <button
             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            Ajouter un bulletin
          </button>
        </div>
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Rechercher un employé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full border">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
            <tr >
              <th className="border border-gray-300 p-2">Employé</th>
              <th className="border border-gray-300 p-2">Salaire Brut</th>
              <th className="border border-gray-300 p-2">Salaire Net</th>
              <th className="border border-gray-300 p-2">Total Cotisations</th>
              <th className="border border-gray-300 p-2">PDF</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Chargement...
                </td>
              </tr>
            ) : filteredBulletins.length > 0 ? (
              filteredBulletins.map((b) => (
                <tr key={b.id}>
                  <td className="border border-gray-300 p-2">
                    {b.employe ? `${b.employe.nom} ${b.employe.prenom}` : "-"}
                  </td>
                  <td className="border border-gray-300 p-2">{b.salaire_brut ?? "-"}</td>
                  <td className="border border-gray-300 p-2">{b.salaire_net ?? "-"}</td>
                  <td className="border border-gray-300 p-2">{b.totalCotisationSociale ?? "-"}</td>
                  <td className="border border-gray-300 p-2">
                    {b.pdfUrl ? (
                      <a
                        href={`http://localhost:5000/${b.pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Voir PDF
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Aucun bulletin trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </Card>

      {showModal && (
        <AddBulletinForm
          onClose={() => setShowModal(false)}
          onAdded={fetchBulletins}
        />
      )}
    </div>
  );
};

export default Salaire;

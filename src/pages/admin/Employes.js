import { useEffect, useState } from "react";
import { getEmployes } from "../../service/employeService";
import { Info, Plus,Users } from "lucide-react";
import Card from "../../components/common/Card";
import { useNavigate } from "react-router-dom";
import EmployeFormWizard from "../../components/modalComponents/EmployeForm";

export default function EmployesPage() {
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showWizard, setShowWizard] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchEmployes();
  }, []);
  
  async function fetchEmployes() {
    setLoading(true);
    try {
      const response = await getEmployes();
      const allEmployes = Object.values(response.data)
        .flatMap((group) => Object.values(group).flat());
      setEmployes(allEmployes);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  

  const filtered = employes.filter(
    (emp) =>
      emp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.poste?.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
        {/* En-tête avec bouton Ajouter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Liste des employés
          </h1>
          {/* <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            <Plus size={20} /> Ajouter
          </button> */}
          <button
               onClick={() => setShowWizard(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2 shadow-md hover:bg-indigo-700 transition"
            >
              <Users size={20} />
              <span>Nouvel employé</span>
            </button>
        </div>

        {/* Champ de recherche */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou poste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Info size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {loading && <p className="text-center text-gray-600">Chargement...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Tableau des employés */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
              <tr >
                <th className="py-3 px-4 text-left">Photo</th>
                <th className="py-3 px-4 text-left">Nom & Prénom</th>
                <th className="py-3 px-4 text-left">Poste</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Statut</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <img
                      src={emp.profileFile}
                      alt={emp.nom}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-800">{emp.nom}</span>{" "}
                    <span className="text-gray-600">{emp.prenom}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {emp.poste?.titre}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{emp.contact}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        emp.statusEmploye === "actif"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {emp.statusEmploye}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => navigate(`/admin/employes/${emp.id}`)}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showWizard && (
          <EmployeFormWizard
          onClose={() => setShowWizard(false)}
          onAdded={() => {
            fetchEmployes(); // Recharge la liste après ajout
            setShowWizard(false);
          }}
        />
        )}
      </Card>
    </div>
  );
}
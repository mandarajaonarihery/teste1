import { useEffect, useState } from "react";
import { getEmployes } from "../../service/employeService";
import { Info, Plus } from "lucide-react";
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
    async function fetchEmployes() {
      try {
        const response = await getEmployes();
        const allEmployes = Object.values(response.data)
          .flatMap((group) => Object.values(group).flat());
        setEmployes(allEmployes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployes();
  }, []);

  const filtered = employes.filter(
    (emp) =>
      emp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.poste?.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Card className="flex-1">
        {/* En-tête avec bouton Ajouter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold">Liste des employés</h1>
          <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Ajouter
          </button>
        </div>

        {/* Champ recherche */}
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou poste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full p-2 border rounded-lg"
        />

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Tableau */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Photo</th>
                <th className="px-4 py-2 border">Nom & Prénom</th>
                <th className="px-4 py-2 border">Poste</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Statut</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    <img
                      src={emp.profileFile}
                      alt={emp.nom}
                      className="w-12 h-12 rounded-full mx-auto object-cover"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {emp.nom} {emp.prenom}
                  </td>
                  <td className="border px-4 py-2">{emp.poste?.titre}</td>
                  <td className="border px-4 py-2">{emp.contact}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        emp.statusEmploye === "actif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.statusEmploye}
                    </span>
                  </td>
                  <td className="px-3 py-5 flex gap-2 justify-center items-center">
                    <button
                      onClick={() => navigate(`/admin/employes/${emp.id}`)}
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
        {showWizard && (
  <EmployeFormWizard onClose={() => setShowWizard(false)} />
)}
      </Card>
    </div>
  );
}

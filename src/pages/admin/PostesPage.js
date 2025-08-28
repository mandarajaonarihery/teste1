import { useEffect, useState } from "react";
import { getPostes, addPost, updatePost, togglePostStatus } from "../../service/posteService";
import PosteForm from "../../components/modalComponents/AddPoste";
import { Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import Card from "../../components/common/Card";
import { useSnackbar } from "../../components/ui/SnackbarContext";
import PostesConfirmation from "../../components/ui/PostesConfirmation";

export default function PostesPage() {
  const [postes, setPostes] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPoste, setEditingPoste] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPosteId, setSelectedPosteId] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPostes = async () => {
    try {
      const response = await getPostes(page, limit);
      setPostes(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error(err);
      showSnackbar("Erreur lors de la récupération des postes", "error");
    }
  };

  useEffect(() => {
    fetchPostes();
  }, [page]);

  const filteredPostes = Array.isArray(postes)
    ? postes.filter((poste) =>
        poste.titre.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleRequestToggle = (id) => {
    setSelectedPosteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmToggle = async () => {
    try {
      await togglePostStatus(selectedPosteId);
      showSnackbar("Statut mis à jour", "success");
      fetchPostes();
    } catch (err) {
      console.error(err);
      showSnackbar("Erreur lors de la mise à jour du statut", "error");
    } finally {
      setConfirmOpen(false);
      setSelectedPosteId(null);
    }
  };

  const handleOpenForm = (poste = null) => {
    setEditingPoste(poste);
    setShowForm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      const payload = {
        titre: data.nomPoste,
        description: data.description,
        salaire_base: data.salaire_base || 0,
      };

      if (editingPoste) {
        await updatePost(editingPoste.id, payload);
      } else {
        await addPost(payload);
      }

      setShowForm(false);
      setEditingPoste(null);
      fetchPostes();
      showSnackbar("Poste enregistré avec succès", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Erreur lors de la sauvegarde du poste", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">
            Postes
          </h1>
          <button
             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={() => handleOpenForm()}
          >
            + Ajouter un poste
          </button>
        </div>
        <div className="relative mb-6">
        <input
          type="text"
          placeholder="Rechercher un poste..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 font-medium">
            Chargement des postes...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Nom du poste
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Salaire de base
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPostes.length > 0 ? (
                  filteredPostes.map((poste) => (
                    <tr key={poste.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 text-gray-800">{poste.titre}</td>
                      <td className="px-6 py-4 text-gray-600">{poste.description}</td>
                      <td className="px-6 py-4 text-gray-800">{poste.salaire_base}</td>
                      <td className="px-6 py-4 text-center">
                        {poste.status ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Actif
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Inactif
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-4 justify-center">
                        <button
                          onClick={() => handleOpenForm(poste)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Modifier"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleRequestToggle(poste.id)}
                          className="text-gray-600 hover:text-gray-800 transition"
                          title="Activer / Désactiver"
                        >
                          {poste.status ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500 font-medium">
                      Aucun poste trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showForm && (
          <PosteForm
            poste={editingPoste}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        )}

        <PostesConfirmation
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmToggle}
        />
      </Card>
    </div>
  );
}
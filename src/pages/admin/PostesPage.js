import { useEffect, useState } from "react";
import { getPostes, addPost, updatePost, togglePostStatus } from "../../service/posteService";
import PosteForm from "../../components/modalComponents/AddPoste";
import { Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import Card from "../../components/common/Card";
import { useSnackbar } from "../../components/ui/SnackbarContext";

// ✅ Import corrigé (pas de point final, extension implicite)
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

  // Filtrage sécurisé
  const filteredPostes = Array.isArray(postes)
    ? postes.filter((poste) =>
        poste.titre.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Demande de confirmation avant changement de statut
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

  // Ouvrir le formulaire pour ajouter ou éditer
  const handleOpenForm = (poste = null) => {
    setEditingPoste(poste);
    setShowForm(true);
  };

  // Après ajout/modification
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Card className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Postes</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => handleOpenForm()}
          >
            + Ajouter un poste
          </button>
        </div>

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un poste..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full md:w-1/3"
        />

        {/* Loader */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Chargement des postes...</div>
        ) : (
          <table className="min-w-full border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Nom du poste</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Salaire de base</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPostes.length > 0 ? (
                filteredPostes.map((poste) => (
                  <tr key={poste.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{poste.titre}</td>
                    <td className="px-4 py-2">{poste.description}</td>
                    <td className="px-4 py-2">{poste.salaire_base}</td>
                    <td className="px-4 py-2 text-center">
                      {poste.status ? (
                        <span className="text-green-600 font-semibold">Actif</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Inactif</span>
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleOpenForm(poste)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleRequestToggle(poste.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Activer / Désactiver"
                      >
                        {poste.status ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Aucun poste trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Formulaire modal */}
        {showForm && (
          <PosteForm
            poste={editingPoste}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        )}

        {/* Confirmation changement statut */}
        <PostesConfirmation
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmToggle}
        />
      </Card>
    </div>
  );
}

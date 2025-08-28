import { useState, useEffect } from "react";
import { useSnackbar } from "../ui/SnackbarContext"; 
export default function PosteForm({ poste, onClose, onSubmit }) {
  const [nomPoste, setNomPoste] = useState("");
  const [description, setDescription] = useState("");
const [salaireBase, setSalaireBase] = useState(0);
const { showSnackbar } = useSnackbar();
useEffect(() => {
  if (poste) {
    setNomPoste(poste.titre);
    setDescription(poste.description);
    setSalaireBase(poste.salaire_base ?? 0);
  } else {
    setNomPoste("");
    setDescription("");
    setSalaireBase(0);
  }
}, [poste]);

  useEffect(() => {
    if (poste) {
      setNomPoste(poste.titre);
      setDescription(poste.description);
    } else {
      setNomPoste("");
      setDescription("");
    }
  }, [poste]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomPoste.trim()) {
      showSnackbar("Le nom du poste est requis");
      return;
    }
    onSubmit({ nomPoste, description, salaire_base: salaireBase});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">
          {/* Croix de fermeture */}
  <button
    onClick={onClose}
    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
  >
    ✕
  </button>
        <h2 className="text-xl font-bold mb-4">
          {poste ? "Modifier le poste" : "Ajouter un poste"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom du poste</label>
            <input
              type="text"
              value={nomPoste}
              onChange={(e) => setNomPoste(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              rows={3}
            />
          </div>

          <div>
  <label className="block text-sm font-medium mb-1">Salaire de base</label>
  <input
    type="number"
    value={salaireBase}
    onChange={(e) => setSalaireBase(Number(e.target.value))}
    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
    min={0}
  />
</div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

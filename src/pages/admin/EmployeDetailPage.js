// src/pages/admin/EmployeDetailPage.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeById } from "../../service/employeService";
import Card from "../../components/common/Card";

export default function EmployeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employe, setEmploye] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmploye() {
      try {
        const response = await getEmployeById(id);
        setEmploye(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEmploye();
  }, [id]);

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!employe) return <p className="p-4">Aucun employé trouvé</p>;

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-6 " >
      <Card className="w-full max-w-3xl ">
        {/* Breadcrumb */}
       <p
  className="text-gray-700 font-semibold text-base mb-4 cursor-pointer hover:underline"
  onClick={() => navigate("/admin/employes")}
>
  <span className="text-blue-600">Accueil</span> &gt;{" "}
  <span className="text-blue-600">Employés</span> &gt;{" "}
  <span className="font-bold text-black">Détail</span>
</p>


        {/* En-tête avec photo et info principale */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={employe.profileFile}
            alt={`${employe.nom} ${employe.prenom}`}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-bold">{employe.nom} {employe.prenom}</h2>
            <p className="text-gray-700 mt-1">{employe.poste?.titre}</p>
            <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              employe.statusEmploye === "actif"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {employe.statusEmploye}
            </span>
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
          <div><strong>Matricule :</strong> {employe.matricule}</div>
          <div><strong>Date Naissance :</strong> {employe.dateNaissance}</div>
          <div><strong>Contact :</strong> {employe.contact}</div>
          <div><strong>Adresse :</strong> {employe.adresse}</div>
          <div><strong>CIN :</strong> {employe.cin}</div>
          <div><strong>Situation familiale :</strong> {employe.situationFamiliale}</div>
          <div><strong>Nombre enfants :</strong> {employe.nbrEnfant}</div>
          <div><strong>CNAPS :</strong> {employe.cnaps}</div>
        </div>

        {/* Informations poste */}
        <div className="mb-6 text-gray-700">
          <h3 className="font-semibold mb-2">Poste :</h3>
          <p><strong>Titre :</strong> {employe.poste?.titre}</p>
          <p><strong>Salaire de base :</strong> {employe.poste?.salaire_base}</p>
          <p><strong>Description :</strong> {employe.poste?.description}</p>
          <p><strong>Status :</strong> {employe.poste?.status ? "Actif" : "Inactif"}</p>
        </div>

        {/* Historique */}
        <div className="text-gray-500 text-sm mb-4">
          Créé le : {new Date(employe.created_at).toLocaleDateString()} | Mis à jour le : {new Date(employe.updated_at).toLocaleDateString()}
        </div>

        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ⬅ Retour
        </button>
      </Card>
    </div>
  );
}

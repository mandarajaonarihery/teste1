// src/pages/EmployeFormWizard.js
import { useState, useEffect } from "react";
import { getPostes } from "../../service/posteService";
import { addEmploye } from "../../service/employeService";
const steps = [
  { key: "infos", label: "Informations personnelles" },
  { key: "coordonnees", label: "Coordonnées" },
  { key: "poste", label: "Poste" },
  { key: "profil", label: "Profil" },
  { key: "resume", label: "Résumé" },
];

// Définition des champs par étape pour le check vert
const stepFields = {
  infos: ["nom", "prenom", "dateNaissance","dateEmbauche",
    "cin",
    "cnaps",
    "situationFamiliale",
    "nbrEnfant",],
  coordonnees: ["contact", "adresse"],
  poste: ["posteId", "salaire_base", "description"],
  profil: ["profileFile", "statusEmploye"],
};

export default function EmployeFormWizard({ onClose }) {
  const [currentStep, setCurrentStep] = useState("infos");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    situationFamiliale: "",
    nbrEnfant: "",
    dateEmbauche: "",
  cin: "",
  cnaps: "",
    contact: "",
    adresse: "",
    posteId: "",
    salaire_base: "",
    description: "",
    statusEmploye: "actif",
    profileFile: null,
  });

  const [validation, setValidation] = useState({});
  const [postes, setPostes] = useState([]);

  useEffect(() => {
    async function fetchPostes() {
      try {
        const response = await getPostes();
        setPostes(response.data || []);
      } catch (err) {
        console.error("Erreur chargement postes", err);
      }
    }
    fetchPostes();
  }, []);
const handleSubmit = async () => {
  try {
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        fd.append(key, formData[key]);
      }
    });

    await addEmploye(fd); // Appel à ton API
    alert("Employé ajouté avec succès !");
    onClose(); // Fermer le wizard
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la création de l'employé");
  }
};

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateStep = (step) => {
    let errors = {};
    if (step === "infos") {
      if (!formData.nom) errors.nom = "Nom requis";
      if (!formData.prenom) errors.prenom = "Prénom requis";
      if (!formData.dateNaissance) errors.dateNaissance = "Date requise";
    }
    if (step === "coordonnees") {
      if (!formData.contact) errors.contact = "Contact requis";
      if (!formData.adresse) errors.adresse = "Adresse requise";
    }
    if (step === "poste") {
      if (!formData.posteId) errors.posteId = "Sélectionner un poste";
    }
    if (step === "profil") {
      if (!formData.profileFile) errors.profileFile = "Photo requise";
    }
    setValidation({ ...validation, [step]: errors });
    return Object.keys(errors).length === 0;
  };

  const goToStep = (step) => {
    if (validateStep(currentStep)) setCurrentStep(step);
  };

  const renderStepForm = () => {
    switch (currentStep) {
      case "infos":
        return (
          <div className="space-y-4 text-black">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {validation.infos?.nom && (
              <p className="text-red-500 text-sm">{validation.infos.nom}</p>
            )}
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {validation.infos?.prenom && (
              <p className="text-red-500 text-sm">{validation.infos.prenom}</p>
            )}
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input type="date" name="dateEmbauche" value={formData.dateEmbauche} onChange={handleChange} className="w-full border rounded p-2" />
<input type="text" name="cin" placeholder="CIN" value={formData.cin} onChange={handleChange} className="w-full border rounded p-2" />
<input type="text" name="cnaps" placeholder="CNAPS" value={formData.cnaps} onChange={handleChange} className="w-full border rounded p-2" />
<select name="situationFamiliale" value={formData.situationFamiliale} onChange={handleChange} className="w-full border rounded p-2">
  <option value="">-- Situation familiale --</option>
  <option value="celibataire">Célibataire</option>
  <option value="marie">Marié(e)</option>
  <option value="divorce">Divorcé(e)</option>
</select>
<input type="number" name="nbrEnfant" placeholder="Nombre d'enfants" value={formData.nbrEnfant} onChange={handleChange} className="w-full border rounded p-2" />

          </div>
        );
      case "coordonnees":
        return (
          <div className="space-y-4 text-black">
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        );
      case "poste":
        return (
          <div className="space-y-4 text-black">
            <select
              name="posteId"
              value={formData.posteId}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">-- Sélectionner un poste --</option>
              {postes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.titre}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="salaire_base"
              placeholder="Salaire de base"
              value={formData.salaire_base}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        );
      case "profil":
        return (
          <div className="space-y-4 text-black">
            <input
              type="file"
              name="profileFile"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            <select
              name="statusEmploye"
              value={formData.statusEmploye}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        );
      case "resume":
        return (
          <div className="space-y-4 text-sm text-black">
            <h3 className="font-bold text-lg">Résumé des informations</h3>
            <p>
              <strong>Nom :</strong> {formData.nom} {formData.prenom}
            </p>
            <p>
              <strong>Date Naissance :</strong> {formData.dateNaissance}
            </p>
            <p>
              <strong>Contact :</strong> {formData.contact}
            </p>
            <p>
              <strong>Adresse :</strong> {formData.adresse}
            </p>
            <p>
              <strong>Poste :</strong>{" "}
              {postes.find((p) => p.id == formData.posteId)?.titre}
            </p>
            <p>
              <strong>Salaire :</strong> {formData.salaire_base}
            </p>
            <p>
              <strong>Description :</strong> {formData.description}
            </p>
            <p>
              <strong>Status :</strong> {formData.statusEmploye}
            </p>
            {formData.profileFile && (
              <p>
                <strong>Photo :</strong> {formData.profileFile.name}
              </p>
            )}
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              ✅ Enregistrer
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // Calcul des étapes complétées
  const completedSteps = steps.filter((step) => {
    const errors = validation[step.key] || {};
    if (step.key === "resume") return false;

    const hasValue = stepFields[step.key]
      ? Object.keys(formData)
          .filter((key) => stepFields[step.key].includes(key))
          .some((key) => formData[key] && formData[key] !== "")
      : false;

    return Object.keys(errors).length === 0 && hasValue;
  }).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-11/12 max-w-6xl relative bg-white">
        {/* Colonne gauche progression */}
        <div className="w-1/4 relative bg-blue-100 p-6 space-y-4">
          {/* Barre verticale */}
          <div className="absolute left-8 top-6 bottom-6 w-1 bg-gray-300 rounded">
            <div
              className="bg-green-500 w-1 rounded transition-all duration-300"
              style={{
                height: `${(completedSteps / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {steps.map((step) => {
            const errors = validation[step.key] || {};
            const hasValue = stepFields[step.key]
              ? Object.keys(formData)
                  .filter((key) => stepFields[step.key].includes(key))
                   .some((key) =>
        // Ignore les valeurs par défaut qui ne comptent pas comme remplies
        key === "statusEmploye" ? false : formData[key] && formData[key] !== ""
      )
              : false;
            const isCompleted =
              Object.keys(errors).length === 0 && step.key !== "resume" && hasValue;

            return (
              <div
                key={step.key}
                className={`flex items-center gap-2 cursor-pointer p-3 rounded relative z-10 ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : currentStep === step.key
                    ? "bg-blue-100"
                    : ""
                }`}
                onClick={() => goToStep(step.key)}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                    isCompleted
                      ? "bg-white text-green-500"
                      : errors && Object.keys(errors).length > 0
                      ? "bg-red-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {isCompleted
                    ? "✓"
                    : errors && Object.keys(errors).length > 0
                    ? "✕"
                    : ""}
                </span>
                {step.label}
              </div>
            );
          })}
        </div>

        {/* Colonne droite formulaire */}
        <div className="flex-1 p-8 bg-blue-900 text-white relative">
          <h2 className="text-3xl font-bold mb-6">Ajout d'un employé</h2>

          {renderStepForm()}

          {currentStep !== "resume" && (
            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(
                    (s) => s.key === currentStep
                  );
                  if (currentIndex > 0)
                    setCurrentStep(steps[currentIndex - 1].key);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded"
                disabled={currentStep === "infos"}
              >
                ⬅ Précédent
              </button>
              <button
                onClick={() => {
                  if (validateStep(currentStep)) {
                    const currentIndex = steps.findIndex(
                      (s) => s.key === currentStep
                    );
                    if (currentIndex < steps.length - 1)
                      setCurrentStep(steps[currentIndex + 1].key);
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Suivant ➡
              </button>
            </div>
          )}
        </div>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-200 text-xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

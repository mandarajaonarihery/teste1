import { useState, useEffect } from "react";
import { addEmploye } from "../../service/employeService";
import { getPostes } from "../../service/posteService";

const steps = [
  { key: "infos", label: "Informations personnelles" },
  { key: "coordonnees", label: "Coordonnées" },
  { key: "poste", label: "Poste" },
  { key: "profil", label: "Profil" },
  { key: "resume", label: "Résumé" },
];

// Définition des champs par étape pour le check vert
const stepFields = {
  infos: ["nom", "prenom", "dateNaissance", "dateEmbauche", "cin", "cnaps", "situationFamiliale", "nbrEnfant"],
  coordonnees: ["contact", "adresse"],
  poste: ["posteId", "salaire_base", "description"],
  profil: ["profileFile", "statusEmploye"],
};

export default function EmployeFormWizard({ onClose = () => {} }) {
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
const [loadingPostes, setLoadingPostes] = useState(true);
 const handleSubmit = async () => {
  try {
    const fd = new FormData();

    fd.append("nom", formData.nom);
    fd.append("prenom", formData.prenom);
    fd.append("dateNaissance", formData.dateNaissance);
    fd.append("dateEmbauche", formData.dateEmbauche);
    fd.append("cin", formData.cin);
    fd.append("cnaps", formData.cnaps);
    fd.append("nbrEnfant", Number(formData.nbrEnfant));
    fd.append("contact", formData.contact);
    fd.append("adresse", formData.adresse);
    fd.append("statusEmploye", formData.statusEmploye);
    fd.append("situationFamiliale", formData.situationFamiliale);
    fd.append("posteId", Number(formData.posteId));

    if (formData.profileFile) fd.append("profileFile", formData.profileFile);

    await addEmploye(fd);
    alert("Employé ajouté avec succès !");
    onClose();
  } catch (err) {
    console.error("Erreur ajout employé :", err);
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
  useEffect(() => {
  const fetchAllPostes = async () => {
    let allPostes = [];
    let page = 1;
    const limit = 100;

    try {
      while (true) {
        const res = await getPostes(page, limit);
        allPostes = [...allPostes, ...res.data];
        if (page >= res.pagination.totalPages) break; // <- totalPages avec "s"
        page++;
      }
      setPostes(allPostes);
    } catch (err) {
      console.error("Erreur récupération postes :", err);
      setPostes([]);
    } finally {
      setLoadingPostes(false);
    }
  };  

  fetchAllPostes();
}, []);


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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {validation.infos?.nom && (
                <p className="text-red-500 text-sm mt-1">{validation.infos.nom}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {validation.infos?.prenom && (
                <p className="text-red-500 text-sm mt-1">{validation.infos.prenom}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de naissance *
              </label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date d'embauche
              </label>
              <input
                type="date"
                name="dateEmbauche"
                value={formData.dateEmbauche}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CIN
              </label>
              <input
                type="text"
                name="cin"
                placeholder="CIN"
                value={formData.cin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNAPS
              </label>
              <input
                type="text"
                name="cnaps"
                placeholder="CNAPS"
                value={formData.cnaps}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Situation familiale
              </label>
              <select
                name="situationFamiliale"
                value={formData.situationFamiliale}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">-- Situation familiale --</option>
                <option value="celibataire">Célibataire</option>
                <option value="marie">Marié(e)</option>
                <option value="divorce">Divorcé(e)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre d'enfants
              </label>
              <input
                type="number"
                name="nbrEnfant"
                placeholder="Nombre d'enfants"
                value={formData.nbrEnfant}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "coordonnees":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact *
              </label>
              <input
                type="text"
                name="contact"
                placeholder="Numéro de téléphone"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {validation.coordonnees?.contact && (
                <p className="text-red-500 text-sm mt-1">{validation.coordonnees.contact}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse *
              </label>
              <textarea
                name="adresse"
                placeholder="Adresse complète"
                value={formData.adresse}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {validation.coordonnees?.adresse && (
                <p className="text-red-500 text-sm mt-1">{validation.coordonnees.adresse}</p>
              )}
            </div>
          </div>
        );

      case "poste":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poste *
              </label>
              <select
                name="posteId"
                value={formData.posteId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">-- Sélectionner un poste --</option>
                {postes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.titre}
                  </option>
                ))}
              </select>
              {validation.poste?.posteId && (
                <p className="text-red-500 text-sm mt-1">{validation.poste.posteId}</p>
              )}
            </div>

          
          </div>
        );

      case "profil":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo de profil *
              </label>
              <input
                type="file"
                name="profileFile"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {validation.profil?.profileFile && (
                <p className="text-red-500 text-sm mt-1">{validation.profil.profileFile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut de l'employé
              </label>
              <select
                name="statusEmploye"
                value={formData.statusEmploye}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>
        );

      case "resume":
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl text-gray-900 mb-6">Résumé des informations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-600 mb-3">Informations personnelles</h4>
                <p><strong>Nom :</strong> {formData.nom} {formData.prenom}</p>
                <p><strong>Date de naissance :</strong> {formData.dateNaissance}</p>
                <p><strong>CIN :</strong> {formData.cin}</p>
                <p><strong>CNAPS :</strong> {formData.cnaps}</p>
                <p><strong>Situation familiale :</strong> {formData.situationFamiliale}</p>
                <p><strong>Nombre d'enfants :</strong> {formData.nbrEnfant}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-600 mb-3">Coordonnées</h4>
                <p><strong>Contact :</strong> {formData.contact}</p>
                <p><strong>Adresse :</strong> {formData.adresse}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-600 mb-3">Poste</h4>
                <p><strong>Poste :</strong> {postes.find((p) => p.id == formData.posteId)?.titre}</p>
                <p><strong>Salaire :</strong> {formData.salaire_base}</p>
                <p><strong>Date d'embauche :</strong> {formData.dateEmbauche}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-600 mb-3">Profil</h4>
                <p><strong>Statut :</strong> {formData.statusEmploye}</p>
                {formData.profileFile && (
                  <p><strong>Photo :</strong> {formData.profileFile.name}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-blue-600 mb-2">Description du poste</h4>
              <p className="bg-white p-3 rounded-lg text-gray-700">{formData.description || "Aucune description"}</p>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              ✅ Enregistrer l'employé
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
          .some((key) =>
            key === "statusEmploye" ? false : formData[key] && formData[key] !== ""
          )
      : false;

    return Object.keys(errors).length === 0 && hasValue;
  }).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="flex shadow-2xl rounded-xl overflow-hidden w-full max-w-6xl max-h-[90vh] bg-white relative">
        {/* Bouton fermer - Déplacé à l'intérieur de la modale */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl z-10"
        >
          ✕
        </button>

        {/* Colonne gauche progression */}
        <div className="w-80 bg-gradient-to-br from-blue-50 to-blue-100 p-6 space-y-4 border-r border-blue-200">
          {/* En-tête */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Nouvel employé</h2>
            <div className="flex items-center text-sm text-gray-600">
              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedSteps / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="font-medium">{completedSteps}/{steps.length - 1}</span>
            </div>
          </div>

          {/* Étapes */}
          {steps.map((step, index) => {
            const errors = validation[step.key] || {};
            const hasValue = stepFields[step.key]
              ? Object.keys(formData)
                  .filter((key) => stepFields[step.key].includes(key))
                  .some((key) =>
                    key === "statusEmploye" ? false : formData[key] && formData[key] !== ""
                  )
              : false;
            const isCompleted =
              Object.keys(errors).length === 0 && step.key !== "resume" && hasValue;
            const isActive = currentStep === step.key;

            return (
              <div key={step.key} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-4 top-10 w-0.5 h-12 bg-gray-300" />
                )}
                
                <div
                  className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                    isCompleted
                      ? "bg-green-500 text-white shadow-md hover:bg-green-600"
                      : isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "hover:bg-white hover:shadow-sm"
                  }`}
                  onClick={() => goToStep(step.key)}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                      isCompleted
                        ? "bg-white text-green-500"
                        : isActive
                        ? "bg-white text-blue-500"
                        : errors && Object.keys(errors).length > 0
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isCompleted
                      ? "✓"
                      : errors && Object.keys(errors).length > 0
                      ? "!"
                      : index + 1}
                  </div>
                  <span className="font-medium">{step.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Colonne droite formulaire */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {steps.find(s => s.key === currentStep)?.label}
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
            </div>

            <div className="mb-8">
              {renderStepForm()}
            </div>

            {currentStep !== "resume" && (
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    const currentIndex = steps.findIndex((s) => s.key === currentStep);
                    if (currentIndex > 0) setCurrentStep(steps[currentIndex - 1].key);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === "infos"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-500 hover:bg-gray-600 text-white shadow-md hover:shadow-lg"
                  }`}
                  disabled={currentStep === "infos"}
                >
                  ← Précédent
                </button>
                <button
                  onClick={() => {
                    if (validateStep(currentStep)) {
                      const currentIndex = steps.findIndex((s) => s.key === currentStep);
                      if (currentIndex < steps.length - 1)
                        setCurrentStep(steps[currentIndex + 1].key);
                    }
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Suivant →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
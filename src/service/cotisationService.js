
           // src/service/cotisationService.js

const API_URL = "http://localhost:5000/cotisation-sociale";

// 🔹 Liste des cotisations
export async function getCotisations() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors de la récupération des cotisations");
  return res.json();
}

// 🔹 Ajouter une cotisation
export async function addCotisation(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erreur création cotisation");
  }
  return res.json();
}
  
// 🔹 Récupérer une cotisation par ID
export async function getCotisationById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erreur lors de la récupération de la cotisation");
  return res.json();
}

// 🔹 Modifier une cotisation
export async function updateCotisation(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour de la cotisation");
  return res.json();
}

// 🔹 Supprimer (désactiver) une cotisation
export async function deleteCotisation(id) {
  const res = await fetch(`${API_URL}/status/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de la cotisation");
  return res.json();
}

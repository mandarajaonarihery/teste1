const API_URL = process.env.REACT_APP_API_BASE_URL + "/poste";

export async function getPostes(page = 1, limit = 10) {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Erreur récupération postes");
  return res.json(); // contiendra data et pagination
}

// 🔹 Ajouter un poste
export async function addPost(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { nomPoste, description }
  });
  if (!res.ok) throw new Error("Erreur création poste");
  return res.json();
}

// 🔹 Modifier un poste
export async function updatePost(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH", // PATCH selon Swagger
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { nomPoste, description }
  });
  if (!res.ok) throw new Error("Erreur mise à jour poste");
  return res.json();
}

// 🔹 Désactiver / activer un poste (soft-delete)
export async function togglePostStatus(id) {
  const res = await fetch(`${API_URL}/status/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Erreur mise à jour status du poste");
  return res.json();
}

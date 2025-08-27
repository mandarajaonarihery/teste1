const API_URL = process.env.REACT_APP_API_BASE_URL + "/services";

// 🔹 Récupérer la liste
export async function getService() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur récupération services");
  return res.json();
}

// 🔹 Ajouter un service
export const addService = async (data) => {
  try {
    const response = await fetch(API_URL, { // <-- utiliser API_URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur création service");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 🔹 Modifier
export async function updateService(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur mise à jour service");
  return res.json();
}

// 🔹 Supprimer
export async function deleteService(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur suppression service");
  return res.json();
}

// 🔹 Récupérer un service par ID
export async function getServiceById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erreur récupération service");
  return res.json();
}

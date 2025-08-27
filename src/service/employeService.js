const API_URL = process.env.REACT_APP_API_BASE_URL + "/employe/";

// 🔹 Récupérer la liste
export async function getEmployes(page = 1, limit = 10) {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Erreur récupération employés");
  return res.json();
}

// 🔹 Récupérer par ID
export async function getEmployeById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erreur récupération employé");
  return res.json();
}

// 🔹 Ajouter
export async function addEmploye(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: data, // FormData directement
  });
  if (!res.ok) throw new Error("Erreur création employé");
  return res.json();
}
export async function updateEmploye(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur mise à jour employé");
  return res.json();
}


// // 🔹 Mettre en retraite
// export async function mettreEnRetraite(id) {
//   const res = await fetch(`${API_URL}/${id}/retraite`, { method: "POST" });
//   if (!res.ok) throw new Error("Erreur mise en retraite");
//   return res.json();
// }

// // 🔹 Licencier
// export async function licencierEmploye(id) {
//   const res = await fetch(`${API_URL}/${id}/licencier`, { method: "POST" });
//   if (!res.ok) throw new Error("Erreur licenciement");
//   return res.json();
// }

// // 🔹 Démission
// export async function demissionEmploye(id) {
//   const res = await fetch(`${API_URL}/${id}/demission`, { method: "POST" });
//   if (!res.ok) throw new Error("Erreur démission");
//   return res.json();
// }

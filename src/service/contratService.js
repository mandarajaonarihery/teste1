const API_URL = process.env.REACT_APP_API_BASE_URL + "/contrats";


// 🔹 Ajouter
export async function addContrat(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur création employé");
  return res.json();
}

export async function getContrats   () {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur récupération contrats");
  return res.json();
}

export async function updateContrat(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur mise à jour contrat");
  return res.json();
}
export async function getContratsByEmploye(id_employe) {
  const res = await fetch(`${API_URL}/${id_employe}`);
  if (!res.ok) throw new Error("Erreur récupération contrats par employé");
  return res.json();
}

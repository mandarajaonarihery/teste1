// src/service/retenueService.js

const API_URL = process.env.REACT_APP_API_BASE_URL+"/retenue/";

// Création d'une retenue pour un employé
export async function addRetenue(data) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur lors de la création de la retenue");
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Liste des retenues avec pagination
export async function getRetenues(page = 1, limit = 10) {
  try {
    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Erreur récupération des retenues");
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Récupérer une retenue par id
export async function getRetenueById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Retenue introuvable");
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Mise à jour d'une retenue
export async function updateRetenue(id, data) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur lors de la mise à jour de la retenue");
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Changement du statut d'une retenue
export async function toggleRetenueStatus(id) {
  try {
    const res = await fetch(`${API_URL}/status/${id}`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Erreur lors du changement de statut");
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

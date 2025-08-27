// src/service/bulletinService.js
const API_URL = process.env.REACT_APP_API_BASE_URL + "/Bulletin/";
// Créer un bulletin pour un employé
// Créer un bulletin pour un employé
export const addBulletin = async (employeId) => {
  if (!Number.isInteger(employeId) || employeId <= 0) {
    throw new Error("employeId must be a positive integer");
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeId }), // clé correcte
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erreur lors de la création du bulletin");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};


// Lister les bulletins avec pagination
export const getBulletins = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erreur lors de la récupération des bulletins");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Détail d’un bulletin pour un employé
export const getBulletinByEmploye = async (id_employe) => {
  try {
    const res = await fetch(`${API_URL}/${id_employe}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erreur lors de la récupération du bulletin");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// src/service/primeService.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL+"/prime/";

// Création d'une prime
export const createPrime = async (primeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(primeData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Liste des primes avec pagination
export const getPrimes = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Récupérer une prime par ID
export const getPrimeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Mettre à jour une prime
export const updatePrime = async (id, primeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(primeData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Mettre à jour le status d'une prime
export const updatePrimeStatus = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/status${id}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

    import axios from 'axios';

    const API_URL = process.env.REACT_APP_API_BASE_URL + "/heures-supp";

    // Ajouter une nouvelle fiche d'heures supplémentaires
    export const addHeuresSupp = async (heuresSuppData) => {
    try {
        const response = await axios.post(API_URL, heuresSuppData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout des heures supplémentaires:", error);
        throw error;
    }
    };

    // Récupérer toutes les fiches d'heures supplémentaires
    export const getHeuresSupp = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des heures supplémentaires:", error);
        throw error;
    }
    };

    // Récupérer les fiches d'heures supplémentaires d'un employé
    export const getHeuresSuppByEmploye = async (employeId) => {
    try {
        const response = await axios.get(`${API_URL}/${employeId}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des heures supplémentaires de l'employé ${employeId}:`, error);
        throw error;
    }
    };

    // Mettre à jour une fiche d'heures supplémentaires
    export const updateHeuresSupp = async (heuresSuppId, heuresSuppData) => {
    try {
        const response = await axios.put(`${API_URL}/${heuresSuppId}`, heuresSuppData);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour des heures supplémentaires ${heuresSuppId}:`, error);
        throw error;
    }
    };

    // Supprimer une fiche d'heures supplémentaires
    export const deleteHeuresSupp = async (heuresSuppId) => {
    try {
        const response = await axios.delete(`${API_URL}/${heuresSuppId}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la suppression des heures supplémentaires ${heuresSuppId}:`, error);
        throw error;
    }
    };

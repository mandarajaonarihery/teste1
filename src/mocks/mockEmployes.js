// src/mocks/mockEmployes.js
export let mockEmployes = [
  {
    id_employe: 1,
    nom: "Rakoto",
    prenom: "Jean",
    date_naissance: "1990-05-15T00:00:00.000Z",
    adresse: "Antananarivo",
    statut: "ACTIF",
    photo_url: "/images/employes/fabios.jpg", // existe dans public
    num_securite_sociale: "1234567890123",
    iban: "MG1234567890",
    bic: "BKMGXXXX",
    contrats: [
      {
        id_contrat: 1,
        id_employe: 1,
        id_poste: 1,
        type_contrat: "CDI",
        date_debut_contrat: "2025-01-01T00:00:00.000Z",
        date_fin_contrat: null,
        date_effet: "2025-01-01T00:00:00.000Z",
        date_fin_effet: null,
        salaire_base_mensuel: 1200000,
        salaire_base_horaire: null,
      },
    ],
    absences: [
      {
        id_absence: 1,
        id_employe: 1,
        type_absence: "CONGE_PAYE",
        date_debut: "2025-08-20T00:00:00.000Z",
        date_fin: "2025-08-25T00:00:00.000Z",
        nombre_jours: 6,
      },
    ],
    heures_supplementaires: [
      {
        id_heure_sup: 1,
        id_employe: 1,
        mois: 1,
        annee: 2025,
        heures_25_pourcent: 10,
        heures_50_pourcent: 5,
      },
    ],
    per_diem: [
      {
        id_perdiem: 1,
        id_employe: 1,
        date_debut: "2025-09-01T00:00:00.000Z",
        date_fin: "2025-09-05T00:00:00.000Z",
        montant_total: 250000,
        justification: "Mission à Mahajanga",
      },
    ],
    primes: [
      {
        id_prime: 1,
        id_employe: 1,
        libelle: "Prime de rendement",
        montant: 150000,
        date_attribuee: "2025-08-19T09:19:02.933Z",
      },
    ],
  },
  {
    id_employe: 2,
    nom: "Randria",
    prenom: "Paul",
    date_naissance: "1988-02-20T00:00:00.000Z",
    adresse: "Toamasina",
    statut: "ACTIF",
    photo_url: "/images/employes/vpn.png", // existe dans public
    num_securite_sociale: "9876543210123",
    iban: "MG0987654321",
    bic: "BKMGYYYY",
    contrats: [
      {
        id_contrat: 2,
        id_employe: 2,
        id_poste: 2,
        type_contrat: "CDD",
        date_debut_contrat: "2025-02-01T00:00:00.000Z",
        date_fin_contrat: "2025-08-01T00:00:00.000Z",
        date_effet: "2025-02-01T00:00:00.000Z",
        date_fin_effet: "2025-08-01T00:00:00.000Z",
        salaire_base_mensuel: 800000,
        salaire_base_horaire: null,
      },
    ],
    absences: [],
    heures_supplementaires: [],
    per_diem: [],
    primes: [
      {
        id_prime: 3,
        id_employe: 2,
        libelle: "Prime exceptionnelle",
        montant: 100000,
        date_attribuee: "2025-07-15T00:00:00.000Z",
      },
    ],
  },
];

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/Layout";

// Pages
import Dashboard from "./pages/admin/Dashboard";
import Employes from "./pages/admin/Employes";
//import Services from "./pages/admin/Services";
import Admin from "./pages/admin"; // chemin vers ton fichier admin.js
import PostesPage from "./pages/admin/PostesPage";
import Absences from "./pages/admin/Absences";
import Primes from "./pages/admin/Primes";
import Paies from "./pages/admin/Paies";
import PaiesHistorique from "./pages/admin/PaiesHistorique";
import Cotisations from "./pages/admin/Cotisations";
import ParametresContrats from "./pages/admin/ParametresContrats";
import ParametresPostes from "./pages/admin/ParametresPostes";
import ParametresTaux from "./pages/admin/ParametresTaux";
import ParametresGeneral from "./pages/admin/ParametresGeneral";
import EmployeDetailPage from "./pages/admin/EmployeDetailPage";
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Admin />} />
        {/* Toutes les routes /admin passent par AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employes" element={<Employes />} />
        
          <Route path="employes/:id" element={<EmployeDetailPage />} />
          
          <Route path="poste" element={<PostesPage />} />
          {/* <Route path="services/:id/postes" element={<PostesPage />} /> */}
          <Route path="absences" element={<Absences />} />
          <Route path="primes" element={<Primes />} />
          <Route path="paies" element={<Paies />} />
          <Route path="paies/historique" element={<PaiesHistorique />} />
          <Route path="cotisations" element={<Cotisations />} />
          <Route path="parametres/contrats" element={<ParametresContrats />} />
          <Route path="parametres/postes" element={<ParametresPostes />} />
          <Route path="parametres/taux" element={<ParametresTaux />} />
          <Route path="parametres/general" element={<ParametresGeneral />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

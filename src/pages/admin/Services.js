import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getService } from "../../service/serviceService";
import CardCustom, { CardHeader, CardContent } from "../../components/ui/CardCustom";
import SearchHeader from "../../components/ui/SearchHeader";
import { Button } from "../../components/ui/button";
import ModalCustom from "../../components/ui/ModalCustom";
import AddServiceForm from "../../components/modalComponents/AddService";
import Card from "../../components/common/Card";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate(); // ← Hook pour navigation

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getService();
      setServices(data);
      setFiltered(data);
    } catch (error) {
      console.error("Erreur récupération services:", error);
    }
  };

  const handleSearch = (query) => {
    setFiltered(
      services.filter((s) =>
        s.nom_service.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleAdd = () => setOpenModal(true);

  const handleSuccess = async () => {
    await fetchServices(); 
    setOpenModal(false);
  };

 const handleClickService = (id_service ) => {
  navigate(`/admin/services/${id_service }/postes`);
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
      <CardCustom className="w-full shadow-xl rounded-xl overflow-hidden">
        <CardHeader
          title={
            <span className="text-2xl sm:text-3xl font-bold text-gray-800">
              Gestion des services
            </span>
          }
          actions={<Button onClick={handleAdd}>+ Ajouter</Button>}
        />
        <CardContent className="space-y-4 p-6">
          <SearchHeader onSearch={handleSearch} className="mb-4" />
          {filtered.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filtered.map((service) => (
                <li
                  key={service.id_service}
                  className="py-3 flex justify-between items-center cursor-pointer"
                  onClick={() => handleClickService(service.id_service)} // ← clic
                >
                  <span className="text-gray-800 font-medium">
                    {service.nom_service}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center mt-12 text-gray-500 flex flex-col items-center gap-2">
              <span className="text-4xl">🙁</span>
              <p>Aucun service trouvé</p>
            </div>
          )}
        </CardContent>
      </CardCustom>

      <ModalCustom
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Ajouter un service"
      >
        <AddServiceForm onSuccess={handleSuccess} />
      </ModalCustom>
      </Card>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../core/hooks/UserContext.jsx";
import "./Certificates.css";

const Certificates = () => {
  const { user } = useContext(UserContext); // Obtenemos datos del usuario desde el contexto
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      if (!user) {
        setError("No hay un usuario autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://oficiosya-api-production.up.railway.app/api/v1/services/all/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los servicios.");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user]);

  const handleSaveService = async (serviceId) => {
    if (!user) {
      alert("No hay un usuario autenticado.");
      return;
    }

    try {
      const response = await fetch(
        `https://oficiosya-api-production.up.railway.app/api/v1/services/${serviceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el servicio.");
      }
      alert("Servicio actualizado correctamente");
    } catch (err) {
      alert("Error al actualizar el servicio: " + err.message);
    }
  };

  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="services">
      <h2>Certificados</h2>
      {services.map((service) => (
        <div key={service.id}>
          <p>{service.name}</p>
          <textarea
            value={serviceData[service.id]?.description || service.description}
            onChange={(e) =>
              setServiceData({
                ...serviceData,
                [service.id]: {
                  ...serviceData[service.id],
                  description: e.target.value,
                },
              })
            }
          />
          <button onClick={() => handleSaveService(service.id)}>
            Guardar Certificado
          </button>
        </div>
      ))}
    </section>
  );
};

export default Certificates;

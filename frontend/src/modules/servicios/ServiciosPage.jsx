import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import './ServicePage.css'; // Estilo opcional para el contenedor.

const ServiciosPage = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://oficiosya-api-production.up.railway.app/api/v1/services/all/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener servicios');
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Cargando servicios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Servicios del Profesional</h2>
      <div className="services-container">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiciosPage;

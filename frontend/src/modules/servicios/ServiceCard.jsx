import React from "react";
import styles from './ServiceCard.module.css';

const ServiceCard = ({ service }) => {
  if (!service) return null; // Verificación adicional por seguridad.
  console.log("ser", service);
  

  return (
    <div className={styles["service-card"]}>
      <h2>{service.title}</h2>
      <p className={styles.category}>Categoría: {service.category}</p>
      <p className={styles.summary}>{service.summary}</p>
      <p className={styles.description}>{service.description}</p>
      <p className="price">Precio: ${service.price}</p>

      <div className={styles.carousel}>
        {service.images.map((image, index) => (
          <img
            key={image.id || index}
            src={image.imageUrl}
            alt={`Imagen de ${service.title}`}
            className={styles["carousel-image"]}
          />
        ))}
      </div>

      <p className={styles["created-at"]}>
        Publicado el: {new Date(service.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ServiceCard;

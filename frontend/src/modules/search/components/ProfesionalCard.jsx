import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfesionalCard.module.css';

const ProfesionalCard = ({
  id,
  title,
  category,
  rating,
  reviews,
  location,
  price,
  image,
  phone,
}) => {
  const navigate = useNavigate();

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  const handleViewServices = () => {
    navigate(`/profesionales/${id}/servicios`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.category}>{category}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.rating}>
            <div className={styles.stars}>{renderStars()}</div>
            <span className={styles.reviews}>({reviews})</span>
          </div>
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.contactButton} onClick={handleViewServices}>
            Mis servicios
          </button>
          <button className={styles.contactButton}>Mis trabajos</button>
          <button className={styles.contactButton}>tel: {phone}</button>
        </div>
      </div>
    </div>
  );
};

export default ProfesionalCard;

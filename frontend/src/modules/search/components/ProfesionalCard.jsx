import React, { useEffect, useState } from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfesionalCard.module.css';

const ProfesionalCard = ({
  id,
  title,
  category,
  location,
  price,
  image,
  phone,
}) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para el botón de favoritos

  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://oficiosya-api-production.up.railway.app/api/v1/reviews/${id}`);
      const data = await response.json();
      setReviews(data);
      calculateRating(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const calculateRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    setRating(totalRating / reviews.length);
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

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

  const handleViewWorks = () => {
    navigate(`/profesionales/${id}/works`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí puedes agregar lógica para manejar el cambio de estado de favorito en tu backend o localStorage
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <button className={`${styles.favoriteIcon} ${isFavorite ? styles.favorite : ''}`} onClick={toggleFavorite}>
          <Heart size={16} color={isFavorite ? 'red' : 'gray'} />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.category}>{category}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.rating}>
            <div className={styles.stars}>{renderStars()}</div>
            <span className={styles.reviews}>({reviews.length} reseñas)</span>
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
          <button className={styles.contactButton} onClick={handleViewWorks}>
            Mis trabajos
          </button>
          <button className={styles.contactButton}>tel: {phone}</button>
        </div>
      </div>
    </div>
  );
};

export default ProfesionalCard;

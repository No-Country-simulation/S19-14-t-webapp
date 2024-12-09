import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import styles from './FavoriteCard.module.css';

const FavoriteCard = ({
  id,
  title,
  category,
  rating,
  reviews,
  location,
  price,
  image,
  onRemove,
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <button 
          className={styles.favoriteButton}
          onClick={() => onRemove(id)}
          title="Quitar de favoritos"
        >
          <Heart size={20} fill="#e74c3c" color="#e74c3c" />
        </button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.category}>{category}</span>
        </div>
        
        <div className={styles.info}>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {renderStars()}
            </div>
            <span className={styles.reviews}>({reviews})</span>
          </div>
          
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <span className={styles.price}>Desde {price}</span>
          <button className={styles.contactButton}>
            Contactar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
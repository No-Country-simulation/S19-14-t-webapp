import React, { useState } from 'react';
import { Star } from 'lucide-react';
import RatingCard from '../RatingCard/RatingCard';
import { getAverageRating } from '../../utils/ratingsService';
import styles from './RatingList.module.css';

const initialProviders = [
  {
    id: 1,
    name: 'Juan Pérez',
    profession: 'Plomero',
    contactDate: '15/03/2024',
  },
  {
    id: 2,
    name: 'María González',
    profession: 'Electricista',
    contactDate: '12/03/2024',
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    profession: 'Pintor',
    contactDate: '10/03/2024',
  },
];

const RatingList = () => {
  const [providers] = useState(initialProviders);

  const handleRate = (id, rating, comment) => {
    console.log('Rating submitted:', { id, rating, comment });
  };

  const renderStars = (providerId) => {
    const rating = getAverageRating(providerId);
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={20}
        className={styles.star}
        fill={index < rating ? '#f59e0b' : 'none'}
        color={index < rating ? '#f59e0b' : '#cbd5e1'}
      />
    ));
  };

  if (providers.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Califica a los trabajadores</h1>
        <div className={styles.emptyState}>
          <Star size={48} className={styles.emptyIcon} />
          <p className={styles.emptyText}>
            No tienes trabajadores pendientes por calificar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Califica a los trabajadores</h1>
      <div className={styles.list}>
        {providers.map(provider => (
          <div key={provider.id}>
            <RatingCard
              {...provider}
              onRate={handleRate}
            />
            <div className={styles.averageRating}>
              <span className={styles.ratingLabel}>Calificación promedio:</span>
              <div className={styles.stars}>
                {renderStars(provider.id)}
              </div>
              <span className={styles.ratingValue}>
                ({getAverageRating(provider.id).toFixed(1)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingList;
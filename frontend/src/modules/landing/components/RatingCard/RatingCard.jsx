import React, { useState } from 'react';
import { UserCircle, Star } from 'lucide-react';
import RatingModal from '../RatingModal/RatingModal';
import { getAverageRating, getProviderStats } from '../../utils/ratingsService';
import styles from './RatingCard.module.css';

const RatingCard = ({ id, name, profession, contactDate, onRate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = getProviderStats(id);
  const averageRating = getAverageRating(id);

  const handleRate = (rating, comment) => {
    onRate(id, rating, comment);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <UserCircle size={40} />
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.profession}>{profession}</p>
            <span className={styles.date}>Contactado el {contactDate}</span>
            {stats && (
              <div className={styles.stats}>
                <div className={styles.rating}>
                  <Star size={16} className={styles.star} />
                  <span>{averageRating}</span>
                  <span className={styles.ratingCount}>
                    ({stats.ratingCount} calificaciones)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <button 
          className={styles.rateButton}
          onClick={() => setIsModalOpen(true)}
        >
          Calificar
        </button>
      </div>

      {isModalOpen && (
        <RatingModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRate}
          providerName={name}
          providerId={id}
        />
      )}
    </>
  );
};

export default RatingCard;
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { addRating, getCurrentRatingsData } from '../../utils/ratingsService';
import styles from './RatingModal.module.css';

const RatingModal = ({ onClose, onSubmit, providerName, providerId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRating = addRating({
      providerId,
      rating,
      comment,
      userName: 'Usuario Actual' // En una aplicación real, esto vendría del sistema de autenticación
    });

    // Mostrar los datos actualizados en la consola
    console.log('Datos actualizados después de la calificación:', getCurrentRatingsData());

    onSubmit(newRating.rating, newRating.comment);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className={styles.title}>
          Califica tu experiencia con {providerName}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.starButton} ${star <= rating ? styles.active : ''}`}
                onClick={() => setRating(star)}
              >
                <Star size={32} fill={star <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>

          <textarea
            className={styles.comment}
            placeholder="Cuéntanos tu experiencia (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={rating === 0}
          >
            Enviar calificación
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
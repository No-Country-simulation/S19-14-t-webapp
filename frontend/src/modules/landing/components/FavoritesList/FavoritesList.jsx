import React, { useState } from 'react';
import { Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FavoriteCard from '../FavoriteCard/FavoriteCard';
import styles from './FavoriteList.module.css';

const initialFavorites = [
  {
    id: 1,
    title: 'Pintura Profesional',
    category: 'Pintura',
    rating: 4.8,
    reviews: 156,
    location: 'Buenos Aires',
    price: '$5000',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    title: 'Electricista 24/7',
    category: 'Electricidad',
    rating: 4.9,
    reviews: 203,
    location: 'Córdoba',
    price: '$3500',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    title: 'Plomería Residencial',
    category: 'Plomería',
    rating: 4.7,
    reviews: 128,
    location: 'Rosario',
    price: '$4000',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=500&q=80',
  },
];

const FavoritesList = () => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const navigate = useNavigate();

  const handleRemoveFavorite = (id) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(favorite => favorite.id !== id)
    );
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Mis favoritos</h1>
        <div className={styles.emptyState}>
          <Heart size={48} className={styles.emptyIcon} />
          <p className={styles.emptyText}>
            No tienes servicios guardados en favoritos
          </p>
          <button 
            className={styles.browseButton}
            onClick={() => navigate('/')}
          >
            <Search size={20} />
            Explorar servicios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis favoritos</h1>
      <div className={styles.grid}>
        {favorites.map(favorite => (
          <FavoriteCard
            key={favorite.id}
            {...favorite}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
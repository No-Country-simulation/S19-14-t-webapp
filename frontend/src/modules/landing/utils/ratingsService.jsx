import ratingsData from '../data/ratings.json';

const STORAGE_KEY = 'oficiosya_ratings';

// Para visualizar los datos actuales
const logCurrentData = (data) => {
  console.log('Current Ratings Data:', JSON.stringify(data, null, 2));
};

class RatingService {
  constructor() {
    this.data = this.loadData();
    this.initializeProviders();
  }

  loadData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return ratingsData;
  }

  saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    // Visualizar los datos actualizados
    logCurrentData(this.data);
  }

  initializeProviders() {
    if (!this.data.providers.length) {
      console.warn('No providers found in the system');
    }

    this.data.providers.forEach(provider => {
      if (provider.totalRating === undefined) {
        provider.totalRating = 0;
      }
      if (provider.ratingCount === undefined) {
        provider.ratingCount = 0;
      }
      if (provider.averageRating === undefined) {
        provider.averageRating = 0;
      }
    });
    this.saveData();
  }

  updateProviderStats(providerId) {
    const provider = this.data.providers.find(p => p.id === providerId);
    if (!provider) return;

    const providerRatings = this.data.ratings.filter(r => r.providerId === providerId);
    provider.ratingCount = providerRatings.length;
    provider.totalRating = providerRatings.reduce((sum, r) => sum + r.rating, 0);
    provider.averageRating = provider.ratingCount > 0 
      ? Number((provider.totalRating / provider.ratingCount).toFixed(1))
      : 0;
    
    this.saveData();
  }

  addToHistory(history) {
    const newHistory = {
      ...history,
      id: Math.max(0, ...this.data.ratingHistory.map(h => h.id)) + 1,
      date: new Date().toISOString()
    };
    this.data.ratingHistory.push(newHistory);
    this.saveData();
  }

  addRating(rating) {
    if (rating.rating < 0 || rating.rating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }

    const newRating = {
      ...rating,
      id: Math.max(0, ...this.data.ratings.map(r => r.id)) + 1,
      date: new Date().toISOString().split('T')[0]
    };

    this.data.ratings.push(newRating);
    this.updateProviderStats(rating.providerId);

    this.addToHistory({
      providerId: rating.providerId,
      previousRating: 0,
      newRating: rating.rating,
      action: 'create'
    });

    return newRating;
  }

  getProviderRatings(providerId) {
    return this.data.ratings.filter(rating => rating.providerId === providerId);
  }

  getProviderStats(providerId) {
    return this.data.providers.find(p => p.id === providerId);
  }

  getRatingHistory(providerId) {
    return this.data.ratingHistory
      .filter(h => h.providerId === providerId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  clearData() {
    localStorage.removeItem(STORAGE_KEY);
    this.data = ratingsData;
    this.initializeProviders();
  }

  // Método para obtener una copia de los datos actuales
  getCurrentData() {
    return JSON.parse(JSON.stringify(this.data));
  }
}

export const ratingService = new RatingService();

// Exportar funciones individuales para mantener la compatibilidad con el código existente
export const addRating = (rating) => {
  return ratingService.addRating(rating);
};

export const getProviderRatings = (providerId) => {
  return ratingService.getProviderRatings(providerId);
};

export const getProviderStats = (providerId) => {
  return ratingService.getProviderStats(providerId);
};

export const getAverageRating = (providerId) => {
  const stats = ratingService.getProviderStats(providerId);
  return stats?.averageRating ?? 0;
};

export const clearRatingsData = () => {
  ratingService.clearData();
};

// Función para obtener los datos actuales
export const getCurrentRatingsData = () => {
  return ratingService.getCurrentData();
};
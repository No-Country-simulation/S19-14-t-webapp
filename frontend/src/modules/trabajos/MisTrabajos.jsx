import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MisTrabajos.module.css';

const MisTrabajos = () => {
  const { id } = useParams();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("trabajos", works);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get(`https://oficiosya-api-production.up.railway.app/api/v1/portfolios/all/${id}`);
        setWorks(response.data);
      } catch (err) {
        setError('No se pudieron cargar los trabajos.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [id]);

  if (loading) return <div>Cargando trabajos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.worksList}>
      <h1>Trabajos Realizados</h1>
      <div className={styles.worksContainer}>
        {works.length > 0 ? (
          works.map((work) => (
            <div key={work.id} className={styles.workCard}>
              <img src={work.image.imageUrl} alt={work.title} className={styles.workImage} />
              <h3 className={styles.workTitle}>{work.title}</h3>
              <p className={styles.workDescription}>{work.description}</p>
            </div>
          ))
        ) : (
          <p>No hay trabajos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default MisTrabajos;

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../core/hooks/UserContext";
import ProfesionalCard from "../components/ProfesionalCard";

import styles from "../styles/search.module.css";

export const Search = () => {
  const { users } = useContext(UserContext);
  const { category } = useParams();
  const [userRubro, setUserRubro] = useState([]);

  const filters = [
    { category: "Electricista", image: "/images/categorias/electricista.png" },
    { category: "Jardinero", image: "/images/categorias/jardinero.png" },
    { category: "Pintor", image: "/images/categorias/pintor.png" },
    { category: "Plomero", image: "/images/categorias/plomero.png" },
    { category: "Mecánico", image: "/images/categorias/mecanico.png" },
    { category: "Reparador", image: "/images/categorias/reparador.png" },
    { category: "Vidriero", image: "/images/categorias/vidriero.png" },
    { category: "Gasista y calefacción", image: "/images/categorias/gasista.png" },
    { category: "Albañil", image: "/images/categorias/albanil.png" },
    { category: "Cerrajero", image: "/images/categorias/cerrajero.png" },
    { category: "Técnico Refrigeración", image: "/images/categorias/refrigeracion.png" },
    { category: "Carpintero", image: "/images/categorias/carpintero.png" },
    { category: "Decoración", image: "/images/categorias/decoracion.png" },
    { category: "Fumigador", image: "/images/categorias/fumigador.png" },
    { category: "Limpieza", image: "/images/categorias/limpieza.png" },
  ];

  useEffect(() => {
    if (users && category) {
      const invalidUsers = users.filter(
        (user) => !user.occupation || !user.occupation.name
      );
      if (invalidUsers.length > 0) {
        console.warn("Usuarios con datos incompletos:", invalidUsers);
      }

      const filterRubro = users.filter(
        (user) =>
          user.occupation &&
          user.occupation.name &&
          user.occupation.name.toLowerCase() === category.toLowerCase()
      );
      setUserRubro(filterRubro);
      console.log("Usuarios filtrados:", filterRubro);
    }
  }, [users, category]);

  const handleRemoveFavorite = (id) => {
    setUserRubro((prevUserRubro) =>
      prevUserRubro.filter((user) => user.id !== id)
    );
  };

  const getDefaultImage = (category) => {
    const filter = filters.find(
      (filter) => filter.category.toLowerCase() === category.toLowerCase()
    );
    return filter?.image || "/images/categorias/default.png";
  };

  return (
    <div className={styles.search}>
      <div className={styles.container}>
        <h1 className={styles.title}>{category}</h1>
        <div className={styles.grid}>
          {userRubro.length > 0 ? (
            userRubro.map((user) => (
              <ProfesionalCard
                key={user.id}
                id={user.id}
                title={`${user.name} ${user.lastName}`}
                category={user.occupation.name}
                rating={user.rating || 0}
                reviews={user.reviews || 0}
                location={user.location || "Ubicación no especificada"}
                price={user.price || "No especificado"}
                image={
                  user.image?.imageUrl ||
                  getDefaultImage(user.occupation.name)
                }
                phone={user.phone}
                onRemove={handleRemoveFavorite}
              />
            ))
          ) : (
            <p>No hay usuarios disponibles para esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  );
};

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../core/hooks/UserContext";

import { ProfileCard } from "../components/ProfileCard";

import Ubication from "../../../assets/ubicacion.svg";

import styles from "../styles/search.module.css";

export const Search = () => {
  const { users } = useContext(UserContext);
  const { category } = useParams();

  const [userRubro, setUserRubro] = useState([]);

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

  return (
    <div className={styles.search}>
      <div className={styles.search__filters}></div>
      <div className={styles.search__ubication}>
        <div
          className={styles.ubication__icon}
          style={{ backgroundImage: `url(${Ubication})` }}
        />

        <span className={styles.ubication__tag}>Buscar por ubicación</span>
      </div>
      <div className={styles.search__cards}>
        {userRubro && userRubro.length > 0 ? (
          userRubro.map((user) => <ProfileCard key={user.id} user={user} />)
        ) : (
          <p>No hay usuarios disponibles para esta categoría.</p>
        )}
      </div>
    </div>
  );
};

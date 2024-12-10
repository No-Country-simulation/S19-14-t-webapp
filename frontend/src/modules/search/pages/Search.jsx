import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../core/hooks/UserContext";

import { ProfileCard } from "../components/ProfileCard";

import Ubication from "../../../assets/ubicacion.svg";

import styles from "../styles/search.module.css";

export const Search = () => {
  const { users } = useContext();
  const { rubro } = useParams();

  const { userRubro, setUserRubro } = useState();

  useEffect(() => {
    const filterRubro = users.filter(
      (filter) => filter.occupation.name === rubro
    );
    setUserRubro(filterRubro);
  }, [users, rubro, setUserRubro]);

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

        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  );
};

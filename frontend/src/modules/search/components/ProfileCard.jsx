import PropTypes from "prop-types";

import BtnBlue from "../../../core/components/BtnBlue";

import styles from "../styles/profileCard.module.css";

export const ProfileCard = ({ user }) => {
  return (
    <div className={styles.profile__card}>
      <div className={styles.card__image}>{user.image.imageUrl}</div>
      <div className={styles.card__info}>
        <div className={styles.info__header}>
          <div className={styles.header__tags}>
            <h2 className={styles.tags__name}>
              {user.name} {user.lastName}
            </h2>
            <span className={styles.tags__job}>{user.occupation.name}</span>
          </div>

          <p className={styles.header__ubication}>{user.location}</p>
        </div>

        <div className={styles.info__footer}>
          <div className={styles.footer__stars}></div>

          <div className={styles.footer__btn}>
            <BtnBlue text={"Ver perfil"} />
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
};

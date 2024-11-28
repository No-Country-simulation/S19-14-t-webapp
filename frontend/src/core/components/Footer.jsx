import Linkedin from "../../assets/linkedin.svg";
import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";

import styles from "../styles/footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footer__navbar}>
        <ul className={styles.navbar__list}>
          <li className={styles.list__item}>Nosotros</li>
          <li className={styles.list__item}>Cómo funciona</li>
          <li className={styles.list__item}>Contáctanos</li>
          <li className={styles.list__item}>Términos y condiciones</li>
        </ul>

        <div className={styles.navbar__icons}>
          <div
            className={styles.icons}
            style={{ backgroundImage: `url(${Linkedin})` }}
          />
          <div
            className={styles.icons}
            style={{ backgroundImage: `url(${Facebook})` }}
          />
          <div
            className={styles.icons}
            style={{ backgroundImage: `url(${Instagram})` }}
          />
        </div>
      </nav>

      <span className={styles.footer__rights}>Copyright © OficiosYa</span>
    </footer>
  );
};

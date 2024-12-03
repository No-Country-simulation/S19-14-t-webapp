import PropTypes from "prop-types";

import styles from "../styles/guideCard.module.css";

export const GuideCard = ({ number, image, tag, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__number}>
        <span>{number}</span>
      </div>
      <div className={styles.card__image} style={{backgroundImage: `url(${image})`}}/>
      <div className={styles.card__info}>
        <h3 className={styles.info__tag}>{tag}</h3>
        <p className={styles.info__description}>{description}</p>
      </div>
    </div>
  );
};
GuideCard.propTypes = {
  number: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

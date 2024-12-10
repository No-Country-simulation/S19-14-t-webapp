import styles from "../styles/cardFilter.module.css";

import { useNavigate } from "react-router-dom";

export default function CardFilter({ filter }) {
  const navigate = useNavigate();
  const { category, image } = filter;
  const handleClic = (category) => {
    console.log("Category: ", category);
    navigate(`/search/${category}`);
  };
  return (
    <button
      onClick={() => handleClic(category)}
      className={styles["container"]}
    >
      <div className={styles["image-container"]}>
        <img src={image} alt="image Category" className={styles["image"]} />
      </div>
      <div className={styles["text-container"]}>
        <p className={styles["text"]}>{category}</p>
      </div>
    </button>
  );
}

import React from "react";
import styles from "./card.module.scss";

const Card = ({ image, info, children = undefined, onClick = undefined }) => {
  return (
    <div
      className={`${styles.card} ${onClick ? styles.isClickable : ""}`}
      data-testid="card"
      onClick={onClick}
    >
      <div className={styles.img}>
        <img src={image} alt={info.name} />
      </div>
      <div className={styles["card-info"]}>
        {Object.entries(info).map(([key, value]) => (
          <p key={key}>
            {value}
          </p>
        ))}
      </div>
      {children && <div className={styles["card-actions"]}>{children}</div>}
    </div>
  );
};

export default Card;

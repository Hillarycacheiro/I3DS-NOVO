import React from "react";
import styles from "./Switch.module.css";

const Switch = ({ troca, isLight }) => {
  return (
    <div className={isLight ? styles.light : ""}>
      <div onClick={troca} id={styles.Switch}>
        <button></button>
        <span></span>
      </div>
    </div>
  );
};

export default Switch;

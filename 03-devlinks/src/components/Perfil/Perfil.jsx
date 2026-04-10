import React from "react";
import styles from "./Perfil.module.css";

const Perfil = ({ children, fotoPerfil }) => {
  return (
    <div id={styles.Perfil}>
      <img src={fotoPerfil} alt="" />
      <p>@{children}</p>
    </div>
  );
};

export default Perfil;

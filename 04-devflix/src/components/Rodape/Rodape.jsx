import React from "react";
import "./Rodape.module.css";

const Rodape = ({ children, link }) => {
  return (
    <footer>
      <p>
        Feito com 🫰🏻por {""}
        <a href={link} target="_blank">
          {children}
        </a>
      </p>
    </footer>
  );
};

export default Rodape;
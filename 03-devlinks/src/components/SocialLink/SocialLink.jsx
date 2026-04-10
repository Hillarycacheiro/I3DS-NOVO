import React from "react";

const SocialLink = ({ url, icon }) => {
  return (
    <a href={url}>
      <ion-icon name={icon}></ion-icon>
    </a>
  );
};

export default SocialLink;

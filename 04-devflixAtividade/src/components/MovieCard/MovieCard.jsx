import { useState, useEffect } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "../MovieDescription/MovieDescription";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState(props.Title);
  // console.log(isModalOpen);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const translateText = async (text, targetLanguage = "pt") => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data[0].map((item) => item[0]).join("");
    } catch (error) {
      console.error("Erro ao traduzir título:", error);
      return text;
    }
  };

  useEffect(() => {
    const updateTitle = async () => {
      if (props.language === "en") {
        setTranslatedTitle(props.Title);
        return;
      }

      const translated = await translateText(props.Title, props.language);
      setTranslatedTitle(translated);
    };

    updateTitle();
  }, [props.language, props.Title]);

  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div>
          <p>{props.Year}</p>
        </div>

        <div>
          <img src={props.Poster} alt={props.Title} />
        </div>

        <div>
          <span>{props.Type}</span>
          <h3>{translatedTitle}</h3>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription
          apiUrl={props.apiUrl}
          movieID={props.imdbID}
          language={props.language}
          click={toggleModal}
        />
      )}
    </>
  );
};

export default MovieCard;

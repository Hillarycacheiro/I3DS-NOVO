import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const DEFAULT_LABELS = {
  watch: "Assistir",
  rating: "Avaliação",
  duration: "Duração",
  cast: "Elenco",
  genre: "Gênero",
  synopsis: "Sinopse",
  loading: "Carregando tradução...",
};

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [translatedPlot, setTranslatedPlot] = useState("");
  const [translatedActors, setTranslatedActors] = useState("");
  const [translatedGenre, setTranslatedGenre] = useState("");
  const [translatedRuntime, setTranslatedRuntime] = useState("");
  const [translatedReleased, setTranslatedReleased] = useState("");
  const [labels, setLabels] = useState(DEFAULT_LABELS);

  // Função para traduzir usando Google Translate via proxy gratuito
  const translateText = async (text, targetLanguage = "pt") => {
    try {
      // Usa o endpoint público do Google Translate
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      // O Google retorna um array complexo, precisamos extrair o texto traduzido
      return data[0].map((item) => item[0]).join("");
    } catch (error) {
      console.error("Erro ao traduzir:", error);
      return text;
    }
  };

  useEffect(() => {
    const currentLanguage = props.language || "pt";

    if (currentLanguage === "pt") {
      setLabels(DEFAULT_LABELS);
      return;
    }

    const translateLabels = async () => {
      const entries = Object.entries(DEFAULT_LABELS);

      const translatedEntries = await Promise.all(
        entries.map(async ([key, value]) => [
          key,
          await translateText(value, currentLanguage),
        ]),
      );

      setLabels(Object.fromEntries(translatedEntries));
    };

    translateLabels();
  }, [props.language]);

  useEffect(() => {
    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then(async (data) => {
        setMovieDesc(data);

        const currentLanguage = props.language || "pt";

        const [plot, actors, genre, runtime, released] = await Promise.all([
          data.Plot && data.Plot !== "N/A"
            ? translateText(data.Plot, currentLanguage)
            : Promise.resolve(""),
          data.Actors && data.Actors !== "N/A"
            ? translateText(data.Actors, currentLanguage)
            : Promise.resolve(""),
          data.Genre && data.Genre !== "N/A"
            ? translateText(data.Genre, currentLanguage)
            : Promise.resolve(""),
          data.Runtime && data.Runtime !== "N/A"
            ? translateText(data.Runtime, currentLanguage)
            : Promise.resolve(""),
          data.Released && data.Released !== "N/A"
            ? translateText(data.Released, currentLanguage)
            : Promise.resolve(""),
        ]);

        setTranslatedPlot(plot);
        setTranslatedActors(actors);
        setTranslatedGenre(genre);
        setTranslatedRuntime(runtime);
        setTranslatedReleased(released);
      })
      .catch((error) => console.error(error));
  }, [props.apiUrl, props.movieID, props.language]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {movieDesc.Type}
              <h1>{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
              >
                ▶️ {labels.watch}
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            {labels.rating}: {movieDesc.imdbRating} | {labels.duration}:{" "}
            {translatedRuntime || movieDesc.Runtime} |{" "}
            {translatedReleased || movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>
              {labels.cast}: {translatedActors || movieDesc.Actors}
            </p>
            <p>
              {labels.genre}: {translatedGenre || movieDesc.Genre}
            </p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>
            {labels.synopsis}:{" "}
            {translatedPlot || movieDesc.Plot || labels.loading}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;

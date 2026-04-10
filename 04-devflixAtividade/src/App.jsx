import { useCallback, useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/logo.png";
import lupa from "./assets/lupaa.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const MAIN_LANGUAGES = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "zh-CN", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("pt");
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    "Pesquise por filmes",
  );

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  // Função para alternar o tema
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const translateText = async (text, targetLanguage = "pt") => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data[0].map((item) => item[0]).join("");
    } catch (error) {
      console.error("Erro ao traduzir barra de pesquisa:", error);
      return text;
    }
  };

  //Criando a conexão com a API e trazendo informações
  const searchMovies = useCallback(
    async (title) => {
      const response = await fetch(`${apiUrl}&s=${title}`);
      const data = await response.json();

      //Alimentando a variavel movies
      setMovies(data.Search);
    },
    [apiUrl],
  );

  useEffect(() => {
    (async () => {
      await searchMovies("Hulk"); /* termo para pesquisa ao carregar o site */
    })();
  }, [searchMovies]);

  useEffect(() => {
    const updateSearchPlaceholder = async () => {
      if (language === "pt") {
        setSearchPlaceholder("Pesquise por filmes");
        return;
      }

      const translated = await translateText("Pesquise por filmes", language);
      setSearchPlaceholder(translated);
    };

    updateSearchPlaceholder();
  }, [language]);

  return (
    <div id="App" className={darkMode ? "dark" : "light"}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="language-picker">
        <span>🌐 Idioma</span>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {MAIN_LANGUAGES.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto, promovendo conteúdo de séries, filmes e entretenimento online."
      />

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={searchPlaceholder}
        />
        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt="Botão de ação para pesquisa!"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              {...movie}
              apiUrl={apiUrl}
              language={language}
            />
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Rodape link={"https://github.com/hillarycacheiro"}>CacheiroHi</Rodape>
    </div>
  );
};

export default App;

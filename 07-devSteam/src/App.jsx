import Header from "./components/Header";
import PromoCard from "./components/PromoCard";
import GameCard from "./components/GameCard";

function App() {
  const promoGames = [
    {
      id: 1,
      title: "League of Legends",
      image: "/lol.jpg",
      price: "R$99,90",
    },

    {
      id: 2,
      title: "Dota 2",
      image: "/dota.jpg",
      price: "R$99,90",
    },

    {
      id: 3,
      title: "Valorant",
      image: "/valorant.jpg",
      price: "R$99,90",
    },
  ];

  const otherGames = [
    {
      id: 4,
      title: "Counter Strike",
      category: "Ação, Estratégia",
      image: "/cs.jpg",
      price: "R$99,90",
    },

    {
      id: 5,
      title: "Cyberpunk",
      category: "RPG, Mundo Aberto",
      image: "/cyberpunk.jpg",
      price: "R$149,90",
    },
  ];

  return (
    <div className="container">
      <Header />

      <section>
        <h1>PROMOÇÕES</h1>

        <div className="promo-grid">
          {promoGames.map((game) => (
            <PromoCard
              key={game.id}
              game={game}
            />
          ))}
        </div>
      </section>

      <section>
        <h1>OUTROS JOGOS</h1>

        <div className="games-list">
          {otherGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
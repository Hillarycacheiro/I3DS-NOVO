export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} />

      <div className="game-info">
        <h2>{game.title}</h2>
        <p>{game.category}</p>

        <strong>{game.price}</strong>
      </div>

      <button>Adicionar ao carrinho</button>
    </div>
  );
}
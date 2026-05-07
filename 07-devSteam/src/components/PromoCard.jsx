export default function PromoCard({ game }) {
  return (
    <div className="promo-card">
      <img src={game.image} alt={game.title} />

      <div className="promo-info">
        <h3>OFERTA EXCLUSIVA</h3>

        <div className="prices">
          <span>-50%</span>

          <div>
            <small>R$199,80</small>
            <strong>{game.price}</strong>
          </div>
        </div>

        <button>Adicionar ao carrinho</button>
      </div>
    </div>
  );
}
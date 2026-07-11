interface Props {
  supermarketName: string;
  price: number;
  quantity: number;
  unit: string;
  pricePer100g: number | null;
}

function PriceCard({
  supermarketName,
  price,
  quantity,
  unit,
  pricePer100g,
}: Props) {
  return (
    <div className="price-card">
      <div className="price-card__body">
        <div className="price-card__main">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">
            {supermarketName}
          </p>
          <p className="mt-2 text-[clamp(1.5rem,6vw,1.75rem)] font-light tracking-tight text-white">
            {price} €
          </p>
          <p className="mt-1 text-sm text-white/35">
            {quantity}
            {unit}
          </p>
        </div>

        {pricePer100g !== null && (
          <span className="price-card__badge">
            {pricePer100g.toFixed(2)} € / 100g
          </span>
        )}
      </div>
    </div>
  );
}

export default PriceCard;

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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:bg-white/10">
      
      <div className="text-sm text-white/40">
        {supermarketName}
      </div>

      <div className="mt-2 text-xl font-medium">
        {price} €
      </div>

      <div className="text-sm text-white/30">
        {quantity}{unit}
      </div>

      {pricePer100g !== null && (
        <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
          {pricePer100g.toFixed(2)} € / 100g
        </div>
      )}
    </div>
  );
}

export default PriceCard;
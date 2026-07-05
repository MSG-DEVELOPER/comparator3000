//dumb component

interface Props {
  supermarketId: number;
  price: number;
  quantity: number;
  unit: string;
}

function PriceCard({ supermarketId, price, quantity, unit }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="text-sm text-white/40">
        Supermercado ID: {supermarketId}
      </div>

      <div className="mt-2 text-xl font-medium">
        {price} €
      </div>

      <div className="text-sm text-white/30">
        {quantity}{unit}
      </div>
    </div>
  );
}

export default PriceCard;
import Link from "next/link";
import { query } from "@/lib/db";
import PriceCard from "./components/PriceCard";

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}

interface ItemType {
  id: number;
  supermarket_id: number;
  supermarket_name: string;
  price: number;
  quantity: number;
  unit: string;
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  const data = await query(
    `
    SELECT 
      prices.*,
      supermarkets.name AS supermarket_name
    FROM prices
    JOIN supermarkets
      ON supermarkets.id = prices.supermarket_id
    WHERE prices.product_id = $1
    `,
    [id]
  );

  const dataProductName = await query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  const name = dataProductName.rows[0]?.name ?? "Producto";

  const products: ItemType[] = data.rows;

  const enrichedProducts = products.map((item) => {
    const pricePer100g =
      item.unit === "g"
        ? (item.price / item.quantity) * 100
        : null;

    return {
      ...item,
      pricePer100g,
    };
  });

  return (
    <div className="min-h-screen bg-[#090909] px-6 py-8">
      <Link
        href="/dashboard"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-white transition hover:border-white/20 hover:bg-white/10"
      >
        ←
      </Link>

      <h1 className="mt-8 text-3xl font-light text-white">
        {name}
      </h1>

      <div className="mt-6 space-y-3">
        {enrichedProducts.map((item) => (
          <PriceCard
            key={item.id}
            supermarketName={item.supermarket_name}
            price={item.price}
            quantity={item.quantity}
            unit={item.unit}
            pricePer100g={item.pricePer100g}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
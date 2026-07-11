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
    [id],
  );

  const dataProductName = await query(
    "SELECT * FROM products WHERE id = $1",
    [id],
  );

  const name = dataProductName.rows[0]?.name ?? "Producto";

  const products: ItemType[] = data.rows;

  const enrichedProducts = products.map((item) => {
    const pricePer100g =
      item.unit === "g" ? (item.price / item.quantity) * 100 : null;

    return {
      ...item,
      pricePer100g,
    };
  });

  return (
    <div className="page-shell">
      <main className="page-container page-container--wide animate-fade-up">
        <Link
          href="/dashboard"
          className="btn-ghost btn-icon mb-6"
          title="Volver al panel"
        >
          ←
        </Link>

        <div className="mb-8">
          <p className="section-label mb-2">Comparativa</p>
          <h1 className="page-title">{name}</h1>
          <p className="page-subtitle">
            {enrichedProducts.length > 0
              ? `${enrichedProducts.length} precio${enrichedProducts.length === 1 ? "" : "s"} registrado${enrichedProducts.length === 1 ? "" : "s"}`
              : "Sin precios registrados todavía."}
          </p>
        </div>

        <div className="space-y-3">
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
      </main>
    </div>
  );
}

export default Page;

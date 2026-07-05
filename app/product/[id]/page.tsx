import Link from "next/link"
import { query } from "@/lib/db";
import PriceCard from "./components/PriceCard";

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}

interface itemType{
  id:number,
  supermarket_id:number,
  price:number,
  quantity:number,
  unit:string
}

async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await query ("SELECT * from prices WHERE product_id = $1",[id]  )
  const products = data.rows;
  console.log(products[0])

  

  return <div className="min-h-screen bg-[#090909] px-6 py-8">
  <Link
    href="/dashboard"
    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-white transition hover:border-white/20 hover:bg-white/10"
  >
    ←
  </Link>

  <h1 className="mt-8 text-3xl font-light text-white">
    Producto #{id}
  </h1>
  <div className="mt-6 space-y-3">
  {products.map((item:itemType) => (
    <PriceCard
      key={item.id}
      supermarketId={item.supermarket_id}
      price={item.price}
      quantity={item.quantity}
      unit={item.unit}
    />
  ))}
</div>
</div>
}

export default Page;
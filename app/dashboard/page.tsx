//server component
//se ejecuta en el servidor como su nombre indica , de ahi que la url sea absoluta

import { query } from "@/lib/db";
import Link from "next/link"

interface productoType{
  name:string,
  id:number
}

async function Dashboard() {
  const data = await query("SELECT * from products");
  const productos = data.rows;
 


  return (
  <div className="relative flex min-h-full flex-1 overflow-hidden bg-[#090909] px-6 py-10">
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[42%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#090909_72%)]" />
    </div>

    <main className="relative z-10 mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
        <h1 className="mb-2 text-3xl font-light tracking-tight text-white">
          Productos
        </h1>
       <Link href={"/product/new"}>➕</Link>
        <p className="mb-8 text-sm text-white/40">
          Selecciona un producto para comparar precios.
        </p>

        <div className="space-y-3">
          {productos.map((item: productoType) => (
            <Link
            href={`/product/${item.id}`}
              key={item.id}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:border-white/20 hover:bg-white/10"
            >
              <span className="text-base font-medium text-white">
                {item.name}
              </span>

              <span className="text-lg text-white/30">›</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  </div>
);
}

export default Dashboard;

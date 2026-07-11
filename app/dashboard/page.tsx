//server component
//se ejecuta en el servidor como su nombre indica , de ahi que la url sea absoluta

import { query } from "@/lib/db";
import Link from "next/link";

interface productoType {
  name: string;
  id: number;
}

async function Dashboard() {
  const data = await query("SELECT * from products");
  const productos = data.rows;

  return (
    <div className="page-shell">
      <main className="page-container animate-fade-up">
        <div className="glass-card">
          <div className="page-header">
            <div className="page-header__text">
              <p className="section-label mb-2">Panel</p>
              <h1 className="page-title">Productos</h1>
              <p className="page-subtitle">
                Selecciona un producto para comparar precios.
              </p>
            </div>

            <Link
              href="/product/new"
              className="btn-ghost btn-icon page-header__action"
              title="Añadir precio"
              aria-label="Añadir precio"
            >
              +
            </Link>
          </div>

          <div className="space-y-2.5">
            {productos.map((item: productoType) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="list-item"
              >
                <span className="list-item__label">{item.name}</span>
                <span className="shrink-0 text-xl text-white/30">›</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

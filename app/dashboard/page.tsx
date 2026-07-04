//server component
//se ejecuta en el servidor como su nombre indica , de ahi que la url sea absoluta

import { query } from "@/lib/db";

async function Dashboard() {
  const data = await query("SELECT * from products");
  const productos = data.rows;

  return <div>{productos[1].name}</div>;
}

export default Dashboard;

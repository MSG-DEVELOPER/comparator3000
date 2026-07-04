//server component
//se ejecuta en el servidor como su nombre indica , de ahi que la url sea absoluta

import { query } from "@/lib/db";

interface productoType{
  name:string,
  id:number
}

async function Dashboard() {
  const data = await query("SELECT * from products");
  const productos = data.rows;
  console.log(productos[0].name);
  console.log(productos[0]);
  console.log( productos);


  return <div>
   
    <div>
lista productos
{productos.map((item:productoType)=>(<p key={item.id}>{item.name}</p>))}


    </div>



  </div>;
}

export default Dashboard;

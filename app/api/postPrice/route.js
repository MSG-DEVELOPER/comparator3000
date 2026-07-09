//handler http

import {query} from "@/lib/db"

export async function POST (request){

 const data = await request.json()
 const {price,quantity,unit,PNE, product_id, supermarket_id} = data   

 

 await query(
    `
    INSERT INTO prices
    (product_id, supermarket_id, price, quantity, unit, pne)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      product_id,
      supermarket_id,
      price,
      quantity,
      unit,
      PNE,
    ]
  );

  return Response.json({
    ok:true,
    message:"Precio añadido correctamente"
  })
}
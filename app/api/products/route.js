import {query} from "@/lib/db"

export async function GET () {

const productos = await query ("SELECT * from products")

return Response.json(productos.rows)


}
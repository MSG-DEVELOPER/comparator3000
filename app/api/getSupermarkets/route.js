import {query} from "@/lib/db"

export async function GET (){

   const data = await query("SELECT * from supermarkets") ;
   return Response.json(data.rows)


}
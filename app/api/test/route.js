import {query} from "@/lib/db"

export async function GET(){

    const result=await query("SELECT * FROM test");

    return Response.json(result.rows);

}
import {query} from "@/lib/db"

export async function POST(request){

const data = await request.json()
const name=data.name.trim()

await query( `
  INSERT INTO products (name)
  VALUES ($1)
  `,
  [name])

}
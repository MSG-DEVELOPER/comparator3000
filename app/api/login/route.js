import {query} from "@/lib/db"

export async function POST (request){

  const data =await request.json(); 
  const {email} = data;

  const result=await query("SELECT * FROM users WHERE email = $1",[email]);

  if (result.rows.length !== 0 ){
    return Response.json({mensage:"okey cara de pato",succes:true})
  }else{
    return Response.json({succes:false})
  }
//falta

}
import bcrypt from "bcrypt";
import { query } from "@/lib/db";

export async function POST(request) {
  const data = await request.json();
  const { email, pass } = data;

  const result = await query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    return Response.json({ succes: false });
  }

  const usuario = result.rows[0];

  const coincide = await bcrypt.compare(
    pass,
    usuario.password
  );

  if (coincide) {
    return Response.json({ succes: true });
  }

  return Response.json({ succes: false });
}
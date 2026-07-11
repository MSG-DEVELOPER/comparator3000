"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface dataType {
  email: string;
  pass: string;
}

function Page() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<dataType>();

  async function validar(data: dataType) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const respuesta = await response.json();
    console.log(respuesta.succes);
    if (respuesta.succes) {
      router.replace("/dashboard");
    }
  }

  return (
    <div className="page-shell page-container--center">
      <main className="animate-fade-up relative z-10 w-full">
        <form
          onSubmit={handleSubmit(validar)}
          className="glass-card glass-card--lg"
        >
          <div className="mb-6 text-center sm:mb-8">
            <p className="section-label mb-3">Acceso</p>
            <h1 className="page-title">Login</h1>
            <p className="page-subtitle">
              Introduce tus credenciales para continuar.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="section-label">
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="tu@email.com"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="pass" className="section-label">
                Contraseña
              </label>
              <input
                id="pass"
                {...register("pass")}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary btn-primary--full mt-2">
              Entrar
            </button>
          </div>

          <p className="mt-5 text-center sm:mt-6">
            <Link href="/" className="btn-link">
              ← Volver al inicio
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Page;

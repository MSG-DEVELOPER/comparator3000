"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface dataType{
email:string,
pass:string

}

function Page() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<dataType>();

  async function validar(data:dataType) {
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
    <div className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden bg-[#090909] px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[42%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#090909_72%)]" />
      </div>

      <main className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit(validar)}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
        >
          <h1 className="mb-8 text-center text-3xl font-light tracking-tight text-white">
            Login
          </h1>

          <div className="space-y-5">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
            />

            <input
              {...register("pass")}
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
            />

            <button
              type="submit"
              className="mt-2 w-full cursor-pointer rounded-xl border border-white/12 bg-white/[0.03] py-3 text-xs font-medium uppercase tracking-[0.25em] text-white/85 transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              Login
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Page;

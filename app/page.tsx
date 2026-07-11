"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="page-shell page-container--center">
      <main className="animate-fade-up flex flex-col items-stretch gap-10">
        <div className="text-center">
          <p className="section-label mb-4">Comparador de precios</p>
          <h1 className="select-none text-center font-sans text-[clamp(2.25rem,11vw,4.5rem)] font-light leading-[0.95] tracking-[-0.045em] text-white">
            Comparator
            <span className="text-white/35">3000</span>
          </h1>
          <p className="page-subtitle mx-auto mt-5 max-w-[18rem]">
            Encuentra el mejor precio entre supermercados en segundos.
          </p>
        </div>

        <Link href="/login" className="block w-full">
          <button type="button" className="btn-primary btn-primary--pill">
            Entrar
          </button>
        </Link>
      </main>
    </div>
  );
}

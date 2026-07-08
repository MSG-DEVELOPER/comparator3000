"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface ProductType {
  id: number;
  name: string;
}

interface SupermarketType {
  id: number;
  name: string;
}

function NewProduct() {
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [openProducts, setOpenProducts] = useState(false);

  const [supermarketsList, setSupermarketsList] = useState<SupermarketType[]>([]);
  const [openSupermarkets, setOpenSupermarkets] = useState(false);

  const { register } = useForm();

  useEffect(() => {
    async function getData() {
      const data = await fetch("/api/products");
      const response = await data.json();

      setProductsList(response);

      const supermarketsData = await fetch("/api/getSupermarkets");
      const supermarketsResponse = await supermarketsData.json();

      setSupermarketsList(supermarketsResponse);
    }

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] px-6 py-10">
      <main className="mx-auto w-full max-w-md">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">

          <h1 className="mb-8 text-3xl font-light tracking-tight text-white">
            Añadir precio
          </h1>


          {/* PRODUCTO */}
          <div className="relative mb-6">

            <input
              type="text"
              placeholder="Producto"
              {...register("nombre")}
              onFocus={() => setOpenProducts(true)}
              onBlur={() => {
                setTimeout(() => {
                  setOpenProducts(false);
                }, 150);
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
            />


            {openProducts && (
              <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-xl">

                {productsList.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer px-4 py-3 text-white/80 transition hover:bg-white/10"
                  >
                    {item.name}
                  </div>
                ))}

              </div>
            )}

          </div>



          {/* SUPERMERCADO */}
          <div className="relative">

            <input
              type="text"
              placeholder="Supermercado"
              onFocus={() => setOpenSupermarkets(true)}
              onBlur={() => {
                setTimeout(() => {
                  setOpenSupermarkets(false);
                }, 150);
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
            />


            {openSupermarkets && (
              <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-xl">

                {supermarketsList.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer px-4 py-3 text-white/80 transition hover:bg-white/10"
                  >
                    {item.name}
                  </div>
                ))}

              </div>
            )}

          </div>


        </div>

      </main>
    </div>
  );
}

export default NewProduct;
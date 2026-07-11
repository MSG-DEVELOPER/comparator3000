"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

interface ProductType {
  id: number;
  name: string;
}

interface SupermarketType {
  id: number;
  name: string;
}

interface dataType {
  nombre: string;
  price: string;
  quantity: string;
  unit: string;
  PNE: boolean;
}

function NewProduct() {
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [openProducts, setOpenProducts] = useState(false);

  const [supermarketsList, setSupermarketsList] = useState<SupermarketType[]>(
    [],
  );
  const [openSupermarkets, setOpenSupermarkets] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [selectedSupermarket, setSelectedSupermarket] =
    useState<SupermarketType | null>(null);

  const [productName, setProductName] = useState("Producto");
  const [supermarketName, setSupermarketName] = useState("Supermercado");

    const [modalProductOpen,setModalProductOpen] = useState(false)


  const { register, handleSubmit } = useForm<dataType>();
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

  async function validateForm(data: dataType) {
    if (!selectedProduct || !selectedSupermarket) {
      return;
    }

    const finalData = {
      ...data,
      product_id: selectedProduct.id,
      supermarket_id: selectedSupermarket.id,
    };

    console.log(finalData);

    await fetch("/api/postPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
  }

  return (
    <div className="min-h-screen bg-[#090909] px-6 py-10">
      <main className="mx-auto w-full max-w-md">
        <form
          onSubmit={handleSubmit(validateForm)}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
        >
          <h1 className="mb-8 text-3xl font-light tracking-tight text-white">
            Añadir precio
          </h1>

          {/* PRODUCTO */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Producto"
              readOnly
              value={productName}
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
               
                <button
                  onClick={()=>setModalProductOpen(true)}
                  className="italic block border-b border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  ➕ Nuevo producto
                </button>
                {productsList.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer px-4 py-3 text-white/80 transition hover:bg-white/10"
                    onClick={() => {
                      setSelectedProduct(item);
                      setProductName(item.name);
                      setOpenProducts(false);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>


     
          {/* SUPERMERCADO */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Supermercado"
              readOnly
              value={supermarketName}
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
                    onClick={() => {
                      setSelectedSupermarket(item);
                      setSupermarketName(item.name);
                      setOpenSupermarkets(false);
                    }}
                    className="cursor-pointer px-4 py-3 text-white/80 transition hover:bg-white/10"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PRECIO */}
          <input
            type="number"
            step="0.01"
            placeholder="Precio (€)"
            {...register("price")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
          />

          {/* CANTIDAD + UNIDAD */}
          <div className="mt-6 flex gap-3">
            <input
              type="number"
              step="0.01"
              placeholder="Cantidad"
              {...register("quantity")}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/30"
            />

            <select
              {...register("unit")}
              className="w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none transition focus:border-white/30"
            >
              <option value="" className="bg-[#111]">
                Unidad
              </option>

              <option value="g" className="bg-[#111]">
                g
              </option>

              <option value="kg" className="bg-[#111]">
                kg
              </option>

              <option value="ml" className="bg-[#111]">
                ml
              </option>

              <option value="l" className="bg-[#111]">
                l
              </option>

              <option value="ud" className="bg-[#111]">
                ud
              </option>
            </select>
          </div>

          {/* PNE */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                {...register("PNE")}
                className="h-4 w-4 accent-white"
              />

              <div>
                <p className="text-white">Peso neto escurrido (PNE)</p>

                <p className="mt-1 text-xs text-white/40">
                  Usar el peso real del alimento sin líquido
                </p>
              </div>
            </label>
            <button type="submit" className="text-white border">
              CREAR
            </button>
          </div>
        </form>

             {modalProductOpen && < Modal  clickBotonX={()=>setModalProductOpen(false)}   />}
      </main>
    </div>
  );
}

export default NewProduct;

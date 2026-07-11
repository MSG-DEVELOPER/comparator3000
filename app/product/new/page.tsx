"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
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

  const [modalProductOpen, setModalProductOpen] = useState(false);

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
    <div className="page-shell">
      <main className="page-container animate-fade-up">
        <Link
          href="/dashboard"
          className="btn-ghost btn-icon mb-6"
          title="Volver al panel"
        >
          ←
        </Link>

        <form
          onSubmit={handleSubmit(validateForm)}
          className="glass-card"
        >
          <div className="mb-8">
            <p className="section-label mb-2">Nuevo registro</p>
            <h1 className="page-title">Añadir precio</h1>
            <p className="page-subtitle">
              Registra un precio para un producto y supermercado.
            </p>
          </div>

          {/* PRODUCTO */}
          <div className="relative mb-5">
            <label className="section-label">Producto</label>
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
              className="input-field"
            />

            {openProducts && (
              <div
                className="dropdown-panel scroll-y"
                onMouseDown={(e) => e.preventDefault()}
                onWheel={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setModalProductOpen(true)}
                  className="dropdown-item dropdown-item--action block w-full text-left"
                >
                  + Nuevo producto
                </button>
                {productsList.map((item) => (
                  <div
                    key={item.id}
                    className="dropdown-item"
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
          <div className="relative mb-5">
            <label className="section-label">Supermercado</label>
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
              className="input-field"
            />

            {openSupermarkets && (
              <div
                className="dropdown-panel scroll-y"
                onMouseDown={(e) => e.preventDefault()}
                onWheel={(e) => e.stopPropagation()}
              >
                {supermarketsList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedSupermarket(item);
                      setSupermarketName(item.name);
                      setOpenSupermarkets(false);
                    }}
                    className="dropdown-item"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PRECIO */}
          <div className="mb-5">
            <label className="section-label">Precio</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="Precio (€)"
              {...register("price")}
              className="input-field"
            />
          </div>

          {/* CANTIDAD + UNIDAD */}
          <div className="field-row mb-5">
            <div className="flex-1">
              <label className="section-label">Cantidad</label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                placeholder="Cantidad"
                {...register("quantity")}
                className="input-field"
              />
            </div>

            <div className="field-row__unit">
              <label className="section-label">Unidad</label>
              <select {...register("unit")} className="input-field">
                <option value="" className="bg-[#111]">
                  —
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
          </div>

          {/* PNE */}
          <div className="checkbox-block mb-6">
            <label>
              <input type="checkbox" {...register("PNE")} />
              <div>
                <p className="text-base text-white">
                  Peso neto escurrido (PNE)
                </p>
                <p className="mt-1 text-sm leading-snug text-white/40">
                  Usar el peso real del alimento sin líquido
                </p>
              </div>
            </label>
          </div>

          <button type="submit" className="btn-primary btn-primary--full">
            Crear
          </button>
        </form>

        {modalProductOpen && (
          <Modal clickBotonX={() => setModalProductOpen(false)} />
        )}
      </main>
    </div>
  );
}

export default NewProduct;

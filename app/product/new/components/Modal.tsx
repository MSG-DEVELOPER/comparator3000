"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface clickType {
  clickBotonX: () => void;
}

interface dataType {
  name: string;
}

function Modal({ clickBotonX }: clickType) {
  const { register, handleSubmit } = useForm<dataType>();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function crear(data: dataType) {
    console.log(data);

    await fetch("/api/postProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-overlay" onClick={clickBotonX} />

      <div className="modal-panel animate-fade-up">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="section-label mb-2">Nuevo</p>
            <h2 className="text-xl font-light tracking-tight text-white">
              Crear producto
            </h2>
          </div>
          <button
            type="button"
            onClick={clickBotonX}
            className="btn-ghost btn-icon text-sm"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(crear)} className="space-y-4">
          <div>
            <label htmlFor="product-name" className="section-label">
              Nombre
            </label>
            <input
              id="product-name"
              type="text"
              {...register("name")}
              placeholder="Nombre del producto"
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-primary btn-primary--full">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;

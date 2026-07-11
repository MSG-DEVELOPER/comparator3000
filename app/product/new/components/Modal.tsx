"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

interface clickType {
  clickBotonX: () => void;
}

interface dataType {
  name: string;
}

function Modal({ clickBotonX }: clickType) {
  const [mounted, setMounted] = useState(false);
  const { register, handleSubmit } = useForm<dataType>();

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
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

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="modal-backdrop">
      <div className="modal-overlay" onClick={clickBotonX} />

      <div
        className="modal-panel scroll-y animate-fade-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="section-label mb-2">Nuevo</p>
            <h2
              id="modal-title"
              className="text-xl font-light tracking-tight text-white"
            >
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
    </div>,
    document.body,
  );
}

export default Modal;

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface clickType {
  clickBotonX: () => void;
}

interface dataType{
  name:string
}




function Modal({ clickBotonX }: clickType) {
  const { register,handleSubmit } = useForm<dataType>();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

 async function crear(data:dataType){

    console.log(data)

    await fetch("/api/postProduct", {

      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)

    })


  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* CONTENIDO MODAL */}
      <div className="relative z-10 text-white border">
        Hola modal
        <form onSubmit={handleSubmit(crear)}>
          <div>
            {" "}
            <input type="text" {...register("name")} placeholder="nombre" />
            <button type="submit">CREAR</button>
          </div>
        </form>
        <button className="pointer" onClick={clickBotonX}>
          ❌
        </button>
      </div>
    </div>
  );
}

export default Modal;

import { useEffect } from "react";

function Modal() {

  useEffect(()=>{

    document.body.style.overflow="hidden";

    return()=>{
      document.body.style.overflow="";
    }


  },[])


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />


      {/* CONTENIDO MODAL */}
      <div className="relative z-10 text-white border">
        Hola modal
      </div>

    </div>
  );
}

export default Modal;
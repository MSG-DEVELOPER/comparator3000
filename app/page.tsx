"use client";

export default function Home() {
  function handleLogin() {
    alert("Login");
  }

  return (
    <>
      <div className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden bg-[#090909]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[42%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#090909_72%)]" />
        </div>

        <main className="landing-enter relative z-10 flex flex-col items-center gap-14 px-6">
          <h1 className="select-none text-center font-sans text-[clamp(2.5rem,8vw,4.5rem)] font-light leading-none tracking-[-0.045em] text-white">
            Comparator
            <span className="text-white/35">3000</span>
          </h1>

          <button
            type="button"
            onClick={handleLogin}
            className="cursor-pointer rounded-full border border-white/12 bg-white/[0.03] px-11 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/85 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white hover:shadow-[0_0_48px_rgba(255,255,255,0.05)] active:scale-[0.98]"
          >
            Login
          </button>
        </main>
      </div>

      <style jsx global>{`
        @keyframes landingEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .landing-enter {
          animation: landingEnter 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </>
  );
}

import Link from "next/link";

const features = [
  {
    index: "01",
    title: "Normalizado",
    body: "Compara por 100g, litro o unidad. Manzanas con manzanas.",
  },
  {
    index: "02",
    title: "Multi-super",
    body: "Mercadona, Carrefour, Lidl… todos en un solo sitio.",
  },
  {
    index: "03",
    title: "Al instante",
    body: "Registra un precio y ve la comparativa en segundos.",
  },
];

export default function Home() {
  return (
    <div className="landing">
      <div className="landing__noise" aria-hidden />
      <div className="landing__grid" aria-hidden />
      <div className="landing__orb landing__orb--a" aria-hidden />
      <div className="landing__orb landing__orb--b" aria-hidden />
      <div className="landing__vignette" aria-hidden />

      <main className="landing__main">
        <header className="landing__header landing-reveal" style={{ animationDelay: "0.05s" }}>
          <span className="landing__mark">Comparator3000</span>
          <span className="landing__badge">Beta</span>
        </header>

        <section className="landing__hero">
          <p
            className="landing__eyebrow landing-reveal"
            style={{ animationDelay: "0.12s" }}
          >
            Comparador de precios
          </p>

          <h1 className="landing__title">
            <span
              className="landing__title-row landing-reveal"
              style={{ animationDelay: "0.18s" }}
            >
              Compara
            </span>
            <span
              className="landing__title-row landing__title-row--dim landing-reveal"
              style={{ animationDelay: "0.26s" }}
            >
              sin perder
            </span>
            <span
              className="landing__title-row landing__title-row--accent landing-reveal"
              style={{ animationDelay: "0.34s" }}
            >
              un céntimo.
            </span>
          </h1>

          <p
            className="landing__lede landing-reveal"
            style={{ animationDelay: "0.44s" }}
          >
            Precios reales entre supermercados, normalizados para que el
            más barato no se esconda.
          </p>
        </section>

        <section className="landing__features" aria-label="Características">
          {features.map((item, i) => (
            <article
              key={item.index}
              className="landing__feature landing-reveal"
              style={{ animationDelay: `${0.52 + i * 0.08}s` }}
            >
              <span className="landing__feature-index">{item.index}</span>
              <div>
                <h2 className="landing__feature-title">{item.title}</h2>
                <p className="landing__feature-body">{item.body}</p>
              </div>
            </article>
          ))}
        </section>

        <footer className="landing__footer">
          <Link
            href="/login"
            className="landing__cta landing-reveal"
            style={{ animationDelay: "0.78s" }}
          >
            <span>Empezar a comparar</span>
            <span className="landing__cta-arrow" aria-hidden>
              →
            </span>
          </Link>

          <p
            className="landing__note landing-reveal"
            style={{ animationDelay: "0.86s" }}
          >
            Gratis · Sin registro complicado
          </p>
        </footer>
      </main>
    </div>
  );
}

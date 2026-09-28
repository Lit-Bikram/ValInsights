import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const scopeItems = [
  { number: "01", title: "Plant & Machinery", text: "Plant and machinery." },
  { number: "02", title: "Specialised Equipment", text: "Specialised equipment." },
  { number: "03", title: "Production Lines", text: "Production lines." },
  { number: "04", title: "Heavy Equipment & Infrastructure", text: "Heavy equipment and infrastructure assets." },
  { number: "05", title: "Vehicles & Fleets", text: "Vehicles and fleets." },
  { number: "06", title: "Industrial & Technical Assets", text: "Industrial facilities, technical and operational assets, and other asset-backed interests." }
];
const methodItems = [
  { number: "01", title: "Replacement Cost", text: "Replacement cost may be considered where the cost and characteristics of the physical asset are relevant." },
  { number: "02", title: "Market Evidence", text: "Available market evidence is considered alongside the asset's condition, age, capacity, utilisation, and marketability." },
  { number: "03", title: "Income-Based Approaches", text: "Income-based approaches may be used where the asset's role within the operating business supports an income-based analysis." },
  { number: "04", title: "Obsolescence & Useful Life", text: "Physical deterioration, functional and economic obsolescence, and remaining useful life may materially influence the analysis." }
];
const relatedInsights = [
  { type: "Valuation Perspectives", title: "Capacity, technology, and cost structure in tangible asset valuation" },
  { type: "Valuation Perspectives", title: "Remaining useful life and obsolescence" },
  { type: "Current Observations", title: "Manufacturing capital expenditure and asset values" },
  { type: "Current Observations", title: "Collateral valuation in stressed portfolios" }
];

export default function TangibleAssetsPage() {
  return (
    <>
      <Header />

      <main className="service-page">
        <section className="service-hero">
          <Image
            src="/images/solutions/tangible-assets.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" />

          <div className="service-shell service-hero__content">
            <p className="service-breadcrumb">
              Our Solution / Tangible Assets
            </p>

            <h1>Tangible Assets</h1>

            <p className="service-hero__intro">We value plant, machinery, specialised equipment, production lines, infrastructure assets, and other physical assets. Our analysis considers the asset’s condition, age, capacity, utilisation, remaining useful life, marketability, replacement cost, and role within the operating business.</p>
          </div>
        </section>

        <section className="service-introduction">
          <div className="service-shell service-introduction__grid">
            <div>
              <p className="service-label">Introduction</p>
              <h2>What We Value</h2>
            </div>

            <div className="service-introduction__copy">
              <p>We value plant, machinery, specialised equipment, production lines, infrastructure assets, and other physical assets. Our analysis considers the asset’s condition, age, capacity, utilisation, remaining useful life, marketability, replacement cost, and role within the operating business.</p>
              <p>Our work considers the economic substance of the subject being valued, its contractual and ownership features, the available evidence, and the requirements of the assignment.</p>
            </div>
          </div>
        </section>

        <section className="service-scope">
          <div className="service-shell">
            <p className="service-label">Scope of Work</p>
            <h2>Areas of Coverage</h2>
            <p className="service-section-intro">SCOPE_We value plant, machinery, specialised equipment, production lines, infrastructure assets, and other physical assets. Our analysis considers the asset’s condition, age, capacity, utilisation, remaining useful life, marketability, replacement cost, and role within the operating business.</p>

            <div className="service-scope__grid">
              {scopeItems.map((item) => (
                <article key={item.number} className="service-scope-card">
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-approach">
          <div className="service-shell">
            <p className="service-label">Approach</p>
            <h2>How We Approach These Assignments</h2>
            <p className="service-section-intro service-section-intro--wide">
              We select valuation methods according to the characteristics of the business, asset, or instrument. Depending on the assignment, different approaches may be applied.
            </p>

            <div className="service-methods">
              {methodItems.map((item) => (
                <article key={item.number} className="service-method-card">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <p className="service-approach__tail">Our reporting distinguishes, where relevant, between asset-level value and value arising from the broader business or operating platform.</p>
          </div>
        </section>

        <section className="service-insights">
          <div className="service-shell">
            <p className="service-label">Related Insights</p>
            <h2>Tangible Assets</h2>
            <p className="service-section-intro">
              Selected topics relating to Tangible Assets_LOWER.
            </p>

            <div className="service-insights__list">
              {relatedInsights.map((item) => (
                <Link key={item.title} href="/insights" className="service-insight-row">
                  <span>{item.type}</span>
                  <strong>{item.title}</strong>
                  <b>→</b>
                </Link>
              ))}
            </div>

            <Link href="/solutions" className="service-return">
              ← Return to Solution Dashboard
            </Link>
          </div>
        </section>

        <section className="service-cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>To discuss a tangible asset valuation or asset-backed matter, contact us.</p>
            <Link href="/contact" className="service-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

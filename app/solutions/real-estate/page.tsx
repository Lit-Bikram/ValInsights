import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RelatedServiceInsights from "../../components/insights/RelatedServiceInsights";

const scopeItems = [
  { number: "01", title: "Commercial Real Estate", text: "Office, retail, and mixed-use assets." },
  { number: "02", title: "Residential Properties & Development", text: "Residential properties, portfolios, and development interests." },
  { number: "03", title: "Land & Development Projects", text: "Land and development projects." },
  { number: "04", title: "Industrial & Logistics Assets", text: "Industrial and logistics assets." },
  { number: "05", title: "Hospitality Assets", text: "Hospitality assets." },
  { number: "06", title: "Investment Property & Platforms", text: "Investment property, real estate platforms, REITs and related interests." },
  { number: "07", title: "Infrastructure-Linked Real Assets", text: "Infrastructure-linked real assets." }
];
const methodItems = [
  { number: "01", title: "Income Capitalisation", text: "Income capitalisation may be used for income-producing real estate, with judgement around cap rates and available evidence." },
  { number: "02", title: "Discounted Cash Flow Analysis", text: "Discounted cash flow analysis may be used where operating, lease, development, or other cash-flow assumptions are relevant." },
  { number: "03", title: "Market Comparables", text: "Market comparables provide evidence alongside the characteristics and rights associated with the asset." },
  { number: "04", title: "Development Appraisal", text: "Development appraisal considers development timelines, cost-to-complete, absorption, financing, and exit assumptions." },
  { number: "05", title: "Replacement Cost", text: "Replacement cost may be relevant where the physical asset and its replacement economics are important to the assignment." }
];
/*
 * LEGACY RELATED INSIGHTS — kept intact for easy rollback.
 * The page now loads the latest 3 published insights from the database
 * using the core-service relationship.
 *
 const relatedInsights = [
 *   { type: "Valuation Perspectives", title: "Income-producing real estate: cap rates, DCF, and evidence" },
 *   { type: "Valuation Perspectives", title: "Development project valuation" },
 *   { type: "Valuation Perspectives", title: "Real estate in lending and restructuring" },
 *   { type: "Current Observations", title: "Hospitality and specialised real estate" }
 * ];
 */

export default function RealEstatePage() {
  return (
    <>
      <Header />

      <main className="service-page" data-service-page="real-estate">
        <section className="service-hero service-hero--inner">
          <Image
            src="/images/solutions/real-estate.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" />

          <div className="service-shell service-hero__content">
            <p className="service-breadcrumb">
              Our Solution / Real Estate
            </p>

            <h1>Real Estate</h1>

            <p className="service-hero__intro">We value real estate assets, portfolios, platforms, and development interests across commercial, residential, industrial, logistics, hospitality, and infrastructure-linked categories. Our work reflects the physical characteristics of the asset, the legal and economic rights attached to it, its operating or development profile, and the relevant market evidence.</p>
          </div>
        </section>

        {/*
         * LEGACY LAYOUT — kept intact for easy rollback.
         * Removed from the current individual-solution layout.
         *
         *         <section className="service-introduction">
                   <div className="service-shell service-introduction__grid">
                     <div>
                       <p className="service-label">Introduction</p>
                       <h2>What We Value</h2>
                     </div>
         
                     <div className="service-introduction__copy">
                       <p>We value real estate assets, portfolios, platforms, and development interests across commercial, residential, industrial, logistics, hospitality, and infrastructure-linked categories. Our work reflects the physical characteristics of the asset, the legal and economic rights attached to it, its operating or development profile, and the relevant market evidence.</p>
                       <p>Our work considers the economic substance of the subject being valued, its contractual and ownership features, the available evidence, and the requirements of the assignment.</p>
                     </div>
                   </div>
                 </section>
         */}

        <section className="service-scope">
          <div className="service-shell">
            <p className="service-label">Scope of Work</p>
            <h2>What We Value</h2>
            <p className="service-section-intro">SCOPE_We value real estate assets, portfolios, platforms, and development interests across commercial, residential, industrial, logistics, hospitality, and infrastructure-linked categories. Our work reflects the physical characteristics of the asset, the legal and economic rights attached to it, its operating or development profile, and the relevant market evidence.</p>

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

        {/*
         * LEGACY LAYOUT — kept intact for easy rollback.
         * Removed from the current individual-solution layout.
         *
         *         <section className="service-approach">
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
         
                     <p className="service-approach__tail">We focus on market evidence, occupancy and lease assumptions, development timelines, cost-to-complete, exit assumptions, and the legal and economic rights associated with the asset. The resulting analysis is structured to make the principal value drivers and sensitivities clear.</p>
                   </div>
                 </section>
         */}

        {/*
         * LEGACY RELATED INSIGHTS SECTION — kept intact for easy rollback.
         * The hardcoded insight rows have been replaced by database-driven
         * service-specific publication cards.
         *
         *         <section className="service-insights">
         *           <div className="service-shell">
         *             [LEGACY JSX COMMENT  LEGACY: category label retained for rollback.  LEGACY JSX COMMENT]
         *             [LEGACY JSX COMMENT  <p className="service-label">Related Insights</p>  LEGACY JSX COMMENT]
         *             [LEGACY JSX COMMENT  LEGACY: previous Related Insights subheading retained for rollback.  LEGACY JSX COMMENT]
         *             [LEGACY JSX COMMENT  <h2>Real Estate</h2>  LEGACY JSX COMMENT]
         *             <h2>Related Insights</h2>
         *             [LEGACY JSX COMMENT  LEGACY: explanatory Related Insights intro retained for rollback.  LEGACY JSX COMMENT]
         *             [LEGACY JSX COMMENT  <p className="service-section-intro">
         *               Selected topics relating to Real Estate_LOWER.
         *             </p>  LEGACY JSX COMMENT]
         * 
         *             <div className="service-insights__list">
         *               {relatedInsights.map((item) => (
         *                 <Link key={item.title} href="/insights" className="service-insight-row">
         *                   [LEGACY JSX COMMENT  LEGACY: insight category retained in the data and here for rollback.  LEGACY JSX COMMENT]
         *                   [LEGACY JSX COMMENT  <span>{item.type}</span>  LEGACY JSX COMMENT]
         *                   <strong>{item.title}</strong>
         *                   <b>→</b>
         *                 </Link>
         *               ))}
         *             </div>
         * 
         *             <Link href="/solutions" className="service-return">
         *               ← Return to Solution Dashboard
         *             </Link>
         *           </div>
         *         </section>
         * 
         */}

        <RelatedServiceInsights serviceSlug="real-estate" />

        <section className="service-cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>To discuss a real estate valuation or related assignment, contact us.</p>
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

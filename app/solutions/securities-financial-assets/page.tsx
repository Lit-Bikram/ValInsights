import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RelatedServiceInsights from "../../components/insights/RelatedServiceInsights";

const scopeItems = [
  { number: "01", title: "Businesses & Enterprises", text: "Operating companies, divisions, platforms, and enterprise interests." },
  { number: "02", title: "Equity & Debt Securities", text: "Ordinary and preference shares, minority interests, bonds, debentures, loans, and structured credit." },
  { number: "03", title: "Intangible Assets & Intellectual Property", text: "Brands, customer relationships, technology, software, patents, trademarks, copyrights, licences, and contractual rights." },
  { number: "04", title: "Complex Instruments & Derivatives", text: "Convertibles, warrants, options, contingent consideration, swaps, and other hybrid or derivative-like securities." }
];
const methodItems = [
  { number: "01", title: "Discounted Cash Flow Analysis", text: "Discounted cash flow analysis may be used where the characteristics of the business or asset make an income-based approach appropriate." },
  { number: "02", title: "Market Comparables", text: "Market comparables may be considered alongside the available evidence and characteristics of the subject being valued." },
  { number: "03", title: "Option-Pricing Models", text: "Option-pricing models may be relevant for instruments involving optionality, contingencies, or derivative-like features." },
  { number: "04", title: "Scenario Analysis", text: "Scenario analysis and probability-weighted outcomes may be used where the assignment requires consideration of alternative outcomes." }
];
/*
 * LEGACY RELATED INSIGHTS — kept intact for easy rollback.
 * The page now loads the latest 3 published insights from the database
 * using the core-service relationship.
 *
 const relatedInsights = [
 *   { type: "Valuation Perspectives", title: "Valuing businesses and equity interests" },
 *   { type: "Valuation Perspectives", title: "Intangible assets and intellectual property" },
 *   { type: "Valuation Perspectives", title: "Complex instruments and derivatives" },
 *   { type: "Current Observations", title: "Private equity and AIF interests in India and the Gulf" },
 *   { type: "Current Observations", title: "Fair value challenges in private credit and structured debt" }
 * ];
 */

export default function SecuritiesFinancialAssetsPage() {
  return (
    <>
      <Header />

      <main className="service-page" data-service-page="securities-financial-assets">
        <section className="service-hero service-hero--inner">
          <Image
            src="/images/solutions/securities-financial-assets.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" />

          <div className="service-shell service-hero__content">
            <p className="service-breadcrumb">
              Our Solution / Securities & Financial Assets
            </p>

            <h1>Securities & Financial Assets</h1>

            <p className="service-hero__intro">We value businesses, equity and debt securities, intangible assets, intellectual property, and complex financial instruments. Our work considers the economic substance of the subject being valued, its contractual and ownership features, the available evidence, and the requirements of the assignment.</p>
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
                       <p>We value businesses, equity and debt securities, intangible assets, intellectual property, and complex financial instruments. Our work considers the economic substance of the subject being valued, its contractual and ownership features, the available evidence, and the requirements of the assignment.</p>
                       <p>Our work considers the economic substance of the subject being valued, its contractual and ownership features, the available evidence, and the requirements of the assignment.</p>
                     </div>
                   </div>
                 </section>
         */}

        <section className="service-scope">
          <div className="service-shell">
            <p className="service-label">Scope of Work</p>
            <h2>What We Value</h2>
            <p className="service-section-intro">SCOPE_We value businesses, equity and debt securities, intangible assets, intellectual property, and complex financial instruments. Our work considers the economic substance of the subject being valued, its contractual and ownership features, the available evidence, and the requirements of the assignment.</p>

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
         
                     <p className="service-approach__tail">Our analysis is supported by appropriate market evidence, sensitivity testing, and clear documentation of assumptions and limitations.</p>
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
         *             [LEGACY JSX COMMENT  <h2>Securities & Financial Assets</h2>  LEGACY JSX COMMENT]
         *             <h2>Related Insights</h2>
         *             [LEGACY JSX COMMENT  LEGACY: explanatory Related Insights intro retained for rollback.  LEGACY JSX COMMENT]
         *             [LEGACY JSX COMMENT  <p className="service-section-intro">
         *               Selected topics relating to Securities & Financial Assets_LOWER.
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

        <RelatedServiceInsights serviceSlug="securities-financial-assets" />

        <section className="service-cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>To discuss a requirement involving a business, security, intangible asset, or complex instrument, contact us.</p>
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

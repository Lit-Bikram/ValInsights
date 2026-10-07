import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RelatedServiceInsights from "../../components/insights/RelatedServiceInsights";

const scopeItems = [
  { number: "01", title: "Shareholder & Minority-Interest Disputes", text: "Shareholder and minority-interest disputes." },
  { number: "02", title: "Partnership & Joint-Venture Disputes", text: "Partnership and joint-venture disputes." },
  { number: "03", title: "Commercial & Contractual Disputes", text: "Commercial and contractual disputes." },
  { number: "04", title: "M&A & Transaction-Related Claims", text: "M&A and transaction-related claims." },
  { number: "05", title: "Business Interruption & Loss of Profit", text: "Business interruption and loss-of-profit matters." },
  { number: "06", title: "Damages & Economic-Loss Assessments", text: "Damages and economic-loss assessments." },
  { number: "07", title: "Valuation-Date Disputes", text: "Valuation-date disputes." },
  { number: "08", title: "Matrimonial & Ownership Disputes", text: "Matrimonial and ownership disputes." },
  { number: "09", title: "Arbitration, Mediation & Litigation", text: "Arbitration, mediation, and litigation." }
];
const methodItems = [
  { number: "01", title: "Independent Valuation Analysis", text: "Independent valuation analysis across businesses, securities, intangible assets, real estate, tangible assets, and complex instruments." },
  { number: "02", title: "Damages Quantification", text: "Damages quantification and analysis of claimed economic loss." },
  { number: "03", title: "Financial Modelling", text: "Financial modelling to assess scenarios, counterfactuals, and the financial impact in issue." },
  { number: "04", title: "Scenario Analysis", text: "Scenario analysis and review of relevant assumptions and evidence in the contested matter." }
];
/*
 * LEGACY RELATED INSIGHTS — kept intact for easy rollback.
 * The page now loads the latest 3 published insights from the database
 * using the core-service relationship.
 *
 const relatedInsights = [
 *   { type: "Valuation Perspectives", title: "Valuation in disputes" },
 *   { type: "Valuation Perspectives", title: "Damages quantification" },
 *   { type: "Current Observations", title: "Expert evidence in Indian arbitration and litigation" },
 *   { type: "Current Observations", title: "Cross-border disputes involving India and the Gulf" }
 * ];
 */

export default function DisputesLitigationSupportPage() {
  return (
    <>
      <Header />

      <main className="service-page" data-service-page="disputes-litigation-support">
        <section className="service-hero service-hero--inner">
          <Image
            src="/images/solutions/litigation-support.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" />

          <div className="service-shell service-hero__content">
            <p className="service-breadcrumb">
              Our Solution / Disputes & Litigation Support
            </p>

            <h1>Disputes & Litigation Support</h1>

            <p className="service-hero__intro">We provide valuation and financial analysis for contested matters where value, damages, ownership, or financial loss is in issue. Our work covers businesses, securities, intangible assets, real estate, tangible assets, and complex instruments, and is presented for use by counsel, tribunals, courts, arbitrators, and mediators.</p>
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
                       <p>We provide valuation and financial analysis for contested matters where value, damages, ownership, or financial loss is in issue. Our work covers businesses, securities, intangible assets, real estate, tangible assets, and complex instruments, and is presented for use by counsel, tribunals, courts, arbitrators, and mediators.</p>
                       <p>Our work considers the economic substance of the subject being valued, its contractual and ownership features, the available evidence, and the requirements of the assignment.</p>
                     </div>
                   </div>
                 </section>
         */}

        <section className="service-scope">
          <div className="service-shell">
            <p className="service-label">Scope of Work</p>
            <h2>What We Value</h2>
            <p className="service-section-intro">We provide valuation and financial analysis for contested matters where value, damages, ownership, or financial loss is in issue. Our work covers businesses, securities, intangible assets, real estate, tangible assets, and complex instruments, and is presented for use by counsel, tribunals, courts, arbitrators, and mediators.</p>

            <div className="service-scope__grid">
              {scopeItems.map((item) => (
                <article key={item.title} className="service-scope-card">
                  <span aria-hidden="true">{item.number}</span>
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
         
                     <p className="service-approach__tail">We focus on the applicable valuation framework, relevant date, available evidence, causation, counterfactual assumptions, and the connection between the alleged event and the claimed financial impact.</p>
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
         *             [LEGACY JSX COMMENT  <h2>Disputes & Litigation Support</h2>  LEGACY JSX COMMENT]
         *             <h2>Related Insights</h2>
         *             [LEGACY JSX COMMENT  LEGACY: explanatory Related Insights intro retained for rollback.  LEGACY JSX COMMENT]
         *             [LEGACY JSX COMMENT  <p className="service-section-intro">
         *               Selected topics relating to Disputes & Litigation Support_LOWER.
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

        <RelatedServiceInsights serviceSlug="disputes-litigation-support" />
        <section className="service-cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>To discuss a contested matter involving valuation, damages, ownership, or financial loss, contact us.</p>
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

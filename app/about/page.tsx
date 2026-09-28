import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="about-page">
        {/* Hero */}
        <section className="about-hero">
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="about-hero__image"
          />

          <div className="about-hero__overlay" />

          <div className="about-shell about-hero__content">
            <p className="about-breadcrumb">Home / About Us</p>

            <h1>About Valuation Insights</h1>

            <p className="about-hero__description">
              Building trust through disciplined financial analysis and deep
              commercial context across India, the UAE, and the wider Gulf
              region.
            </p>
          </div>
        </section>

        {/* The Firm */}
        <section className="about-firm">
          <div className="about-shell about-firm__grid">
            <div className="about-firm__copy">
              <h2>The Firm</h2>

              <p>
                Valuation Insights is a partner-led valuation firm serving
                institutional and sophisticated private clients. We combine
                specialist technical knowledge with a commercial understanding
                of the businesses, assets, and markets under review.
                <br />
                Our work is designed for situations where valuation affects
                reporting, investment, ownership, transaction structure, or the
                resolution of a contested matter.
              </p>

              <p>
                To deliver valuation work characterised by methodological
                clarity, sound evidence, and careful professional judgement. We
                aim to provide conclusions that are transparent, defensible,
                and appropriate for the stakeholders who rely on them.
              </p>

              <p>
                To be recognised across India and the Gulf as a trusted
                specialist valuation firm, distinguished by the quality of its
                judgement, the depth of its expertise, and the clarity of its
                conclusions.
              </p>
            </div>

            <article className="about-profile-card">
              <div className="about-profile-card__top">
                <div>
                  <h3>Amit Sultania</h3>

                  <p className="about-profile-card__credentials">
                    CA, MBA - London Business School,
                    <br />
                    Registered Valuer
                    <br />
                    Securities or Financial Assets, IBBI.
                  </p>
                </div>

                <div className="about-profile-card__portrait">
                  <Image
                    src="/images/about/amit-sultania.jpg"
                    alt="Amit Sultania"
                    fill
                    sizes="120px"
                    className="about-profile-card__image"
                  />
                </div>
              </div>

              <p>
                Amit Sultania is a Chartered Accountant, holds an MBA from
                London Business School, and is a Registered Valuer with IBBI in
                the Securities or Financial Assets asset class. He brings more
                than 23 years of professional experience, including over a
                decade focused on valuation. Before founding Valuation Insights
                in 2016, Amit held senior roles at leading advisory firms,
                developing experience in valuation methodology, financial
                modelling, transaction advisory, and cross-border assignments.
              </p>
            </article>
          </div>
        </section>

        {/* Our Approach */}
        <section className="about-approach">
          <div className="about-shell">
            <h2>Our Approach</h2>

            <p className="about-approach__intro">
              We approach every engagement with a commitment to analytical
              depth and transparency:
            </p>

            <div className="about-approach__grid">
              <article className="about-approach-card">
                <h3>Sector Context</h3>
                <p>
                  We integrate commercial conditions, operating performance,
                  and market dynamics that have a direct bearing on value and
                  long-term business prospects.
                </p>
              </article>

              <article className="about-approach-card">
                <h3>Disciplined Analysis</h3>
                <p>
                  We connect relevant commercial facts, financial evidence, and
                  appropriate valuation methodology to produce conclusions that
                  withstand professional scrutiny.
                </p>
              </article>

              <article className="about-approach-card">
                <h3>Transparent Reasoning</h3>
                <p>
                  Assumptions, evidence, sensitivities, and limitations are
                  explained clearly so that conclusions can be effectively
                  assessed by relevant stakeholders.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-discuss">
          <div className="about-shell about-discuss__inner">
            <h2>Discuss a Requirement</h2>

            <p>
              If you are considering a valuation assignment, transaction,
              reporting matter, or dispute, we would be pleased to understand
              the requirement.
            </p>

            <Link href="/contact" className="about-discuss__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

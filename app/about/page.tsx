import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const stakeholderGroups = [
  {
    title: "Listed & Privately Held Businesses",
    description:
      "Transaction, reporting, restructuring, ownership matters, and strategic analysis.",
  },
  {
    title: "Family Offices",
    description:
      "Portfolio valuation, investment analysis, ownership matters, and succession planning.",
  },
  {
    title: "Private Equity & Venture Capital Funds",
    description:
      "Deal analysis, portfolio monitoring, fair value reporting, and review of investment terms.",
  },
  {
    title: "Start-Ups & Growth Companies",
    description:
      "Fundraising, employee options, cap tables, and corporate development.",
  },
  {
    title: "Founders & Promoters",
    description:
      "Ownership, succession, liquidity, and strategic transactions.",
  },
  {
    title: "Boards & Audit Committees",
    description:
      "Financial reporting, impairment, fair value, and oversight matters.",
  },
  {
    title: "Legal Teams & Dispute Stakeholders",
    description:
      "Valuation, damages, financial modelling, and contested matters.",
  },
  {
    title: "Cross-Border Transaction Parties",
    description:
      "Valuation and related analysis for transactions involving India, the UAE, and the wider Gulf region.",
  },
];

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
              A partner-led valuation firm combining specialist technical
              knowledge with a commercial
              <br />
              understanding of the businesses, assets, and markets under review.
            </p>
          </div>
        </section>

        {/* About the Firm */}
        <section className="about-firm">
          <div className="about-shell about-firm__grid">
            <div className="about-firm__copy">
              {/* <p className="about-section-kicker">01 / About the Firm</p> */}

              <h2>
                A Specialist Valuation Practice
                <br />
                Built Around Judgement
              </h2>

              <p>
                Valuation Insights is a partner-led valuation firm serving
                institutional and
                <br />
                sophisticated private clients. We combine specialist technical
                knowledge with a<br />
                commercial understanding of the businesses, assets, and markets
                under review.
              </p>

              <p>
                Our work is designed for situations where valuation affects
                reporting, investment,
                <br />
                ownership, transaction structure, or the resolution of a
                contested matter.
              </p>
            </div>

            <div className="about-firm__principles">
              <article className="about-principle">
                <p className="about-section-kicker">Mission</p>
                <h3>Clarity, Evidence and Professional Judgement</h3>
                <p>
                  To deliver valuation work characterised by methodological
                  clarity, sound evidence, and careful professional judgement.
                  We aim to provide conclusions that are transparent,
                  defensible, and appropriate for the stakeholders who rely on
                  them.
                </p>
              </article>

              <article className="about-principle">
                <p className="about-section-kicker">Vision</p>
                <h3>A Trusted Specialist Across India and the Gulf</h3>
                <p>
                  To be recognised across India and the Gulf as a trusted
                  specialist valuation firm, distinguished by the quality of its
                  judgement, the depth of its expertise, and the clarity of its
                  conclusions.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="about-founder">
          <div className="about-shell about-founder__inner">
            {/* <p className="about-section-kicker">02 / Founder</p> */}

            <div className="about-founder__grid">
              <div className="about-founder__identity">
                <div className="about-founder__portrait-card">
                  <div className="about-founder__portrait">
                    <Image
                      src="/images/about/amit-sultania.jpg"
                      alt="Amit Sultania"
                      fill
                      sizes="180px"
                      className="about-founder__image"
                    />
                  </div>

                  <div className="about-founder__qualifications">
                    <br />
                    <p>A Chartered Accountant</p>
                    <p>An MBA from London Business School</p>
                    <p>
                      A Registered Valuer with IBBI in Securities or Financial
                      Assets
                    </p>
                  </div>
                </div>

                <div className="about-founder__identity-text">
                  <p className="about-founder__role">
                    Founder &amp; Managing Director
                  </p>
                  <h3>Amit Sultania</h3>
                  <p>Valuation Insights</p>
                </div>
              </div>

              <div className="about-founder__content">
                <h2>Amit Sultania</h2>
                <p className="about-founder__title">
                  Founder and Managing Director, Valuation Insights
                </p>

                <p>
                  Amit Sultania is a Chartered Accountant, holds an MBA from
                  London Business School, and is a Registered Valuer with IBBI
                  in the Securities or Financial Assets asset class. He brings
                  more than 23 years of professional experience, including over
                  a decade focused on valuation.
                </p>

                <p>
                  Before founding Valuation Insights in 2016, Amit held senior
                  roles at leading advisory firms, developing experience in
                  valuation methodology, financial modelling, transaction
                  advisory, and cross-border assignments.
                </p>

                <p>
                  His work has covered businesses, securities, tangible assets,
                  financial reporting valuations, fairness and solvency
                  opinions, transactions, and disputes. He has worked with
                  corporate, private equity, family-office, board, and legal
                  stakeholders on matters where assumptions, evidence, and
                  professional judgement must withstand detailed review.
                </p>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="about-founder__linkedin"
                >
                  <span aria-hidden="true">in</span>
                  View LinkedIn Profile
                </a>

                <div className="about-founder__details">
                  <div className="about-founder__education">
                    <h4>Education &amp; Credentials</h4>
                    <p>Chartered Accountant</p>
                    <p>MBA, London Business School</p>
                    <p>
                      Registered Valuer, Securities or Financial Assets, IBBI
                    </p>
                  </div>

                  <div className="about-founder__experience">
                    <h4>Experience</h4>
                    <p>
                      More than 23 years in professional services and advisory
                    </p>
                    <p>More than 10 years focused on valuation</p>
                    <p>
                      Transaction advisory, reporting, ownership matters and
                      disputes
                    </p>
                    <p>
                      Cross-border work involving India, the UAE and the wider
                      Gulf region
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients We Serve */}
        <section className="about-clients">
          <div className="about-shell">
            {/* <p className="about-section-kicker">03 / Clients We Serve</p> */}

            <h2>Specialist Analysis for Different Stakeholders</h2>

            <p className="about-clients__intro">
              We work with parties who require specialist valuation analysis in
              situations involving capital, ownership, reporting, transactions,
              or disputes.
            </p>
            <br />
            
            <div className="about-clients__grid">
              {stakeholderGroups.map((group) => (
                <article className="about-client-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </article>
              ))}
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

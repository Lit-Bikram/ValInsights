import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const stakeholderGroups = [
  {
    number: "01",
    title: "Listed & Privately Held Businesses",
    description:
      "Transactions, reporting, restructuring, ownership matters, and strategic analysis.",
  },
  {
    number: "02",
    title: "Family Offices",
    description:
      "Portfolio valuation, investment analysis, ownership matters, and succession planning.",
  },
  {
    number: "03",
    title: "Private Equity & Venture Capital Funds",
    description:
      "Deal analysis, portfolio monitoring, fair value reporting, and review of investment terms.",
  },
  {
    number: "04",
    title: "Start-Ups & Growth Companies",
    description:
      "Fundraising, employee options, cap tables, and corporate development.",
  },
  {
    number: "05",
    title: "Founders & Promoters",
    description:
      "Ownership, succession, liquidity, and strategic transactions.",
  },
  {
    number: "06",
    title: "Boards & Audit Committees",
    description:
      "Financial reporting, impairment, fair value, and oversight matters.",
  },
  {
    number: "07",
    title: "Legal Teams & Dispute Stakeholders",
    description:
      "Valuation, damages, financial modelling, and contested matters.",
  },
  {
    number: "08",
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
        <section className="about-hero">
          <Image
            src="/images/about/about-us.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="about-hero__image"
          />
          <div className="about-hero__overlay" />
          <div className="about-shell about-hero__content">
            <p className="about-breadcrumb">Home / About Us</p>
            <h1>Trusted Advisory Partner</h1>
            <p className="about-hero__description">
              Independent advice across valuation, disputes and investment.
            </p>
          </div>
        </section>

        <section className="about-institutional">
          <div className="about-shell">
            <p className="about-section-kicker">About Us</p>

            <h2>Experience Across Markets and Mandates</h2>

            <p className="about-institutional__intro">
              Valuation Insights advises institutional investors, corporates,
              and sophisticated private clients on complex valuation,
              investment, and dispute-related matters. Drawing on more than 100
              years of combined professional experience, the firm brings
              specialist expertise, commercial perspective, and disciplined
              analysis to each mandate. Across markets and mandates, we focus on
              the commercial, financial, and market considerations that shape
              value, risk, and decision-making.
            </p>

            <div className="about-institutional__grid about-institutional__grid--contribution-style">
              <article>
                <h3>Global Portfolio Valuations</h3>
                <p>
                  Fair value assessment of client`s international
                  investment portfolios, maintaining rigorous compliance and
                  reporting standards.
                </p>
              </article>

              <article>
                <h3>Framework Development</h3>
                <p>
                  Developed valuation and reporting frameworks for complex
                  investment structures and joint ventures across multiple
                  geographies.
                </p>
              </article>

              <article>
                <h3>Investment Committee Support</h3>
                <p>
                  Advised investment committees on strategic investment and exit
                  decisions, translating valuation insight into actionable
                  recommendations.
                </p>
              </article>
            </div>
          </div>
        </section>
        <br />
        <br />
        {/* <section className="about-firm">
          <div className="about-shell about-firm__grid">
            <div className="about-firm__heading">
              <p className="about-section-kicker">About the Firm</p>
              <h2>
                A Specialist
                <br />
                Valuation Practice
              </h2>
            </div>
            <div className="about-firm__copy">
              <p>
                Valuation Insights is a partner-led valuation firm serving
                institutional and sophisticated private clients. We combine
                specialist technical knowledge with a commercial understanding
                of the businesses, assets, and markets under review.
              </p>
              <p>
                Our work is designed for situations where valuation affects
                reporting, investment, ownership, transaction structure, or the
                resolution of a contested matter.
              </p>
            </div>
          </div>
        </section> */}

        <section className="about-founder">
          <div className="about-shell about-founder__inner">
            <div className="about-founder__grid">
              <aside className="about-founder__identity">
                <div className="about-founder__portrait-card">
                  <div className="about-founder__portrait">
                    <Image
                      src="/images/about/amit-sultania.jpeg"
                      alt="Amit Sultania"
                      fill
                      sizes="180px"
                      className="about-founder__image"
                    />
                  </div>
                  <div className="about-founder__qualifications">
                    <p>Chartered Accountant</p>
                    <p>MBA from London Business School</p>
                    <p>
                      Registered Valuer-Securities &amp;
                      Financial Assets
                      <br/>
                      <b>IBBI/RV/06/2023/15215</b>
                      
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
              </aside>
              <div className="about-founder__content">
                <p className="about-section-kicker">Founder</p>
                <h2>Amit Sultania</h2>
                {/* <p className="about-founder__title">
                  Founder and Managing Director, Valuation Insights
                </p> */}
                <p>
                  Amit Sultania is a Chartered Accountant, holds an MBA from
                  London Business School, and is a Registered Valuer with IBBI
                  in the Securities or Financial Assets asset class. He brings
                  more than 23 years of professional experience, including over
                  a decade focused on valuation.
                </p>
                <p>
                  Before founding Valuation Insights, Amit held senior
                  roles at leading advisory firms, developing experience in
                  valuation methodology, financial modelling, transaction
                  advisory, and cross-border assignments.
                </p>
                <p>
                  His work has covered businesses, securities, intangible
                  assets, financial reporting valuations, fairness and solvency
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
                  <span aria-hidden="true">in</span> View LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="about-contributions">
          <div className="about-shell">
            <p className="about-section-kicker">Professional Contributions</p>
            <h2>Contributing to Valuation Standards</h2>
            <div className="about-contributions__grid">
              <article className="about-contribution-card">
                <h3>IPEV Guidelines</h3>
                <p>
                  Contributed to the{" "}
                  <strong>
                    International Private Equity and Venture Capital Valuation
                    Guidelines
                  </strong>{" "}
                  — the global standard for fair value measurement in private
                  markets — offering practitioner insight to strengthen
                  methodological rigour and consistency.
                </p>
              </article>
              <article className="about-contribution-card">
                <h3>AICPA Fair Value Guidelines</h3>
                <p>
                  Provided contributions to the AICPA Fair Value Guidelines,
                  helping to enhance best practice in financial reporting and
                  valuation compliance for alternative asset managers and
                  institutional investors.
                </p>
              </article>
            </div>
          </div>
        </section> */}

        <section className="about-clients">
          <div className="about-shell">
            <div className="about-clients__heading">
              <div>
                <p className="about-section-kicker">Clients We Serve</p>
                <h2>
                  Niche Advisory for Different Stakeholders
                </h2>
              </div>
              {/* <p className="about-clients__intro about-clients__intro--justified">
                We work with parties who require specialist valuation analysis
                in situations involving capital, ownership, reporting,
                transactions, or disputes.
              </p> */}
            </div>
            <div className="about-clients__grid">
              {stakeholderGroups.map((group) => (
                <article className="about-client-card" key={group.number}>
                  <span className="about-client-card__number">
                    {group.number}
                  </span>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-discuss">
          <div className="about-shell about-discuss__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              If you are considering a valuation assignment, transaction, reporting matter, or dispute, we would be pleased to understand the requirement.
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

import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../lib/supabase/client";

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
};

type Service = {
  id: string;
  name: string;
  slug: string;
};

const expertiseAreas = [
  {
    title: "Transaction Evaluation & Pricing",
    description:
      "Assess transaction economics, valuation assumptions, and proposed consideration to inform investment decisions, evaluate pricing alternatives, and support negotiations.",
    image: "/images/solutions/NYSE.jpeg",
    imageAlt: "Financial market information used in transaction evaluation",
  },
  {
    title: "Transaction Structuring & Financial Analysis",
    description:
      "Evaluate the financial implications of ownership arrangements, consideration structures, deferred payments, and contingent terms across alternative transaction scenarios.",
    image: "/images/solutions/transaction-home.jpeg",
    imageAlt: "Commercial buildings representing corporate transactions",
  },
  {
    title: "Investment Returns & Scenario Analysis",
    description:
      "Assess projected returns, cash flow distributions, funding requirements, and exit assumptions, with sensitivity analysis to examine downside exposure and investment outcomes.",
    image: "/images/solutions/real-estate.jpg",
    imageAlt: "Commercial property considered in investment return analysis",
  },
];

const transactionContexts = [
  {
    number: "01",
    title: "Corporate Acquisitions & Strategic Investments",
    description:
      "Assess transaction pricing, consideration structures, and financial outcomes against strategic priorities, capital allocation objectives, and investment criteria.",
  },
  {
    number: "02",
    title: "Private Equity & Growth Capital Investments",
    description:
      "Evaluate entry valuations, capital structures, and projected returns, testing investment assumptions across operating scenarios, holding periods, and exit alternatives.",
  },
  {
    number: "03",
    title: "Divestments & Business Disposals",
    description:
      "Assess proposed consideration, payment mechanics, and retained financial exposures to compare offers and inform exit negotiations.",
  },
  {
    number: "04",
    title: "Mergers & Business Combinations",
    description:
      "Analyse relative valuations, exchange ratios, and ownership allocation to assess the financial implications of alternative combination structures.",
  },
  {
    number: "05",
    title: "Shareholder Transactions & Ownership Transitions",
    description:
      "Evaluate pricing, funding arrangements, and consideration terms for shareholder buyouts, ownership transfers, management acquisitions, and succession-related transactions.",
  },
  {
    number: "06",
    title: "Joint Ventures & Strategic Partnerships",
    description:
      "Assess capital contributions, economic interests, distribution rights, and exit provisions to evaluate returns and financial alignment between participating parties.",
  },
];

const workSteps = [
  {
    title: "Frame the Transaction",
    description:
      "Establish the client’s objectives, proposed terms, decision criteria, and financial questions requiring analysis.",
  },
  {
    title: "Model the Alternatives",
    description:
      "Evaluate transaction structures, forecasts, funding assumptions, and potential outcomes under relevant scenarios.",
  },
  {
    title: "Assess the Implications",
    description:
      "Examine how pricing, payment terms, ownership arrangements, and exit assumptions affect returns, risk, and financial flexibility.",
  },
  {
    title: "Support the Decision",
    description:
      "Present the findings, trade-offs, and limitations clearly to inform investment evaluation, internal approvals, and negotiations.",
  },
];

async function getTransactionInsights(): Promise<Insight[]> {
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id,name,slug")
    .eq("slug", "transaction-advisory")
    .maybeSingle();

  if (serviceError) {
    console.error("Error loading Transaction Advisory service:", serviceError);
    return [];
  }

  const selectedService = service as Service | null;
  if (!selectedService) return [];

  const { data: relationships, error: relationshipError } = await supabase
    .from("insight_services")
    .select("insight_id")
    .eq("service_id", selectedService.id);

  if (relationshipError) {
    console.error(
      "Error loading Transaction Advisory insight relationships:",
      relationshipError,
    );
    return [];
  }

  const insightIds = (relationships ?? []).map((row) => row.insight_id);
  if (insightIds.length === 0) return [];

  const { data, error } = await supabase
    .from("insights")
    .select("id,title,slug,excerpt,cover_image_url,author,published_at")
    .eq("status", "published")
    .in("id", insightIds)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error loading Transaction Advisory perspectives:", error);
    return [];
  }

  return (data ?? []) as Insight[];
}

function insightDate(value: string | null) {
  if (!value) return "Valuation Insights";

  return new Date(value).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function insightMeta(item: Insight) {
  return item.author
    ? `${item.author} • ${insightDate(item.published_at)}`
    : `Valuation Insights • ${insightDate(item.published_at)}`;
}

const fallbackInsightImages = [
  "/images/insights/bridge-to-close.jpg",
  "/images/insights/financial-district.jpg",
  "/images/insights/cost-of-capital.jpg",
];

export default async function TransactionAdvisoryPage() {
  const insights = await getTransactionInsights();

  return (
    <>
      <Header />

      <main
        className="service-page transaction-advisory-page"
        data-service-page="transaction-advisory"
      >
        {/* BANNER */}
        <section
          className="service-hero service-hero--inner transaction-advisory-hero"
          aria-labelledby="transaction-advisory-hero-title"
        >
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" aria-hidden="true" />

          <div className="service-shell service-hero__content transaction-advisory-hero-content">
            <p className="service-breadcrumb">
              Home / Solutions / Transaction Advisory
            </p>
            <h1 id="transaction-advisory-hero-title">
              Financial perspective. Transaction clarity.
            </h1>
            <p className="service-hero__intro">
              Transaction analysis, financial modelling, and commercial
              assessment to inform investment decisions, evaluate deal
              structures, and support negotiations.
            </p>
            {/* <Link href="/contact" className="home-button">
              Discuss a Transaction Requirement
            </Link> */}
          </div>
        </section>

        {/* AREAS OF EXPERTISE */}
        <section
          className="transaction-advisory-expertise"
          aria-labelledby="transaction-advisory-expertise-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading">
              <p className="transaction-advisory-kicker">Transaction Advisory</p>
              <h2 id="transaction-advisory-expertise-title">
                Areas of Expertise
              </h2>
            </div>

            <div className="transaction-advisory-expertise-grid">
              {expertiseAreas.map((area) => (
                <article
                  className="transaction-advisory-expertise-card"
                  key={area.title}
                >
                  <div className="transaction-advisory-expertise-card__image">
                    <Image
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </div>
                  <div className="transaction-advisory-expertise-card__content">
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSACTION CONTEXTS */}
        <section
          className="transaction-advisory-contexts"
          aria-labelledby="transaction-advisory-contexts-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading">
              <p className="transaction-advisory-kicker">Engagement Contexts</p>
              <h2 id="transaction-advisory-contexts-title">
                Transaction Contexts
              </h2>
            </div>

            <div className="transaction-advisory-contexts-grid">
              {transactionContexts.map((context) => (
                <article
                  className="transaction-advisory-context-card"
                  key={context.number}
                >
                  <span className="transaction-advisory-context-card__number">
                    {context.number}
                  </span>
                  <h3>{context.title}</h3>
                  <p>{context.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section
          className="transaction-advisory-approach"
          aria-labelledby="transaction-advisory-approach-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading transaction-advisory-section-heading--approach">
              <p className="transaction-advisory-kicker">Our Approach</p>
              <h2 id="transaction-advisory-approach-title">How We Work</h2>
              <p className="transaction-advisory-approach__intro">
                Defined objectives. Tested assumptions. Informed decisions.
              </p>
            </div>

            <div className="transaction-advisory-approach-grid">
              {workSteps.map((step) => (
                <article
                  className="transaction-advisory-approach-card"
                  key={step.title}
                >
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSACTION PERSPECTIVES */}
        <section
          className="transaction-advisory-perspectives"
          aria-labelledby="transaction-advisory-perspectives-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading">
              <p className="transaction-advisory-kicker">Insights &amp; Research</p>
              <h2 id="transaction-advisory-perspectives-title">
                Transaction Perspectives
              </h2>
            </div>

            {insights.length > 0 ? (
              <div className="insights-publication-grid">
                {insights.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/insights/${item.slug}`}
                    className="publication-card"
                  >
                    <div className="publication-card__image">
                      {item.cover_image_url ? (
                        <img src={item.cover_image_url} alt={item.title} />
                      ) : (
                        <Image
                          src={fallbackInsightImages[index % fallbackInsightImages.length]}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                      )}
                    </div>

                    <div className="publication-card__body">
                      <p className="publication-card__meta">
                        {insightMeta(item)}
                      </p>
                      <h2>{item.title}</h2>
                      {item.excerpt && (
                        <p className="publication-card__excerpt">
                          {item.excerpt}
                        </p>
                      )}
                      <span className="publication-card__link">
                        Read Full Article →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="transaction-advisory-perspectives__empty">
                Transaction Advisory perspectives will be published here.
              </p>
            )}

            <div className="transaction-advisory-perspectives__all">
              <Link href="/insights?service=transaction-advisory">
                View All Insights →
              </Link>
            </div>
          </div>
        </section>

        {/* DISCUSS A REQUIREMENT */}
        <section className="service-cta transaction-advisory-cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Transaction Requirement</h2>
            <p>
              Discuss your proposed transaction, investment objectives, and
              financial considerations to establish the appropriate scope of
              support.
            </p>
            <Link href="/contact" className="service-cta__button">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

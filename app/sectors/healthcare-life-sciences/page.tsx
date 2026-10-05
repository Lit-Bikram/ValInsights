import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../lib/supabase/client";

const typicalAssignments = [
  {
    number: "01",
    title: "Healthcare Businesses & Provider Platforms",
    text: "Valuation of healthcare providers, clinics, hospitals, and healthcare service platforms.",
  },
  {
    number: "02",
    title: "Life Sciences & Medical Technology",
    text: "Valuation of life sciences businesses, medical technologies, devices, and related commercial interests.",
  },
  {
    number: "03",
    title: "Fair Value & Impairment",
    text: "Fair value and impairment analysis for healthcare businesses, investments, and operating assets.",
  },
  {
    number: "04",
    title: "Transactions, Reporting & Disputes",
    text: "Valuation for transactions, financial reporting, restructuring, shareholder matters, and disputes.",
  },
];

const valuationConsiderations = [
  {
    number: "01",
    title: "Regulation, Reimbursement & Policy",
    text: "Regulatory requirements, reimbursement structures, licensing, and policy conditions can materially affect operating assumptions.",
  },
  {
    number: "02",
    title: "Clinical, Commercial & Product Risk",
    text: "Clinical development, product adoption, customer demand, approvals, and commercial execution can influence future cash flows.",
  },
  {
    number: "03",
    title: "Intellectual Property & Technology",
    text: "Patents, proprietary technology, data, know-how, and product pipelines can be important components of enterprise value.",
  },
  {
    number: "04",
    title: "Margins, Scale & Operating Model",
    text: "Utilisation, payer and customer mix, pricing, cost structure, scale, and capital requirements can shape sustainable earnings.",
  },
];

const subsectors = [
  {
    number: "01",
    title: "Healthcare Providers",
    text: "Hospitals, clinics, diagnostic businesses, and other providers where utilisation, payer mix, quality, and capacity affect value.",
  },
  {
    number: "02",
    title: "Pharmaceuticals & Life Sciences",
    text: "Pharmaceutical, biotechnology, research, and life sciences businesses shaped by products, pipelines, approvals, and intellectual property.",
  },
  {
    number: "03",
    title: "Medical Devices & Technology",
    text: "Medical devices, equipment, digital health, and technology-enabled businesses where innovation and adoption influence commercial prospects.",
  },
  {
    number: "04",
    title: "Healthcare Services & Platforms",
    text: "Specialist services and healthcare platforms where recurring demand, network effects, operating scale, and customer relationships matter.",
  },
];

type RelatedInsight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

function formatInsightDate(value: string | null) {
  if (!value) return "Publication";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function HealthcareLifeSciencesPage() {
  let relatedInsights: RelatedInsight[] = [];

  const { data: sector } = await supabase
    .from("sectors")
    .select("id")
    .eq("slug", "healthcare-life-sciences")
    .single();

  if (sector?.id) {
    const { data: insightRelations } = await supabase
      .from("insight_sectors")
      .select("insight_id")
      .eq("sector_id", sector.id);

    const insightIds = (insightRelations ?? []).map(
      (relation) => relation.insight_id,
    );

    if (insightIds.length > 0) {
      const { data: latestInsights } = await supabase
        .from("insights")
        .select(
          "id, title, slug, excerpt, cover_image_url, published_at",
        )
        .in("id", insightIds)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);

      relatedInsights = (latestInsights ?? []) as RelatedInsight[];
    }
  }

  return (
    <>
      <Header />

      <main className="sector-page">
        <section className="sector-hero">
          <Image
            src="/images/sectors/healthcare-life-sciences.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sector-hero__image"
          />
          <div className="sector-hero__overlay" />
          <div className="sector-shell sector-hero__content">
            <p className="sector-breadcrumb">
              Sectors / Healthcare &amp; Life Sciences
            </p>
            <h1>Healthcare &amp; Life Sciences</h1>
            <p>
              We work with healthcare providers, life sciences businesses,
              medical technologies, and healthcare-related assets where
              clinical, regulatory, commercial, and operating factors influence
              value. Our analysis connects sector economics with the financial
              assumptions relevant to each assignment.
            </p>
          </div>
        </section>

        <section className="sector-overview">
          <div className="sector-shell sector-overview__grid">
            <div>
            <h2>Understanding Value in Healthcare &amp; Life Sciences</h2>
              <p>
                Healthcare and life sciences businesses operate within complex
                regulatory, clinical, commercial, and funding environments.
                Value can depend on the interaction between demand, operating
                performance, intellectual property, reimbursement, regulation,
                and investment requirements.
              </p>
              <p>
                We consider healthcare providers, life sciences businesses,
                medical technology companies, healthcare platforms, operating
                assets, and related interests across transactions, reporting,
                restructuring, and disputes.
              </p>
              <p>
                Our analysis considers commercial performance alongside
                utilisation, payer and customer mix, product and pipeline risk,
                regulatory requirements, technology, intellectual property,
                margins, and capital needs.
              </p>
            </div>

            <aside className="sector-value-box">
              <p>Value Driver</p>
              <h3>Regulation and commercial execution can shape value.</h3>
              <span>
                Reimbursement, licensing, approvals, customer demand, product
                adoption, intellectual property, utilisation, pricing, margins,
                and capital requirements can all influence expectations of
                future cash flows.
              </span>
            </aside>
          </div>
        </section>

        {/* <section className="sector-applied">
          <div className="sector-shell">
            <h2>Where Our Work Is Applied</h2>
            <p className="sector-section-intro">
              Healthcare and life sciences valuation assignments arise across
              operating businesses, platforms, products, technologies, and
              investments, with the purpose of the assignment determining the
              relevant analysis.
            </p>

            <div className="sector-applied__grid">
              {typicalAssignments.map((item) => (
                <article key={item.number} className="sector-applied-card">
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section> */}

        <section className="sector-considerations">
          <div className="sector-shell">
            <h2>What Can Influence Value?</h2>
            <p className="sector-section-intro">
              Healthcare and life sciences value is influenced by regulation,
              reimbursement, product and clinical risk, intellectual property,
              technology, commercial demand, and the operating model.
            </p>

            <div className="sector-considerations__grid">
              {valuationConsiderations.map((item) => (
                <article key={item.number} className="sector-consideration sector-card-motion">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sector-subsectors">
          <div className="sector-shell">
            <h2>Healthcare Businesses Across Different Models</h2>
            <p className="sector-subsectors__intro">
              Different healthcare and life sciences models generate value
              through different combinations of demand, regulation, products,
              intellectual property, technology, capacity, and operating scale.
            </p>

            <div className="sector-subsectors__grid">
              {subsectors.map((item) => (
                <article key={item.number} className="sector-subsector sector-card-motion">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sector-insights">
          <div className="sector-shell">
            <p className="sector-label">05 / Related Insights</p>
            <h2>Healthcare &amp; Life Sciences</h2>
            <p className="sector-insights__intro">
              Selected observations examining valuation issues affecting
              healthcare and life sciences businesses.
            </p>

            <div className="insights-publication-grid">
              {relatedInsights.length ? (
                relatedInsights.map((item, index) => (
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
                          src="/images/insights/page-header-banner.jpg"
                          alt=""
                          fill
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                      )}
                    </div>

                    <div className="publication-card__body">
                      <p className="publication-card__meta">
                        {formatInsightDate(item.published_at)}
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
                ))
              ) : (
                <p className="sector-insights__empty">
                  No published healthcare and life sciences insights are available yet.
                </p>
              )}
            </div>

            <Link href="/sectors" className="sector-return">
              ← Return to Sector Dashboard
            </Link>
          </div>
        </section>

        <section className="sector-cta">
          <div className="sector-shell sector-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              If you are considering a valuation assignment involving a
              healthcare business, life sciences company, medical technology,
              healthcare platform, or related interest, we would be pleased to
              understand the requirement.
            </p>
            <Link href="/contact" className="sector-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

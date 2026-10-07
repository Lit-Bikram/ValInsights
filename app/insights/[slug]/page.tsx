import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../lib/supabase/client";
import InsightContent from "../../components/insights/InsightContent";

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: any;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
};

interface InsightArticlePageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(value: string | null) {
  if (!value) return "Publication";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function estimateReadingTime(content: any) {
  const text = JSON.stringify(content ?? "")
    .replace(/\\u[0-9a-fA-F]{4}/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, " ");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return Math.max(3, Math.ceil(words / 180));
}

export default async function InsightArticlePage({
  params,
}: InsightArticlePageProps) {
  const { slug } = await params;

  const { data: insight, error } = await supabase
    .from("insights")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, author, published_at"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !insight) {
    notFound();
  }

  const article = insight as Insight;
  const readingTime = estimateReadingTime(article.content);

  return (
    <>
      <Header />

      <main className="insight-article-page">
        <div className="insight-article-shell">
<div className="insight-article-layout">
            <aside className="insight-article-meta">
              <div className="insight-meta-block">
                <span>Research Publication</span>
                <strong>Valuation Insights</strong>
              </div>

              <div className="insight-meta-divider" />

              <div className="insight-meta-block">
                <span>Lead Author Group</span>
                <strong>{article.author || "ValInsight"}</strong>
              </div>

              <div className="insight-meta-divider" />

              <div className="insight-meta-block">
                <span>Reading Time</span>
                <strong>{readingTime} Minutes</strong>
              </div>

              <div className="insight-meta-divider" />

              <div className="insight-meta-block">
                <span>Published</span>
                <strong>{formatDate(article.published_at)}</strong>
              </div>
            </aside>

            <article className="insight-article-main">
              <p className="insight-article-eyebrow">
                Market Intelligence &amp; Research · {formatDate(article.published_at)}
              </p>

              <h1>{article.title}</h1>

              {article.excerpt && (
                <p className="insight-article-excerpt">{article.excerpt}</p>
              )}

              {article.cover_image_url && (
                <figure className="insight-article-cover">
                  <img
                    src={article.cover_image_url}
                    alt=""
                  />
                </figure>
              )}

              <div className="insight-article-body">
                <InsightContent content={article.content} />
              </div>

              <Link href="/insights" className="insight-article-return">
                ← Return to Insights Dashboard
              </Link>
            </article>

            <aside className="insight-article-sidebar">
              <section className="insight-side-card">
                <h2>Executive Summary</h2>
                <p>
                  Key observations and valuation considerations from this
                  publication.
                </p>

                <Link href="#article-content">Article Content →</Link>
                <Link href="#article-content">Methodology &amp; Analysis →</Link>
                <Link href="/insights">Other Insights →</Link>
              </section>

              <section className="insight-side-card">
                <h2>Related Research</h2>
                <p>
                  Explore additional ValInsight publications and observations.
                </p>

                <Link href="/insights">Latest Publications →</Link>
                <Link href="/insights">Valuation Perspectives →</Link>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";

import PageContainer from "../../components/layout/PageContainer";
import InsightContent from "../../components/insights/InsightContent";
import { supabase } from "../../lib/supabase/client";

interface InsightPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function InsightPage({
  params,
}: InsightPageProps) {
  const { slug } = await params;

  const { data: insight, error } = await supabase
    .from("insights")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content,
        cover_image_url,
        author,
        published_at
      `
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !insight) {
    notFound();
  }

  return (
    <>
      <section className="bg-primary py-20 lg:py-28">
        <PageContainer>
          <div className="max-w-4xl">
            <Link
              href="/insights"
              className="text-sm font-semibold text-secondary hover:underline"
            >
              ← Back to Insights
            </Link>

            <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {insight.title}
            </h1>

            {insight.excerpt && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
                {insight.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/60">
              {insight.author && (
                <span>By {insight.author}</span>
              )}

              {insight.published_at && (
                <span>
                  {new Date(
                    insight.published_at
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      {insight.cover_image_url && (
        <div className="mx-auto max-w-6xl px-6 pt-12 lg:px-8">
          <img
            src={insight.cover_image_url}
            alt={insight.title}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      )}

      <section className="py-16 lg:py-20">
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <InsightContent content={insight.content} />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
import PageContainer from "../layout/PageContainer";

interface PageBannerProps {
  title: string;
  description?: string;
}

export default function PageBanner({
  title,
  description,
}: PageBannerProps) {
  return (
    <section className="bg-primary py-20 lg:py-28">
      <PageContainer>
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            ValInsight
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {description}
            </p>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
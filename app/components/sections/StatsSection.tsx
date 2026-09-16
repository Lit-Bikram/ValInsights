import PageContainer from "../layout/PageContainer";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="border-y border-border bg-white py-16">
      <PageContainer>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="border-l-2 border-secondary pl-5"
            >
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.value}
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {stat.label}
              </p>

              {stat.description && (
                <p className="mt-2 text-sm leading-6 text-muted">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
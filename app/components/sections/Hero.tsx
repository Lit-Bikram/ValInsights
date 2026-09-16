import Link from "next/link";
import PageContainer from "../layout/PageContainer";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function Hero({
  eyebrow = "ValInsight",
  title,
  description,
  primaryButtonText = "Discuss a Requirement",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore Our Solutions",
  secondaryButtonHref = "/solutions",
}: HeroProps) {
  return (
    <section className="bg-primary">
      <PageContainer>
        <div className="max-w-4xl py-24 lg:py-32">
          {eyebrow && (
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {eyebrow}
            </p>
          )}

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center justify-center rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {primaryButtonText}
            </Link>

            <Link
              href={secondaryButtonHref}
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
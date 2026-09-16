import Link from "next/link";
import PageContainer from "../layout/PageContainer";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  title = "Discuss a Requirement",
  description = "Tell us about your requirement and let our team explore how we can help.",
  buttonText = "Get in Touch",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-surface py-20 lg:py-24">
      <PageContainer>
        <div className="rounded-2xl bg-primary px-8 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
              {description}
            </p>
          </div>

          <Link
            href={buttonHref}
            className="mt-8 inline-flex rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:mt-0"
          >
            {buttonText}
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
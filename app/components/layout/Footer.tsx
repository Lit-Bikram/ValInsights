import Link from "next/link";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Sector Expertise", href: "/sectors" },
  { label: "Whom We Serve", href: "/clients" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold">
              Val<span className="text-secondary">Insight</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Independent valuation and advisory expertise supporting
              businesses, investors, boards, and stakeholders.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Solutions
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>Financial Asset Valuation</li>
              <li>Real Estate Valuation</li>
              <li>Tangible Asset Valuation</li>
              <li>Disputes &amp; Litigations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-3 text-sm text-white/70">
              <p>Discuss your requirement with our team.</p>

              <Link
                href="/contact"
                className="inline-block font-semibold text-secondary hover:underline"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} ValInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
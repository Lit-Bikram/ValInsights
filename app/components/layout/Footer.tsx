import Link from "next/link";

const practiceLinks = [
  {
    label: "Securities & Financial Assets",
    href: "/solutions/securities-financial-assets",
  },
  {
    label: "Real Estate",
    href: "/solutions/real-estate",
  },
  {
    label: "Tangible Assets",
    href: "/solutions/tangible-assets",
  },
  {
    label: "Disputes & Litigation Support",
    href: "/solutions/disputes-litigation-support",
  },
];

export default function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer__curve" />

      <div className="home-footer-inner">
        {/* Brand */}
        <div className="home-footer-brand">
          <Link
            href="/"
            className="home-footer-logo"
            aria-label="ValInsight home"
          >
            <img
              src="/brand/logo-footer.svg"
              alt="ValInsight"
            />
          </Link>

          <p>
            Independent valuation services supporting businesses, investors,
            boards, and legal stakeholders.
          </p>
        </div>

        {/* Navigation */}
        <div className="home-footer-column">
          <h3>NAVIGATION</h3>

          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/sectors">Sector Expertise</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>

        {/* Practices */}
        <div className="home-footer-column">
          <h3>PRACTICES</h3>

          <nav aria-label="Footer practices">
            {practiceLinks.map((practice) => (
              <Link key={practice.href} href={practice.href}>
                {practice.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Resources */}
        <div className="home-footer-column home-footer-resources">
          <h3>RESOURCES</h3>

          <nav aria-label="Footer resources">
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="home-footer-newsletter">
          <h3>
            SIGN UP FOR
            <br />
            OUR MARKET
            <br />
            INTELLIGENCE
            <br />
            DIGEST
          </h3>

          <form className="home-footer-subscribe">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="footer-newsletter-email"
              type="email"
              name="email"
              placeholder="Your email"
              autoComplete="email"
            />

            <button type="submit">Subscribe</button>
          </form>

          <div className="home-footer-socials" aria-label="Social media">
            <a href="#" aria-label="LinkedIn">
              IN
            </a>

            <a href="#" aria-label="X">
              X
            </a>

            <a href="#" aria-label="Instagram">
              IG
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="home-footer-bottom">
        <div className="home-footer-bottom-inner">
          <p>© {new Date().getFullYear()} ValInsight. All rights reserved.</p>

          <div className="home-footer-legal">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/regulatory-disclosures">
              Regulatory Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
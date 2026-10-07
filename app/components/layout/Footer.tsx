import Link from "next/link";

export default function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        {/* Brand */}
        <div className="home-footer-brand">
          <Link href="/" className="home-footer-logo">
            <span>VALUATION</span>
            <span>INSIGHTS</span>
          </Link>

          <p>
            Independent valuation, M&amp;A advisory, and strategic financial
            intelligence for corporate boards and institutional investors.
          </p>
        </div>

        {/* Navigation */}
        <div className="home-footer-column">
          <h3>NAVIGATION</h3>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/solutions">Services</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>

        {/* Practices */}
        <div className="home-footer-column">
          <h3>PRACTICES</h3>

          <nav>
            <Link href="/solutions">Valuation Opinions</Link>
            <Link href="/solutions">M&amp;A Advisory</Link>
            <Link href="/solutions">Financial Modeling</Link>
            <Link href="/solutions">India-UAE Corridor</Link>
          </nav>
        </div>

        {/* Resources */}
        <div className="home-footer-column home-footer-resources">
          <h3>RESOURCES</h3>

          <nav>
            <Link href="/insights">Market Reports</Link>
            <Link href="/insights">Valuation Benchmarks</Link>
            <Link href="/contact">Client Portal</Link>
            <Link href="/contact">Careers</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="home-footer-newsletter">
          <h3>Sign up for our market intelligence digest</h3>

          <form className="home-footer-subscribe">
            <input
              type="email"
              placeholder="Your Email Address"
              aria-label="Email address"
            />

            <button type="button">
              Subscribe
            </button>
          </form>

          <div className="home-footer-socials">
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

      {/* Bottom legal bar */}
      <div className="home-footer-bottom">
        <div className="home-footer-bottom-inner">
          <p className="home-footer-copy">
            © 2026 Valuation Insights. All Rights Reserved.
          </p>

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
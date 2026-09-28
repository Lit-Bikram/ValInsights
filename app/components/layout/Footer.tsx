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
            Independent valuation services supporting businesses, investors,
            boards, and legal stakeholders.
          </p>
        </div>

        {/* Navigation */}
        <div className="home-footer-column">
          <h3>NAVIGATION</h3>

          <nav>
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

          <nav>
            <Link href="/solutions#securities-financial-assets">
              Valuation of Securities &amp; Financial Assets
            </Link>

            <Link href="/solutions#real-estate">
              Valuation of Real Estate
            </Link>

            <Link href="/solutions#tangible-assets">
              Valuation of Tangible Assets
            </Link>

            <Link href="/solutions#disputes-litigation">
              Disputes &amp; Litigation Support
            </Link>
          </nav>
        </div>

        {/* Resources */}
        <div className="home-footer-column home-footer-resources">
          <h3>RESOURCES</h3>

          <nav>
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
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
            />

            <button type="submit">Subscribe</button>
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
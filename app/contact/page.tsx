import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const enquiryTypes = [
  "Valuation assignment",
  "Transaction",
  "Financial reporting",
  "Dispute or litigation",
  "Other requirement",
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="contact-page">
        <section className="contact-hero">
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="contact-hero__image"
          />
          <div className="contact-hero__overlay" />

          <div className="contact-shell contact-hero__content">
            <p className="contact-breadcrumb">Home / Contact</p>
            <h1>Contact Us</h1>
            <p>
              If you are considering a valuation assignment or require specialist
              analysis for a transaction, reporting matter, or dispute, contact us.
            </p>
          </div>
        </section>

        <section className="contact-intro">
          <div className="contact-shell contact-intro__grid">
            <div>
              <p className="contact-label">Start a conversation</p>
              <h2>Discuss a Requirement</h2>
            </div>

            <div className="contact-intro__copy">
              <p>
                We work with parties who require specialist valuation analysis in
                situations involving capital, ownership, reporting, transactions,
                or disputes.
              </p>
              <p>
                Tell us briefly about the requirement and the context in which the
                valuation or analysis is needed. We can then understand the scope
                and the relevant next steps.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-main">
          <div className="contact-shell contact-main__grid">
            <div className="contact-form-panel">
              <p className="contact-label">Enquiry</p>
              <h2>Tell Us About Your Requirement</h2>

              <form className="contact-form">
                <div className="contact-form__row">
                  <label>
                    Name
                    <input type="text" name="name" placeholder="Your name" />
                  </label>

                  <label>
                    Organisation
                    <input
                      type="text"
                      name="organisation"
                      placeholder="Company / organisation"
                    />
                  </label>
                </div>

                <div className="contact-form__row">
                  <label>
                    Email
                    <input type="email" name="email" placeholder="Your email" />
                  </label>

                  <label>
                    Phone
                    <input type="tel" name="phone" placeholder="Your phone" />
                  </label>
                </div>

                <label>
                  Requirement
                  <select name="requirement" defaultValue="">
                    <option value="" disabled>
                      Select an area
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Message
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Briefly describe the matter, asset, transaction, or dispute."
                  />
                </label>

                <button type="submit" className="contact-form__button">
                  Send Enquiry
                </button>
              </form>
            </div>

            <aside className="contact-details">
              <p className="contact-label">Registered Office</p>
              <h2>Offices</h2>

              <div className="contact-office">
                <span>India</span>
                <strong>Valuation Insights</strong>
                <p>
                  P-44 Rabindra Sarani
                  <br />
                  Kolkata 700001
                  <br />
                  India
                </p>
              </div>

              <div className="contact-detail-divider" />

              <div className="contact-note">
                <span>Contact</span>
                <p>
                  Contact details will be added once the final public email and
                  phone information is confirmed for publication.
                </p>
              </div>

              <div className="contact-detail-divider" />

              <div className="contact-note">
                <span>Location</span>
                <p>
                  The registered office is listed above. An embedded map can be
                  added after the public address has been confirmed for display.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-expertise">
          <div className="contact-shell">
            <p className="contact-label">What We Can Discuss</p>
            <h2>Valuation Across Complex Requirements</h2>

            <div className="contact-expertise__grid">
              <Link href="/solutions/securities-financial-assets">
                <span>01</span>
                <strong>Securities &amp; Financial Assets</strong>
                <b>→</b>
              </Link>

              <Link href="/solutions/real-estate">
                <span>02</span>
                <strong>Real Estate</strong>
                <b>→</b>
              </Link>

              <Link href="/solutions/tangible-assets">
                <span>03</span>
                <strong>Tangible Assets</strong>
                <b>→</b>
              </Link>

              <Link href="/solutions/disputes-litigation-support">
                <span>04</span>
                <strong>Disputes &amp; Litigation Support</strong>
                <b>→</b>
              </Link>
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <div className="contact-shell contact-cta__inner">
            <p className="contact-label">Valuation Insights</p>
            <h2>Discuss a Requirement</h2>
            <p>
              If you are considering a valuation assignment or require specialist
              analysis for a transaction, reporting matter, or dispute, contact us.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

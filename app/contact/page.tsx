import Image from "next/image";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ContactForm from "../components/contact/ContactForm";

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
            <h1>Contact the Firm</h1>
            <p>
              If you are considering a valuation assignment, transaction,
              reporting matter, or dispute, we would be pleased to understand
              the requirement.
            </p>
          </div>
        </section>

        <section className="contact-main">
          <div className="contact-shell contact-main__grid">
            <div className="contact-copy">
              <h2>Start a Confidential Discussion</h2>

              <p className="contact-copy__intro">
                We serve clients across India, the UAE, and the wider Gulf
                region. Reach out directly using the communication channels
                below or submit your requirement through the secure form.
              </p>

              <div className="contact-copy__details">
                <div className="contact-copy__detail">
                  <span>Direct Email</span>
                  <a href="mailto:contact@valuationinsights.com">
                    contact@valuationinsights.com
                  </a>
                </div>

                <div className="contact-copy__detail">
                  <span>Telephone</span>
                  <a href="tel:+910000000000">+91 (0) 000 000 0000</a>
                </div>

                <div className="contact-copy__detail">
                  <span>Core Operating Regions</span>
                  <p>India • United Arab Emirates • Wider Gulf Region</p>
                </div>
              </div>
            </div>

            <div className="contact-form-panel">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

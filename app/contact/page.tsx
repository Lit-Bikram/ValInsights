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
            src="/images/contact/contact.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="contact-hero__image"
          />
          <div className="contact-hero__overlay" />

          <div className="contact-shell contact-hero__content">
            <p className="contact-hero__breadcrumb">Home / Contact Us</p>
            <h1>Contact the Firm</h1>
            <p>
              For valuation, transaction advisory, or dispute-related
              requirements, we would be pleased to discuss how we can support
              you.
            </p>
          </div>
        </section>

        <section className="contact-main">
          <div className="contact-shell contact-main__content">
            <div className="contact-main__heading">
              <p className="contact-section-breadcrumb">
                Contact Us / Discussion
              </p>
              <h2>Start a Confidential Discussion</h2>
            </div>

            <p className="contact-copy__intro">
              We serve clients across India, the UAE, and the wider Gulf region.
              Reach out directly using the communication channels below or
              submit your requirement through the secure form.
            </p>

            <div className="contact-main__grid">
              <div className="contact-copy">
                <div className="contact-copy__details">
                  <div className="contact-copy__detail">
                    <span>Direct Email</span>
                    <a href="mailto:contact@valuationinsights.com">
                      contact@valuationinsights.com
                    </a>
                  </div>

                  <div className="contact-copy__detail">
                    <span>Telephone</span>
                    <a href="tel:+919748848668">+91 97488 48668</a>
                  </div>

                  <div className="contact-copy__detail">
                    <span>Registered Office</span>
                    <b>
                      <h3>Val Insights Pvt. Ltd.</h3>
                    </b>

                    <p>P- 44, Rabindra Sarani, Kolkata - 700001, India</p>
                    <div className="contact-map">
                      <iframe
                        title="Val Insights Pvt. Ltd. registered office map"
                        src="https://maps.google.com/maps?q=P-44%20Rabindra%20Sarani%2C%20Kolkata%20700001%2C%20India&output=embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-panel">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

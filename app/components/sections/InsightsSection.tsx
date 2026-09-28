"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  "/images/homepage/slideshow-1.jpg",
  "/images/homepage/slideshow-2.jpg",
  "/images/homepage/slideshow-3.jpg",
  "/images/homepage/slideshow-4.jpg",
];

export default function InsightsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-insights">
      {/* Background slideshow */}
      <div className="home-insights-background" aria-hidden="true">
        {slides.map((src, index) => (
          <div
            key={src}
            className={`home-insights-slide ${
              index === currentSlide ? "is-active" : ""
            }`}
            style={{
              backgroundImage: `url("${src}")`,
            }}
          />
        ))}

        <div className="home-insights-overlay" />
      </div>

      {/* Content */}
      <div className="home-insights-inner">
        <div className="home-insights-content">
          <p className="home-insights-eyebrow">
            INSIGHTS &amp; MARKET INTELLIGENCE
          </p>

          <h2>
            Current observations and
            <br />
            valuation perspectives.
          </h2>

          <p>
            We publish concise observations on valuation, sector economics,
            transactions, reporting, and disputes. Our insights focus on the
            issues shaping decisions and the practical application of
            valuation.
          </p>

          <Link href="/insights" className="home-insights-link">
            View all insights
            <span>→</span>
          </Link>
        </div>

        {/* Slideshow controls */}
        <div className="home-insights-controls">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`home-insights-dot ${
                index === currentSlide ? "is-active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
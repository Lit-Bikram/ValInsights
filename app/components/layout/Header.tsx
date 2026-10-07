"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (section: string) => {
    if (section === "home") return pathname === "/";
    if (section === "about") return pathname === "/about" || pathname.startsWith("/about/");
    if (section === "solutions") return pathname === "/solutions" || pathname.startsWith("/solutions/");
    if (section === "sectors") return pathname === "/sectors" || pathname.startsWith("/sectors/");
    if (section === "insights") return pathname === "/insights" || pathname.startsWith("/insights/");
    if (section === "contact") return pathname === "/contact" || pathname.startsWith("/contact/");
    return false;
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="home-header">
      <div className="home-header__inner">
        <Link href="/" className="home-logo" aria-label="Valuation Insights home" onClick={closeMenu}>
          <img
            src="/brand/logo-header.png"
            alt="Valuation Insights"
            className="home-logo__image"
          />
        </Link>

        <nav className="home-header__nav" aria-label="Primary navigation">
          <Link href="/" className={isActive("home") ? "active" : ""}>Home</Link>
          <Link href="/about" className={isActive("about") ? "active" : ""}>About Us</Link>
          <Link href="/solutions" className={isActive("solutions") ? "active" : ""}>Solutions</Link>
          <Link href="/sectors" className={isActive("sectors") ? "active" : ""}>Sector Expertise</Link>
          <Link href="/insights" className={isActive("insights") ? "active" : ""}>Insights</Link>
          <Link href="/contact" className={isActive("contact") ? "active" : ""}>Contact Us</Link>
        </nav>

        <button
          type="button"
          className="home-mobile-toggle"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className={isMenuOpen ? "home-mobile-toggle__line home-mobile-toggle__line--top is-open" : "home-mobile-toggle__line"} />
          <span className={isMenuOpen ? "home-mobile-toggle__line home-mobile-toggle__line--middle is-open" : "home-mobile-toggle__line"} />
          <span className={isMenuOpen ? "home-mobile-toggle__line home-mobile-toggle__line--bottom is-open" : "home-mobile-toggle__line"} />
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="home-mobile-menu">
          <nav aria-label="Mobile navigation">
            <Link href="/" className={isActive("home") ? "active" : ""} onClick={closeMenu}>Home</Link>
            <Link href="/about" className={isActive("about") ? "active" : ""} onClick={closeMenu}>About Us</Link>
            <Link href="/solutions" className={isActive("solutions") ? "active" : ""} onClick={closeMenu}>Solutions</Link>
            <Link href="/sectors" className={isActive("sectors") ? "active" : ""} onClick={closeMenu}>Sector Expertise</Link>
            <Link href="/insights" className={isActive("insights") ? "active" : ""} onClick={closeMenu}>Insights</Link>
            <Link href="/contact" className={isActive("contact") ? "active" : ""} onClick={closeMenu}>Contact Us</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

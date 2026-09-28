"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (section: string) => {
    if (section === "about") {
      return pathname === "/about" || pathname.startsWith("/about/");
    }

    if (section === "solutions") {
      return pathname === "/solutions" || pathname.startsWith("/solutions/");
    }

    if (section === "sectors") {
      return pathname === "/sectors" || pathname.startsWith("/sectors/");
    }

    if (section === "insights") {
      return pathname === "/insights" || pathname.startsWith("/insights/");
    }

    if (section === "contact") {
      return pathname === "/contact" || pathname.startsWith("/contact/");
    }

    return false;
  };

  return (
    <header className="home-header">
      <div className="home-header__inner">

        <Link href="/" className="home-logo">
          <span>Valuation</span>
          <span>Insights</span>
        </Link>

        <nav className="home-header__nav">

          <Link
            href="/about"
            className={isActive("about") ? "active" : ""}
          >
            About Us
          </Link>

          <Link
            href="/solutions"
            className={isActive("solutions") ? "active" : ""}
          >
            Solutions
          </Link>

          <Link
            href="/sectors"
            className={isActive("sectors") ? "active" : ""}
          >
            Sector Expertise
          </Link>

          <Link
            href="/insights"
            className={isActive("insights") ? "active" : ""}
          >
            Insights
          </Link>

          <Link
            href="/contact"
            className={isActive("contact") ? "active" : ""}
          >
            Contact Us
          </Link>

        </nav>
      </div>
    </header>
  );
}
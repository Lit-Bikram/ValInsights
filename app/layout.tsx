import type { Metadata } from "next";
import "./globals.css";
import PageReveal from "./components/ui/PageReveal";

export const metadata: Metadata = {
  title: "ValInsight",
  description: "Independent Valuation Specialists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <PageReveal>
          {children}
        </PageReveal>
      </body>
    </html>
  );
}
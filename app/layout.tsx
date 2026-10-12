import type { Metadata } from "next";
import "./globals.css";
import PageReveal from "./components/ui/PageReveal";

export const metadata: Metadata = {
  title: "ValInsight",
  description: "Independent Valuation Specialists",
  icons: {
    icon: "/brand/icon.png",
    shortcut: "/brand/icon.png",
    apple: "/brand/icon.png",
  },
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
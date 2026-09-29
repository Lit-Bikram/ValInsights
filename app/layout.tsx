import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ValInsight",
    template: "%s | ValInsight",
  },
  description:
    "Independent valuation specialists supporting businesses, investors, boards, and legal stakeholders.",

  icons: {
    icon: "/brand/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
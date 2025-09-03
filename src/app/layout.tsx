import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./(site)/components/Navbar";
import Footer from "./(site)/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap", weight: ["400","500","600","700"] });

export const metadata: Metadata = {
  title: {
    default: "Ordera Consulting — AI Strategy, Automation & Compliance",
    template: "%s | Ordera Consulting",
  },
  description:
    "Premium AI consulting and automation for SMBs in health, tech, and manufacturing. Clear. Compliant. ROI-focused.",
  // Use relative metadata to avoid mismatched host in dev
  openGraph: {
    title: "Ordera Consulting — AI Strategy, Automation & Compliance",
    description:
      "Premium AI consulting and automation for SMBs in health, tech, and manufacturing.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ordera Consulting",
    description:
      "Premium AI consulting and automation for SMBs in health, tech, and manufacturing.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

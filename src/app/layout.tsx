import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./(site)/components/Navbar";
import Footer from "./(site)/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-ordera-serif",
  subsets: ["latin"],
  display: "swap",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

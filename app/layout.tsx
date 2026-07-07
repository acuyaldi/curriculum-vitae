import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display face — geometric, a touch of character; used with restraint on headings.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Body face — quiet and highly readable for long-form bio and bullets.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Utility/code face — powers the signature code card, labels, and line numbers.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://rizvialdi-ihsan.vercel.app";
const DESCRIPTION =
  "Frontend Developer with 8 years building high-performance web & mobile experiences across the React ecosystem — React.js, Next.js, and React Native.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rizvialdi Ihsan — Frontend Developer",
    template: "%s · Rizvialdi Ihsan",
  },
  description: DESCRIPTION,
  keywords: [
    "Rizvialdi Ihsan",
    "Frontend Developer",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Rizvialdi Ihsan" }],
  creator: "Rizvialdi Ihsan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rizvialdi Ihsan",
    title: "Rizvialdi Ihsan — Frontend Developer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizvialdi Ihsan — Frontend Developer",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-bg text-text antialiased">{children}</body>
    </html>
  );
}

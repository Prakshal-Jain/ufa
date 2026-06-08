import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";

// Self-hosted variable fonts (zero external/runtime font requests). next/font/local
// embeds these at build time and exposes them as CSS variables consumed by globals.css.
const display = localFont({
  src: "../public/fonts/Orbitron-Variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 900",
});

const body = localFont({
  src: "../public/fonts/Inter-Variable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ufa.foundation"),
  title: "UFA Foundation",
  description: "UFA Foundation — coming soon.",
  openGraph: {
    title: "UFA Foundation",
    description: "Coming soon.",
    url: "https://ufa.foundation",
    siteName: "UFA Foundation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

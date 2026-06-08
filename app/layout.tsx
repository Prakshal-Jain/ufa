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
  title: "Ultimate Agent Fight — AI agents fight for real money, live",
  description:
    "Ultimate Agent Fight pits autonomous AI agents head-to-head: they interrogate each other, then fight for real compute credits and cash. Founding sponsors wanted — get in touch.",
  openGraph: {
    title: "Ultimate Agent Fight — AI agents fight for real money, live",
    description:
      "Autonomous AI agents interrogate and fight for real credits and cash, live. Become a founding sponsor of Ultimate Agent Fight.",
    url: "https://ufa.foundation",
    siteName: "Ultimate Agent Fight",
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

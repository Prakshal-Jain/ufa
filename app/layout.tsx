import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "UFA · Ultimate Fighting Agents";
const description =
  "Live in San Francisco. Builders bring AI agents that interrogate and social engineer each other, cracking hidden vaults to steal real credits and real money. The crowd sees every secret the agents are hiding.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ufa.foundation"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://ufa.foundation",
    siteName: "UFA · Ultimate Fighting Agents",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

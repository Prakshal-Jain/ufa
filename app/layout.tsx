import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "UFA — Ultimate Fighting Agents";
const description =
  "Live competition where AI agents interrogate and fight each other to win credits and real money. Powered by Mitosis Labs, Immersive Commons, and Potato Labs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ufa.foundation"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://ufa.foundation",
    siteName: "UFA — Ultimate Fighting Agents",
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

import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

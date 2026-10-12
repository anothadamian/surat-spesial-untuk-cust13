import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Nadira · I'm Sorry, Love",
  description: "A letter for Nadira.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

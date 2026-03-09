import type { Metadata } from "next";
import { Poppins, Inter, Wallpoet } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontSerif = Inter({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = Wallpoet({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Countdown Timer - Track Upcoming Events",
  description:
    "Create and manage multiple countdown timers for your important events. Track time remaining with clear visual indicators, edit or delete timers, and keep everything saved locally in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

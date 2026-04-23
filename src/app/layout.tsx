import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmos Dashboard | NASA Real-time Data",
  description: "High-fidelity, full-stack dashboard visualizing real-time data from the NASA Open API. Explore APOD, Mars Rovers, Near-Earth Objects, and Epic Earth.",
  keywords: ["NASA", "Space", "Astronomy", "Dashboard", "Mars Rover", "NEO", "Asteroids", "APOD"],
  authors: [{ name: "Cosmos Explorer" }],
  openGraph: {
    title: "Cosmos Dashboard",
    description: "Real-time NASA data visualization dashboard",
    type: "website",
    locale: "en_US",
    siteName: "Cosmos Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmos Dashboard",
    description: "Real-time NASA data visualization dashboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <div className="stars"></div>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

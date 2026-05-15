import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nebula Threads — The Future of Digital Communities",
  description: "Discover immersive discussions, futuristic communities, and real-time social experiences on Nebula Threads.",
  keywords: ["Nebula Threads", "social media", "communities", "discussions", "futuristic"],
  authors: [{ name: "Nebula Threads" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Nebula Threads",
    description: "The Future of Digital Communities",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: '#060816', color: '#FFFFFF' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

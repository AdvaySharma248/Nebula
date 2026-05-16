import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nebula — Digital Community OS",
  description: "The operating system for digital communities. Built for the next era of social.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Nebula",
    description: "Digital Community OS",
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
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased noise`}
        style={{ background: '#0D0D0D', color: '#F5F5F5' }}
      >
        {children}
      </body>
    </html>
  );
}

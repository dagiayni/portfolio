import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoLoader from "@/components/VideoLoader";
import ChatAssistant from "@/components/ChatAssistant";

const primaryFont = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "500", "600", "700"],
});

const secondaryFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Systems Builder | Software Platforms & Infrastructure",
  description: "I design and build systems that solve real-world problems. Software platforms, operational infrastructure, and scalable digital experiences.",
  keywords: ["Systems Builder", "Software Infrastructure", "Platform Engineering", "System Design"],
  authors: [{ name: "Systems Builder" }],
  openGraph: {
    title: "Systems Builder Portfolio",
    description: "Designing and delivering complex software platforms and operational systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} font-sans antialiased bg-white text-[#111111]`}
      >
        <VideoLoader />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <ChatAssistant />
        <Footer />
      </body>
    </html>
  );
}

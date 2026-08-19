import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://psychomentalhub.vercel.app"
  ),

  title: {
    default: "PsychoMentalHub | AI-Powered Student Wellness",
    template: "%s | PsychoMentalHub",
  },

  description:
    "PsychoMentalHub is an AI-powered student mental wellness platform that provides personalized wellness assessments, AI-assisted guidance, mental health insights, and counselor support.",

  keywords: [
    "PsychoMentalHub",
    "student mental health",
    "student wellness",
    "mental wellness platform",
    "AI mental wellness",
    "AI wellness assistant",
    "mental health assessment",
    "student wellbeing",
    "wellness assessment",
    "counselor support",
    "personalized wellness",
  ],

  authors: [
    {
      name: "PsychoMentalHub",
    },
  ],

  creator: "PsychoMentalHub",
  publisher: "PsychoMentalHub",

  applicationName: "PsychoMentalHub",

  category: "health",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PsychoMentalHub",
    title: "PsychoMentalHub | AI-Powered Student Wellness",
    description:
      "An AI-powered student wellness platform for mental health assessments, personalized wellness guidance, insights, and counselor support.",
  },

  twitter: {
    card: "summary_large_image",
    title: "PsychoMentalHub | AI-Powered Student Wellness",
    description:
      "AI-powered mental wellness support for students through assessments, personalized insights, and counselor assistance.",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
        <ThemeProvider>
          <main className="flex-1">
            {children}
          </main>

          <Toaster
            richColors
            position="top-right"
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
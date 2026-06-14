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
  title: {
    default: "Smart HealthHub",
    template: "%s | Smart HealthHub",
  },
  description:
    "AI Powered Student Wellness Platform for mood tracking, sleep monitoring, wellness assessments, counselor appointments, and personalized health insights.",
  keywords: [
    "Student Wellness",
    "Mental Health",
    "AI Wellness",
    "Health Tracking",
    "Mood Tracking",
    "Sleep Monitoring",
    "Next.js",
  ],
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
          <main className="flex-1">{children}</main>

          <Toaster richColors position="top-right" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

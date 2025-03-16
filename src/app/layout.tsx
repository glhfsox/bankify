import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bankify | Banking & Finance Solution",
  description: "Bankify is a website crafted for banks and fintech, offering responsive design, secure features, and customizable sections to elevate your financial brand online.",
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/apple-icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bankify",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    title: "Bankify | Modern Banking Solution",
    description: "Manage your finances easily with our secure banking platform",
    url: "https://bankify.vercel.app",
    siteName: "Bankify",
    images: [
      {
        url: "https://ext.same-assets.com/3326104566/344829349.png",
        width: 1200,
        height: 630,
        alt: "Bankify Dashboard Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bankify | Modern Banking Solution",
    description: "Manage your finances easily with our secure banking platform",
    images: ["https://ext.same-assets.com/3326104566/344829349.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <ClientBody>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </ClientBody>
    </html>
  );
}

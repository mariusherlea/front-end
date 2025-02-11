// ./app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/Site/Header";
import { Toaster } from "@/components/ui/sonner";

const APP_NAME = "Q&A Times";
const APP_DEFAULT_TITLE = "The Q&A Times";
const APP_TITLE_TEMPLATE = "%s - Q&A Times";
const APP_DESCRIPTION =
  "Feel free to ask any question and get answers from the community";
const APP_URL = process.env.APP_URL || "https://qa-times.netlify.app";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/images/qa-cover.png`,
        width: 1200,
        height: 630,
        alt: APP_DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/images/qa-cover.png`,
        width: 1200,
        height: 630,
        alt: APP_DEFAULT_TITLE,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <Toaster richColors position="top-center" theme="system" />
      </body>
    </html>
  );
}

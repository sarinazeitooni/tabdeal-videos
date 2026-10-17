import type { Metadata } from "next";
import localFont from "next/font/local";
import { Rubik } from "next/font/google";
import { siteConfig } from "@/shared/config/site";
import "@/styles/globals.css";

const IRANSans = localFont({
  src: [
    {
      path: "../fonts/iransans/IRANSansWeb.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansWeb_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansWeb_Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "fa_IR",
    type: "website",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="fa" dir="rtl" className={`${IRANSans.variable} ${rubik.variable}`}>
    <body
      className={`${IRANSans.className} flex min-h-screen flex-col bg-surface font-sans antialiased`}
    >
      <main className="flex flex-1 flex-col">{children}</main>
    </body>
  </html>
);

export default RootLayout;

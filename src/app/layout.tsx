import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { siteConfig } from "@/shared/config/site";
import "@/styles/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
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
  <html lang="fa" dir="rtl">
    <body
      className={`${vazirmatn.variable} flex min-h-screen flex-col bg-surface font-sans antialiased`}
    >
      <main className="flex flex-1 flex-col">{children}</main>
    </body>
  </html>
);

export default RootLayout;

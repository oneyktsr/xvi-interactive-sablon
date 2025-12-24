import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const suisseIntl = localFont({
  src: [
    { path: "./fonts/SuisseIntl-Light.woff2", weight: "300", style: "normal" },
    {
      path: "./fonts/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "XVI INTERACTIVE",
  description: "Digital Experiences & Creative Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={suisseIntl.variable}>
      {/* selection: sınıfları kaldırıldı, globals.css hallediyor */}
      <body className="antialiased bg-black text-white font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

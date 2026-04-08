import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ELEVATE PNW Volleyball Club",
  description:
    "Mobile-friendly youth volleyball club platform for athletes, families, coaches, and admins.",
  applicationName: "ELEVATE PNW",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ELEVATE PNW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

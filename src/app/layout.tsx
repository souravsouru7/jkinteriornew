import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingContact from "./components/FloatingContact";

export const metadata: Metadata = {
  title: "JK Interiors - Luxury Interior Design Studio",
  description:
    "Bespoke luxury interiors for villas, penthouses, premium homes, hotels, and refined commercial spaces across Hyderabad.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload the most-used display font weight */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] font-sans">
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}

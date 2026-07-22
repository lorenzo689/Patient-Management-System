import type { Metadata } from "next";
import "./globals.css";
import "react-phone-number-input/style.css";

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-300 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}

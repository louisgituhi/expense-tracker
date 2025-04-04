import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FloatingNavbar from "@/components/ui-components/floating-navbar";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "finance app",
  description: "A finance app to track your expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ ` ${jetBrainsMono.className} antialiased` }
      >
        {children}
        <FloatingNavbar />
      </body>
    </html>
  );
}

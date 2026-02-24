import type { Metadata } from "next";
import { inter, playfair } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenBook",
  description: "GreenBook frontend for golf feed, search, and profile experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

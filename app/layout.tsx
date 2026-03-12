import type { Metadata, Viewport } from "next";
import { inter, playfair } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GreenBook - Track Your Golf Journey",
    template: "%s | GreenBook",
  },
  description:
    "GreenBook is the elegant way to track courses you've played, discover new ones, and connect with fellow golfers who share your passion.",
  keywords: ["golf", "golf courses", "golf tracking", "golf social", "course wishlist"],
  authors: [{ name: "GreenBook" }],
  openGraph: {
    title: "GreenBook - Track Your Golf Journey",
    description:
      "The elegant way to track courses you've played, discover new ones, and connect with fellow golfers.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F4F1EA",
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

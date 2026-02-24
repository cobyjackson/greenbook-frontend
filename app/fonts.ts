import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const playfair = localFont({
  src: [
    {
      path: "./fonts/PlayfairDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PlayfairDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

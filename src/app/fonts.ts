import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const roundhand = localFont({
  src: [
    {
      path: "./fonts/Roundhand.woff",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-roundhand",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
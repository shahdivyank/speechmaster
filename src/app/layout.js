/* eslint-disable new-cap */
"use client";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins-font",
});

export const metadata = {
  title: "Speechmaster",
  description: "Presentation Practice",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        className="h-full"
      >
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}

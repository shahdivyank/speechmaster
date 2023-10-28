/* eslint-disable new-cap */
"use client";
import TitleBar from "@/components/TitleBar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Poppins } from "next/font/google";
import ProtectedPage from "@/components/ProtectedPage";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins-font",
});

export default function RootLayout({ children, session }) {
  const pathname = usePathname();
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        className="h-full"
      >
        <body className="bg-sm-beige min-h-screen">
          <ProtectedPage>
            <Toaster />
            {pathname !== "/" && pathname !== "/login" && <TitleBar />}

            {children}
          </ProtectedPage>
        </body>
      </SessionProvider>
    </html>
  );
}

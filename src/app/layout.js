/* eslint-disable new-cap */
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`bg-sm-beige`}>
        <div className=" min-h-screen font-poppins">{children}</div>
      </body>
    </html>
  );
}

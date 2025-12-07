import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "../styles/globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Navbar } from "@/components/layout/Navbar";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marvel Characters Browser",
  description: "Bemobile Frontend Developer Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoCondensed.variable}`}>
      <body>
        <FavoritesProvider>
          <Navbar />
          <main>{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}

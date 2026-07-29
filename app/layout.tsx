import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Fortza Horizon 6",
  description: "Curse Forza Horizon create de comunitate",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body
        className="
        min-h-full
        flex
        flex-col
        bg-zinc-950
        "
      >

        <Header />

        <main className="pt-16 flex-1">

          {children}

        </main>


      </body>

    </html>

  );

}
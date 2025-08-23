import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

/* The `const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans",
weight: "100 900" });` code snippet is defining a local font using the `localFont` function. Here's
what each parameter is doing: */
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

const inter = Inter({ subsets: ["latin"], weight: "400" });
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: "400",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "KILO TO GO",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased bg-white`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

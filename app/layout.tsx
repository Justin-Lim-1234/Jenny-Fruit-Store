import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const dotenv = require("dotenv");
dotenv.config();

console.log();

const roboto = Roboto({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jenny's Fruit Store ",
  description: "POS for Jenny's Fruit Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${roboto.className} antialiased text-4xl text-center`}>
      <div
        className=" ml-7 mt-6 border-solid border-4 border-emerald-700 flex h-30 w-60 justify-start rounded-md bg-green-400 p-4"
      >
        <div className="text-white h-20 md:w-60 drop-shadow-[2.5px_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1>Jenny&apos;s Fruit Store</h1>
        </div>
      </div>
        <div className="flex-grow p-4 md:overflow-y-auto md:p-6">
          {children}
        </div>
      </body>
    </html>
  );
}

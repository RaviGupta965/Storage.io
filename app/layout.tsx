import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const getPoppins = Poppins({
  subsets: ["latin"],
  weight: ['100','200','300','600','400','500','700','900','300'],
  variable: "--font-poppins"
})


export const metadata: Metadata = {
  title: "StoreBox.io",
  description: "Your Personal Storage Container",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${getPoppins.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

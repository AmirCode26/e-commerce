import type { Metadata } from "next";
import "./globals.css";
import HomeContextProvider from "@/context/HomeContext";

export const metadata: Metadata = {
  icons: "/assets/dorita_shop_D.svg",
  title: "Dorita Shop",
  description: "Tienda de sublimacion Santo Domingo",
  category: "ecomerce",
  keywords: ["SDO", "RD", "SHOP", "TIENDA"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HomeContextProvider>
        <body className="w-screen bg-stone-300">{children}</body>
      </HomeContextProvider>
    </html>
  );
}

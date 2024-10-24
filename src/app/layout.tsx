import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Manage your inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark`}>
        <StoreProvider>
          <Header />
          <main className="p-5">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}

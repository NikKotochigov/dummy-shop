import type { Metadata } from "next";
import { Header } from "@/shared/ui/Header";
import { Footer } from "@/shared/ui/Footer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Abelohost Shop",
  description: "Online shop with latest products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

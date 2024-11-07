import Navbar from "@/layouts/Navbar";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Time Keeper",
  description: "Une application de gestion du temps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-zinc-100">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

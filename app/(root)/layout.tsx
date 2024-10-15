import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abres Store",
  description: "Abres Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToasterProvider />
          {/* Main flex container */}
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Main content area */}
            <main className="flex-1">{children}</main>
            {/* Footer */}
            <Footer />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}

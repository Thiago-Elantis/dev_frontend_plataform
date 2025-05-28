import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components_dashboard/Sidebar";
import HeaderWithState from "@/components/HeaderWithState"; // novo componente

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Elantis",
  description: "Tecnologia com propósito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 bg-gray-50 pt-2 pr-2 md-4">
            <HeaderWithState />
            <div className="mt-6 ">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

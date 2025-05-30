"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import HeaderWithState from "@/components/HeaderWithState";
import { useState } from "react";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar 
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          
          <div className={clsx(
            "flex-1 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "ml-5" : "ml-3 mr-3"
          )}>
            <div className="pt-2 pr-2 md-4">
              <HeaderWithState isSidebarOpen={isSidebarOpen} />
              <div className="mt-6 pl-4">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
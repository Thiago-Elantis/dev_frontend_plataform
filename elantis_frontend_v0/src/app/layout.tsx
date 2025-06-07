"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/menu/MenuSidebar";
import Header from "@/components/menu/MenuHeader";
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

  // 🔔 Estado para mostrar ou esconder notificações
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationsClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

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
              <Header 
                isSidebarOpen={isSidebarOpen}
                showNotifications={showNotifications}
                onNotificationsClick={handleNotificationsClick}
                onCloseNotifications={handleCloseNotifications}
                unreadCount={2} // valor de exemplo
              />
              <div className="h-4"></div>
              <div className="mt-6 pl-4">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

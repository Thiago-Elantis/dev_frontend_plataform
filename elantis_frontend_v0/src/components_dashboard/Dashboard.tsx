"use client";

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import OverviewCards from './OverviewCards';
import ChartsSection from './ChartsSection';
import RevenueSection from './RevenueSection';

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden relative">
        <div className="p-6">
          <Header 
            onNotificationsClick={() => setShowNotifications(!showNotifications)} 
            showNotifications={showNotifications}
            onCloseNotifications={() => setShowNotifications(false)}
          />
          
          <OverviewCards />
          <ChartsSection />
          <RevenueSection />
        </div>
      </main>
    </div>
  );
}

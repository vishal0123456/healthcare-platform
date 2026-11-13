import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Topbar title={title} subtitle={subtitle} />
        <main className="page-wrapper animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}

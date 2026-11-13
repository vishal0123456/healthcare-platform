import React, { useState } from 'react';
import { Bell, Search, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const notifications = [
  { id: 1, text: 'Emergency: Vikram Singh admitted to CCU', time: '1h ago', read: false, type: 'danger' },
  { id: 2, text: 'Lab report ready for Riya Patel', time: '2h ago', read: false, type: 'info' },
  { id: 3, text: 'Appointment scheduled – Aarav Sharma', time: '3h ago', read: true, type: 'info' },
  { id: 4, text: 'Nutrition plan updated for Sneha Reddy', time: '5h ago', read: true, type: 'info' },
];

export default function Topbar({ title, subtitle }) {
  const { currentUser } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header style={{
      height: 68,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      {/* Page title */}
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 1 }}>{subtitle}</p>}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Notification bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotif(!showNotif)}
            style={{
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, border: '1px solid var(--border)',
              background: 'var(--surface)', cursor: 'pointer', position: 'relative',
            }}
          >
            <Bell size={18} color="var(--text-secondary)" />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: 7, right: 7,
                width: 8, height: 8,
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid white',
              }} />
            )}
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div style={{
              position: 'absolute', right: 0, top: '110%',
              width: 320, background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 12, boxShadow: 'var(--shadow-lg)',
              zIndex: 100, overflow: 'hidden',
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Notifications</span>
                <span style={{ fontSize: 12, color: 'var(--primary)', cursor: 'pointer' }}>Mark all read</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: n.read ? 'white' : '#f0f9ff', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? '#e2e8f0' : (n.type === 'danger' ? '#ef4444' : '#0ea5e9'), marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>{n.text}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User profile chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 12px 6px 6px',
          border: '1px solid var(--border)',
          borderRadius: 10, background: 'var(--surface)',
          cursor: 'pointer',
        }}>
          <Avatar initials={currentUser?.avatar} color={currentUser?.avatarColor} size={30} />
          <div style={{ lineHeight: 1.3 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{currentUser?.name?.split(' ').slice(0, 2).join(' ')}</p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{currentUser?.role}</p>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>

      {/* Click outside to close */}
      {showNotif && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowNotif(false)} />
      )}
    </header>
  );
}

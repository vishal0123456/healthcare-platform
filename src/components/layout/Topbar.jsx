import React, { useState } from 'react';
import { Bell, ChevronDown, AlertCircle, FileText, Calendar, Heart, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

const notifications = [
  { id: 1, text: 'Emergency: Vikram Singh admitted to CCU', time: '1h ago', read: false, type: 'danger', icon: AlertCircle },
  { id: 2, text: 'Lab report ready for Riya Patel — CBC Normal', time: '2h ago', read: false, type: 'info', icon: FileText },
  { id: 3, text: 'Appointment scheduled — Aarav Sharma', time: '3h ago', read: true, type: 'info', icon: Calendar },
  { id: 4, text: 'Nutrition plan updated for Sneha Reddy', time: '5h ago', read: true, type: 'info', icon: Heart },
  { id: 5, text: 'New patient registered — Pradeep Kumar', time: '6h ago', read: true, type: 'info', icon: UserPlus },
];

const typeColor = { danger: '#ef4444', info: '#0ea5e9' };

export default function Topbar({ title, subtitle }) {
  const { currentUser } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <>
      <header style={{
        height: 64,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
        flexShrink: 0,
      }}>
        <div>
          <h1 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>{subtitle}</p>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotif(v => !v)}
              aria-label="Notifications"
              style={{
                width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 10, border: '1px solid var(--border)',
                background: 'white', cursor: 'pointer', position: 'relative',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.background = '#f0f9ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'white'; }}
            >
              <Bell size={16} color="var(--text-secondary)" />
              {unread > 0 && (
                <span style={{
                  position: 'absolute', top: 7, right: 7,
                  width: 7, height: 7,
                  background: '#ef4444', borderRadius: '50%',
                  border: '1.5px solid white',
                }} />
              )}
            </button>

            {showNotif && (
              <div style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                width: 340, background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 14, boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                zIndex: 200, overflow: 'hidden',
                animation: 'scaleIn 0.2s ease',
                transformOrigin: 'top right',
              }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</span>
                  {unread > 0 && (
                    <span style={{ fontSize: 11, background: '#ef4444', color: 'white', borderRadius: 999, padding: '2px 8px', fontWeight: 700 }}>
                      {unread} new
                    </span>
                  )}
                </div>
                {notifications.map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} style={{
                      padding: '12px 18px',
                      borderBottom: i < notifications.length - 1 ? '1px solid #f8fafc' : 'none',
                      background: n.read ? 'white' : '#f0f9ff',
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      cursor: 'pointer', transition: 'background 0.1s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background = n.read ? 'white' : '#f0f9ff'}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${typeColor[n.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={15} color={typeColor[n.type]} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.45, fontWeight: n.read ? 400 : 600 }}>{n.text}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{n.time}</p>
                      </div>
                      {!n.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: typeColor[n.type], flexShrink: 0, marginTop: 5 }} />}
                    </div>
                  );
                })}
                <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>View all notifications</span>
                </div>
              </div>
            )}
          </div>

          {/* User profile chip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '5px 12px 5px 5px',
            border: '1px solid var(--border)',
            borderRadius: 10, background: 'white',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#bae6fd'; e.currentTarget.style.background = '#f0f9ff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'white'; }}
          >
            <Avatar initials={currentUser?.avatar} color={currentUser?.avatarColor} size={30} />
            <div style={{ lineHeight: 1.3 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                {currentUser?.name?.split(' ').slice(0, 2).join(' ')}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{currentUser?.role}</p>
            </div>
            <ChevronDown size={13} color="var(--text-muted)" />
          </div>
        </div>
      </header>

      {/* Click-away overlay */}
      {showNotif && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setShowNotif(false)} />
      )}
    </>
  );
}

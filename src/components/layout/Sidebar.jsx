import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, Stethoscope, Apple,
  Activity, Shield, LogOut, ChevronLeft, ChevronRight,
  Heart, Menu, ClipboardList
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

const allNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['Admin', 'Doctor', 'Patient', 'Nutritionist', 'Yoga Instructor'] },
  { path: '/patients', icon: Users, label: 'Patients', roles: ['Admin', 'Doctor', 'Nutritionist', 'Yoga Instructor'] },
  { path: '/medical-history', icon: ClipboardList, label: 'Medical History', roles: ['Admin', 'Doctor'] },
  { path: '/reports', icon: FileText, label: 'Medical Reports', roles: ['Admin', 'Doctor', 'Patient'] },
  { path: '/consultations', icon: Stethoscope, label: 'Consultations', roles: ['Admin', 'Doctor', 'Patient'] },
  { path: '/nutrition', icon: Apple, label: 'Nutrition Plans', roles: ['Admin', 'Nutritionist', 'Patient', 'Doctor'] },
  { path: '/wellness', icon: Activity, label: 'Yoga & Wellness', roles: ['Admin', 'Yoga Instructor', 'Patient', 'Doctor'] },
  { path: '/access-control', icon: Shield, label: 'Access Control', roles: ['Admin'] },
];

export default function Sidebar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = allNavItems.filter(item => item.roles.includes(currentUser?.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={{
      width: collapsed ? 70 : 260,
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      position: 'relative',
      zIndex: 100,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '20px 0' : '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12, minHeight: 72 }}>
        <div style={{
          width: 38, height: 38,
          background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Heart size={20} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>MediCore</div>
            <div style={{ fontSize: 10, color: '#64748b', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Healthcare Platform</div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={collapsed ? item.label : undefined}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: collapsed ? '12px 0' : '11px 20px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              textDecoration: 'none',
              margin: '2px 8px',
              borderRadius: 10,
              color: isActive ? 'white' : '#94a3b8',
              background: isActive ? 'linear-gradient(135deg, rgba(14,165,233,0.25), rgba(99,102,241,0.2))' : 'transparent',
              borderLeft: isActive ? '3px solid #0ea5e9' : '3px solid transparent',
              transition: 'all 0.2s',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <item.icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div style={{ padding: collapsed ? '12px 0' : '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {!collapsed && currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.05)' }}>
            <Avatar initials={currentUser.avatar} color={currentUser.avatarColor} size={36} />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</p>
              <p style={{ fontSize: 11, color: '#64748b' }}>{currentUser.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: collapsed ? '10px 0' : '10px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#94a3b8', borderRadius: 8, fontSize: 14, fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'none'; }}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute', top: 20, right: -12,
          width: 24, height: 24,
          background: '#1e293b', border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#94a3b8',
          transition: 'all 0.2s',
          zIndex: 10,
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}

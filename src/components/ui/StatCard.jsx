import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = '#0ea5e9', trend, className = '' }) {
  return (
    <div className={`stat-card ${className}`} style={{ '--card-color': color }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            {title}
          </p>
          <p style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {value}
          </p>
          {subtitle && (
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>{subtitle}</p>
          )}
          {trend && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: trend > 0 ? '#10b981' : '#ef4444' }}>
                {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div style={{
            width: 52, height: 52,
            background: `linear-gradient(135deg, ${color}18, ${color}30)`,
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${color}25`,
          }}>
            <Icon size={24} color={color} />
          </div>
        )}
      </div>
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100,
        borderRadius: '50%',
        background: color,
        opacity: 0.04,
      }} />
    </div>
  );
}

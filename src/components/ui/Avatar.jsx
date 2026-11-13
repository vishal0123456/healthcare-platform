import React from 'react';

export default function Avatar({ initials, color = '#0ea5e9', size = 40, className = '' }) {
  const fontSize = size < 32 ? 11 : size < 48 ? 14 : 18;
  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `2px solid ${color}44`,
        color: color,
        fontSize,
      }}
    >
      {initials}
    </div>
  );
}

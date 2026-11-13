import React from 'react';

const colorMap = {
  Active: 'badge-green',
  Completed: 'badge-green',
  Normal: 'badge-green',
  Available: 'badge-green',
  Recovered: 'badge-blue',
  Scheduled: 'badge-blue',
  Confirmed: 'badge-blue',
  Borderline: 'badge-yellow',
  Elevated: 'badge-yellow',
  Ongoing: 'badge-yellow',
  Busy: 'badge-yellow',
  Critical: 'badge-red',
  Abnormal: 'badge-red',
  Emergency: 'badge-red',
  High: 'badge-red',
  Low: 'badge-orange',
  'On Leave': 'badge-orange',
  Controlled: 'badge-cyan',
  Resolved: 'badge-cyan',
  Admin: 'badge-purple',
  Doctor: 'badge-blue',
  Patient: 'badge-green',
  Nutritionist: 'badge-yellow',
  'Yoga Instructor': 'badge-cyan',
};

export default function Badge({ label, className = '' }) {
  const cls = colorMap[label] || 'badge-blue';
  return <span className={`badge ${cls} ${className}`}>{label}</span>;
}

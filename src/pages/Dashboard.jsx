import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Calendar, FileText, Stethoscope, Apple, Activity,
  Heart, TrendingUp, AlertCircle, ArrowUpRight, Clock
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import {
  dashboardStats, appointmentTrend, patientsByCondition,
  weeklyActivity, recentActivities
} from '../data/dashboard';
import { appointments } from '../data/consultations';
import { patients, doctors } from '../data/patients';

const COLORS = ['#0ea5e9', '#6366f1', '#ef4444', '#f59e0b', '#8b5cf6', '#10b981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ fontSize: 13, color: p.color, fontWeight: 600 }}>
            {p.name}: <span style={{ color: '#0f172a' }}>{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { currentUser } = useAuth();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const criticalPatients = patients.filter(p => p.status === 'Critical');

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`${greeting()}, ${currentUser?.name?.split(' ')[0]} 👋  •  ${today}`}
    >

      {/* Critical alert banner */}
      {criticalPatients.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #fef2f2, #fff5f5)',
          border: '1px solid #fecaca',
          borderLeft: '4px solid #ef4444',
          borderRadius: 12,
          padding: '14px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#b91c1c' }}>
              🚨 {criticalPatients.length} Critical Patient{criticalPatients.length > 1 ? 's' : ''} Require Immediate Attention
            </p>
            <p style={{ fontSize: 13, color: '#dc2626', marginTop: 2 }}>
              {criticalPatients.map(p => p.name).join(', ')} — admitted to CCU
            </p>
          </div>
          <Link to="/patients" style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            View Patient <ArrowUpRight size={14} />
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: 18, marginBottom: 24 }}>
        <StatCard title="Total Patients" value={dashboardStats.totalPatients} subtitle={`${dashboardStats.activePatients} active now`} icon={Users} color="#0ea5e9" trend={8} />
        <StatCard title="Today's Appointments" value={dashboardStats.todayAppointments} subtitle="3 pending confirmation" icon={Calendar} color="#6366f1" trend={5} />
        <StatCard title="Total Consultations" value={dashboardStats.completedConsultations.toLocaleString()} subtitle="All time completed" icon={Stethoscope} color="#10b981" trend={12} />
        <StatCard title="Pending Reports" value={dashboardStats.pendingReports} subtitle="Needs review" icon={FileText} color="#f59e0b" />
        <StatCard title="Active Doctors" value={dashboardStats.activeDoctors} subtitle="4 specializations" icon={Heart} color="#ec4899" />
        <StatCard title="Nutrition Plans" value={dashboardStats.nutritionPlans} subtitle="Active plans" icon={Apple} color="#8b5cf6" trend={3} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Area chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Appointments & Consultations</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>7-month performance trend</p>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#0ea5e9' }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Appointments</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#6366f1' }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Consultations</span>
              </div>
              <span className="badge badge-green" style={{ fontSize: 11 }}>↑ 12% growth</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={appointmentTrend} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gAppt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gConsult" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="appointments" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#gAppt)" name="Appointments" dot={false} activeDot={{ r: 5, fill: '#0ea5e9' }} />
              <Area type="monotone" dataKey="consultations" stroke="#6366f1" strokeWidth={2.5} fill="url(#gConsult)" name="Consultations" dot={false} activeDot={{ r: 5, fill: '#6366f1' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Patients by Condition</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2, marginBottom: 12 }}>Current distribution</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie
                data={patientsByCondition}
                cx="50%" cy="50%"
                innerRadius={48} outerRadius={72}
                paddingAngle={4} dataKey="count"
                strokeWidth={0}
              >
                {patientsByCondition.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v, n, p) => [v + ' patients', p.payload.condition]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 'auto' }}>
            {patientsByCondition.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.condition}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Weekly bar chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Weekly Activity</h3>
            <Activity size={16} color="var(--text-muted)" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyActivity} barSize={9} margin={{ left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="patients" fill="#0ea5e9" radius={[3, 3, 0, 0]} name="Patients" />
              <Bar dataKey="consultations" fill="#6366f1" radius={[3, 3, 0, 0]} name="Consultations" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            {[{ c: '#0ea5e9', l: 'Patients' }, { c: '#6366f1', l: 'Consultations' }].map(x => (
              <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: x.c }} />
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Upcoming Appointments</h3>
            <Link to="/consultations" style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {appointments.slice(0, 4).map(apt => (
              <div key={apt.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                background: 'var(--surface-2)',
                borderRadius: 10,
                border: '1px solid var(--border)',
                transition: 'background 0.15s',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={15} color="#0ea5e9" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{apt.patient}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    <Clock size={10} /> {apt.time} · {apt.date}
                  </div>
                </div>
                <Badge label={apt.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity feed */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Live Activity Feed</h3>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)', animation: 'pulse 2s infinite' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentActivities.slice(0, 6).map((act, i) => (
              <div key={act.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: i < 5 ? 12 : 0, borderBottom: i < 5 ? '1px solid #f8fafc' : 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${act.color}18`, border: `1px solid ${act.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: act.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.45 }}>{act.text}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Doctors overview */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Medical Team</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Active doctors and their current status</p>
          </div>
          <Link to="/patients" style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            View All <ArrowUpRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {doctors.map(doc => (
            <div key={doc.id} style={{
              padding: 16, borderRadius: 12,
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 14,
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#bae6fd'; e.currentTarget.style.background = '#f0f9ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
            >
              <Avatar initials={doc.avatar} color={doc.avatarColor} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>{doc.specialization}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <Badge label={doc.status} />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{doc.patients} patients</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#f59e0b' }}>★ {doc.rating}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{doc.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

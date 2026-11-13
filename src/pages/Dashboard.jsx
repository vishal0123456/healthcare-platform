import React from 'react';
import { Users, Calendar, FileText, Stethoscope, Apple, Activity, TrendingUp, AlertTriangle, Heart, UserPlus } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { dashboardStats, appointmentTrend, patientsByCondition, weeklyActivity, recentActivities } from '../data/dashboard';
import { appointments } from '../data/consultations';
import { patients } from '../data/patients';

const COLORS = ['#0ea5e9', '#6366f1', '#ef4444', '#f59e0b', '#8b5cf6', '#10b981'];

export default function Dashboard() {
  const { currentUser } = useAuth();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <DashboardLayout title="Dashboard" subtitle={`${greeting()}, ${currentUser?.name?.split(' ')[0]} 👋`}>
      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
        <StatCard title="Total Patients" value={dashboardStats.totalPatients} subtitle={`${dashboardStats.activePatients} active`} icon={Users} color="#0ea5e9" trend={8} />
        <StatCard title="Today's Appointments" value={dashboardStats.todayAppointments} subtitle="3 pending confirmation" icon={Calendar} color="#6366f1" trend={5} />
        <StatCard title="Consultations" value={dashboardStats.completedConsultations.toLocaleString()} subtitle="All time completed" icon={Stethoscope} color="#10b981" trend={12} />
        <StatCard title="Pending Reports" value={dashboardStats.pendingReports} subtitle="Needs review" icon={FileText} color="#f59e0b" />
        <StatCard title="Active Doctors" value={dashboardStats.activeDoctors} subtitle="4 specializations" icon={Heart} color="#ec4899" />
        <StatCard title="Nutrition Plans" value={dashboardStats.nutritionPlans} subtitle="Active plans" icon={Apple} color="#8b5cf6" trend={3} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Area chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Appointments & Consultations</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Last 7 months trend</p>
            </div>
            <span className="badge badge-green">↑ 12% growth</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={appointmentTrend}>
              <defs>
                <linearGradient id="colorAppt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConsult" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} />
              <Area type="monotone" dataKey="appointments" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#colorAppt)" name="Appointments" />
              <Area type="monotone" dataKey="consultations" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorConsult)" name="Consultations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Patients by Condition</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Distribution overview</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={patientsByCondition} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="count">
                {patientsByCondition.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} formatter={(v, n, p) => [v, p.payload.condition]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {patientsByCondition.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length] }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.condition}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {/* Weekly bar chart */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyActivity} barSize={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Bar dataKey="patients" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Patients" />
              <Bar dataKey="consultations" fill="#6366f1" radius={[4, 4, 0, 0]} name="Consultations" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming appointments */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Upcoming Appointments</h3>
            <span style={{ fontSize: 12, color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>View all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {appointments.slice(0, 4).map(apt => (
              <div key={apt.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--surface-2)', borderRadius: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={16} color="#0ea5e9" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{apt.patient}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{apt.date} · {apt.time}</p>
                </div>
                <Badge label={apt.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentActivities.slice(0, 5).map(act => (
              <div key={act.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${act.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: act.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.4 }}>{act.text}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

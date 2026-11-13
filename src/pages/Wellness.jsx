import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp, TrendingDown, Calendar, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import { yogaPrograms, wellnessStats } from '../data/wellness';

export default function Wellness() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState('YG001');

  const filtered = yogaPrograms.filter(y =>
    y.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Yoga & Wellness" subtitle="Holistic wellness programs, yoga sessions and progress tracking">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Programs', value: wellnessStats.totalPrograms, color: '#0ea5e9' },
          { label: 'Participants', value: wellnessStats.activeParticipants, color: '#6366f1' },
          { label: 'Avg Adherence', value: `${wellnessStats.avgAdherence}%`, color: '#10b981' },
          { label: 'Sessions/Month', value: wellnessStats.sessionsThisMonth, color: '#f59e0b' },
          { label: 'Stress ↓', value: wellnessStats.stressReduction, color: '#ec4899' },
          { label: 'BP ↓', value: wellnessStats.bpImprovement, color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px 16px', textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." />
        <button className="btn btn-primary btn-sm"><Activity size={14} /> New Program</button>
      </div>

      {/* Yoga program cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(program => {
          const isExpanded = expandedId === program.id;

          return (
            <div key={program.id} className="card" style={{ overflow: 'hidden' }}>
              {/* Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : program.id)}
                style={{ padding: '20px 24px', cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Avatar initials={program.patientAvatar} color={program.patientAvatarColor} size={52} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{program.patientName}</h3>
                    <p style={{ fontSize: 14, color: '#6366f1', fontWeight: 600 }}>{program.program}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Instructor: {program.instructor} · {program.level} · {program.frequency}</p>
                  </div>

                  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 20, fontWeight: 800, color: '#0ea5e9' }}>{program.completedSessions}/{program.totalSessions}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>SESSIONS</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 20, fontWeight: 800, color: '#10b981' }}>{program.progress}%</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>PROGRESS</p>
                    </div>
                    <Badge label={program.status} />
                    {isExpanded ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 14 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${program.progress}%`, background: 'linear-gradient(90deg, #6366f1, #0ea5e9)' }} />
                  </div>
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: 24 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}>
                    {/* Asanas list */}
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Yoga Asanas</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {program.asanas.map((a, i) => (
                          <div key={i} style={{ padding: '12px 14px', background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', borderRadius: 10, border: '1px solid #bae6fd' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                              <span style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</span>
                              <span className="badge badge-blue" style={{ fontSize: 11 }}>{a.duration}</span>
                            </div>
                            <p style={{ fontSize: 12, color: '#0369a1' }}>{a.benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Health metrics chart */}
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Health Metrics Progress</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={program.healthMetrics}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: 12 }} />
                          <Line type="monotone" dataKey="weight" stroke="#0ea5e9" strokeWidth={2.5} dot={{ fill: '#0ea5e9', r: 4 }} name="Weight (kg)" />
                          <Line type="monotone" dataKey="stressScore" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 4 }} name="Stress Score" />
                        </LineChart>
                      </ResponsiveContainer>

                      {/* Weekly sessions bar chart */}
                      <h4 style={{ fontSize: 15, fontWeight: 700, margin: '20px 0 12px' }}>Weekly Sessions</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={program.weeklyLog} barSize={20}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                          <YAxis hide />
                          <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 12 }} />
                          <Bar dataKey="sessions" fill="#6366f1" radius={[4, 4, 0, 0]} name="Sessions" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Focus areas */}
                  <div style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Focus Areas</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {program.focusAreas.map(f => <span key={f} className="badge badge-purple">{f}</span>)}
                    </div>
                  </div>

                  {/* Info row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
                    {[
                      { label: 'Session Duration', value: program.duration },
                      { label: 'Frequency', value: program.frequency },
                      { label: 'Start Date', value: program.startDate },
                      { label: 'Next Session', value: program.nextSession },
                    ].map(i => (
                      <div key={i.label} style={{ padding: 12, background: 'var(--surface-2)', borderRadius: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{i.label}</p>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{i.value}</p>
                      </div>
                    ))}
                  </div>

                  {program.notes && (
                    <div style={{ padding: 14, background: '#fdf4ff', borderRadius: 10, borderLeft: '4px solid #a855f7' }}>
                      <p style={{ fontSize: 13, color: '#6b21a8' }}><span style={{ fontWeight: 700 }}>🧘 Instructor Note:</span> {program.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

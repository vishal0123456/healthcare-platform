import React, { useState } from 'react';
import { Apple, Target, Droplets, ChevronDown, ChevronUp, Calendar, User } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import { nutritionPlans } from '../data/nutrition';

const days = ['Monday', 'Tuesday', 'Wednesday'];

export default function Nutrition() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState('NUT001');
  const [selectedDay, setSelectedDay] = useState('Monday');

  const filtered = nutritionPlans.filter(n =>
    n.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Nutrition Plans" subtitle="Personalized diet and nutritional management for patients">
      {/* Overview stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Plans', value: nutritionPlans.length, color: '#10b981' },
          { label: 'Active Plans', value: nutritionPlans.filter(n => n.status === 'Active').length, color: '#0ea5e9' },
          { label: 'Avg Adherence', value: `${Math.round(nutritionPlans.reduce((a, b) => a + b.adherence, 0) / nutritionPlans.length)}%`, color: '#6366f1' },
          { label: 'Nutritionists', value: 3, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${s.color}` }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." />
        <button className="btn btn-primary btn-sm"><Apple size={14} /> Create Plan</button>
      </div>

      {/* Plan cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(plan => {
          const isExpanded = expandedId === plan.id;
          const macros = [
            { name: 'Protein', value: parseInt(plan.protein), fill: '#6366f1' },
            { name: 'Carbs', value: parseInt(plan.carbs), fill: '#0ea5e9' },
            { name: 'Fat', value: parseInt(plan.fat), fill: '#f59e0b' },
          ];

          return (
            <div key={plan.id} className="card" style={{ overflow: 'hidden' }}>
              {/* Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : plan.id)}
                style={{ padding: '20px 24px', cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Avatar initials={plan.patientAvatar} color={plan.patientAvatarColor} size={52} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{plan.patientName}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{plan.condition} · By {plan.nutritionist}</p>
                    <p style={{ fontSize: 13, color: '#10b981', fontWeight: 600, marginTop: 2 }}>{plan.goal}</p>
                  </div>

                  {/* Quick stats */}
                  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 20, fontWeight: 800, color: '#ef4444' }}>{plan.calories}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>KCAL/DAY</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 20, fontWeight: 800, color: '#0ea5e9' }}>{plan.adherence}%</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>ADHERENCE</p>
                    </div>
                    <Badge label={plan.status} />
                    {isExpanded ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </div>
                </div>

                {/* Adherence bar */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Plan adherence</span>
                    <span style={{ color: plan.adherence >= 80 ? '#10b981' : plan.adherence >= 60 ? '#f59e0b' : '#ef4444', fontWeight: 700 }}>{plan.adherence}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${plan.adherence}%`, background: plan.adherence >= 80 ? '#10b981' : plan.adherence >= 60 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: 24 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 28, marginBottom: 28 }}>
                    {/* Macro overview */}
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Daily Macros</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                          { name: 'Protein', value: plan.protein, color: '#6366f1' },
                          { name: 'Carbohydrates', value: plan.carbs, color: '#0ea5e9' },
                          { name: 'Fats', value: plan.fat, color: '#f59e0b' },
                          { name: 'Fiber', value: plan.fiber, color: '#10b981' },
                          { name: 'Water', value: plan.water, color: '#06b6d4' },
                        ].map(m => (
                          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 13, color: 'var(--text-secondary)', width: 110, flexShrink: 0 }}>{m.name}</span>
                            <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3 }}>
                              <div style={{ height: '100%', background: m.color, borderRadius: 3, width: `${Math.min(parseInt(m.value) / 3, 100)}%` }} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: m.color, minWidth: 42, textAlign: 'right' }}>{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meal plan for selected day */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h4 style={{ fontSize: 15, fontWeight: 700 }}>Weekly Meal Plan</h4>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {Object.keys(plan.weeklyPlan).map(day => (
                            <button key={day} onClick={() => setSelectedDay(day)}
                              className={`btn btn-sm ${selectedDay === day ? 'btn-primary' : 'btn-secondary'}`}
                              style={{ padding: '4px 10px', fontSize: 12 }}>
                              {day.slice(0, 3)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {plan.weeklyPlan[selectedDay] ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {Object.entries(plan.weeklyPlan[selectedDay]).map(([meal, food]) => (
                            <div key={meal} style={{ padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 10, display: 'flex', gap: 12 }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: '#0ea5e9', width: 100, flexShrink: 0, textTransform: 'capitalize' }}>{meal.replace(/([A-Z])/g, ' $1')}</span>
                              <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{food}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No plan for this day yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Restrictions & Supplements */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>⚠️ Dietary Restrictions</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {plan.restrictions.map(r => <span key={r} className="badge badge-red">{r}</span>)}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>💊 Supplements</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {plan.supplements.map(s => <span key={s} style={{ fontSize: 13, color: 'var(--text-secondary)' }}>• {s}</span>)}
                      </div>
                    </div>
                  </div>

                  {plan.notes && (
                    <div style={{ marginTop: 20, padding: 14, background: '#f0fdf4', borderRadius: 10, borderLeft: '4px solid #10b981' }}>
                      <p style={{ fontSize: 13, color: '#065f46' }}><span style={{ fontWeight: 700 }}>📝 Nutritionist Note:</span> {plan.notes}</p>
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

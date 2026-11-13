import React, { useState } from 'react';
import { Activity, Pill, Syringe, FlaskConical, Scissors, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import { medicalHistory } from '../data/medicalHistory';
import { patients } from '../data/patients';

const TABS = ['Conditions', 'Medications', 'Vaccinations', 'Lab Results', 'Surgeries'];

const severityStyle = {
  Severe: 'badge-red',
  High: 'badge-red',
  Moderate: 'badge-yellow',
  Mild: 'badge-green',
  Controlled: 'badge-cyan',
};

export default function MedicalHistory() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState('MH001');
  const [activeTab, setActiveTab] = useState('Conditions');

  const filtered = medicalHistory.filter(mh =>
    mh.patientName.toLowerCase().includes(search.toLowerCase()) ||
    mh.patientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Medical History" subtitle="Comprehensive patient health records and clinical history">

      {/* Overview stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Records', value: medicalHistory.length, color: '#0ea5e9', bg: '#f0f9ff' },
          { label: 'Total Conditions', value: medicalHistory.reduce((a, m) => a + m.conditions.length, 0), color: '#6366f1', bg: '#f5f3ff' },
          { label: 'Active Medications', value: medicalHistory.reduce((a, m) => a + m.medications.length, 0), color: '#10b981', bg: '#f0fdf4' },
          { label: 'Lab Tests Done', value: medicalHistory.reduce((a, m) => a + m.labResults.length, 0), color: '#f59e0b', bg: '#fffbeb' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '18px 20px', background: s.bg }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
            <p style={{ fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1.1, marginTop: 4 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by patient name or ID..." />
        <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Record</button>
      </div>

      {/* Records */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(mh => {
          const patient = patients.find(p => p.id === mh.patientId);
          const isExpanded = expandedId === mh.id;

          return (
            <div key={mh.id} className="card" style={{ overflow: 'hidden' }}>
              {/* Accordion header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : mh.id)}
                style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', userSelect: 'none' }}
              >
                <Avatar initials={patient?.avatar} color={patient?.avatarColor} size={50} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{mh.patientName}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                    ID: {mh.patientId} · {mh.conditions.length} condition{mh.conditions.length !== 1 ? 's' : ''} · {mh.medications.length} medication{mh.medications.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Condition tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 360 }}>
                  {mh.conditions.slice(0, 2).map(c => (
                    <span key={c.name} className={`badge ${severityStyle[c.severity] || 'badge-blue'}`} style={{ fontSize: 11 }}>
                      {c.name}
                    </span>
                  ))}
                  {mh.conditions.length > 2 && (
                    <span className="badge badge-blue" style={{ fontSize: 11 }}>+{mh.conditions.length - 2} more</span>
                  )}
                </div>

                <div style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: 24 }}>
                  <div className="tabs" style={{ marginBottom: 24, maxWidth: 600 }}>
                    {TABS.map(tab => (
                      <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Conditions */}
                  {activeTab === 'Conditions' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 14 }}>
                      {mh.conditions.map(c => (
                        <div key={c.name} style={{ padding: 16, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Activity size={15} color="#0ea5e9" />
                              <span style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</span>
                            </div>
                            <Badge label={c.status} />
                          </div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagnosed: {c.diagnosedDate}</span>
                            <span className={`badge ${severityStyle[c.severity] || 'badge-blue'}`} style={{ fontSize: 11 }}>{c.severity}</span>
                          </div>
                        </div>
                      ))}
                      {mh.conditions.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No conditions on record.</p>}
                    </div>
                  )}

                  {/* Medications */}
                  {activeTab === 'Medications' && (
                    <div className="table-container">
                      <table>
                        <thead><tr><th>Medication</th><th>Frequency</th><th>Since</th><th>Prescribed By</th></tr></thead>
                        <tbody>
                          {mh.medications.map((m, i) => (
                            <tr key={i}>
                              <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Pill size={14} color="#6366f1" /><span style={{ fontWeight: 600 }}>{m.name}</span></div></td>
                              <td style={{ color: 'var(--text-secondary)' }}>{m.frequency}</td>
                              <td>{m.since}</td>
                              <td style={{ color: 'var(--text-secondary)' }}>{m.prescribedBy}</td>
                            </tr>
                          ))}
                          {mh.medications.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No medications on record.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Vaccinations */}
                  {activeTab === 'Vaccinations' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 14 }}>
                      {mh.vaccinations.map((v, i) => (
                        <div key={i} style={{ padding: 16, borderRadius: 12, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Syringe size={15} color="#10b981" />
                            <span style={{ fontWeight: 700, fontSize: 14 }}>{v.name}</span>
                          </div>
                          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Administered: {v.date}</p>
                          <p style={{ fontSize: 12, marginTop: 4, fontWeight: 600, color: v.nextDue ? '#059669' : '#94a3b8' }}>
                            {v.nextDue ? `Next due: ${v.nextDue}` : 'No booster required'}
                          </p>
                        </div>
                      ))}
                      {mh.vaccinations.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No vaccination records.</p>}
                    </div>
                  )}

                  {/* Lab Results */}
                  {activeTab === 'Lab Results' && (
                    <div className="table-container">
                      <table>
                        <thead><tr><th>Test</th><th>Value</th><th>Normal Range</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                          {mh.labResults.map((l, i) => (
                            <tr key={i}>
                              <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FlaskConical size={13} color="#6366f1" /><span style={{ fontWeight: 600 }}>{l.test}</span></div></td>
                              <td style={{ fontWeight: 800, fontSize: 15, color: l.status === 'Normal' ? '#10b981' : '#ef4444' }}>{l.value}</td>
                              <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{l.range}</td>
                              <td>{l.date}</td>
                              <td><Badge label={l.status === 'Elevated' || l.status === 'High' || l.status === 'Abnormal' ? 'Elevated' : l.status} /></td>
                            </tr>
                          ))}
                          {mh.labResults.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No lab results on record.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Surgeries */}
                  {activeTab === 'Surgeries' && (
                    mh.surgeries.length === 0 ? (
                      <div className="empty-state"><Scissors size={36} /><h4>No surgical history</h4><p>No procedures on record for this patient.</p></div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {mh.surgeries.map((s, i) => (
                          <div key={i} style={{ padding: 16, borderRadius: 12, background: '#fff7ed', border: '1px solid #fed7aa' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                              <Scissors size={15} color="#f59e0b" />
                              <span style={{ fontWeight: 700, fontSize: 15 }}>{s.procedure}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
                              <div><span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Date:</span> {s.date}</div>
                              <div><span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Hospital:</span> {s.hospital}</div>
                              <div><span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Surgeon:</span> {s.surgeon}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="empty-state"><Activity size={40} /><h4>No records found</h4><p>Try adjusting your search</p></div>
        )}
      </div>
    </DashboardLayout>
  );
}

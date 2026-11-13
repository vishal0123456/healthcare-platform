import React, { useState } from 'react';
import { Activity, Pill, Syringe, FlaskConical, Scissors, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import { medicalHistory } from '../data/medicalHistory';
import { patients } from '../data/patients';

export default function MedicalHistory() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState('MH001');
  const [activeTab, setActiveTab] = useState('conditions');

  const filtered = medicalHistory.filter(mh =>
    mh.patientName.toLowerCase().includes(search.toLowerCase()) || mh.patientId.includes(search)
  );

  return (
    <DashboardLayout title="Medical History" subtitle="Comprehensive patient health records and clinical history">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." />
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{filtered.length} records found</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(mh => {
          const patient = patients.find(p => p.id === mh.patientId);
          const isExpanded = expandedId === mh.id;

          return (
            <div key={mh.id} className="card" style={{ overflow: 'hidden' }}>
              {/* Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : mh.id)}
                style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', userSelect: 'none' }}
              >
                <Avatar initials={patient?.avatar} color={patient?.avatarColor} size={48} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{mh.patientName}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>ID: {mh.patientId} · {mh.conditions.length} conditions · {mh.medications.length} medications</p>
                </div>

                {/* Condition tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 2 }}>
                  {mh.conditions.slice(0, 2).map(c => (
                    <span key={c.name} className={`badge ${c.severity === 'Severe' || c.severity === 'High' ? 'badge-red' : c.severity === 'Moderate' ? 'badge-yellow' : 'badge-green'}`}>
                      {c.name}
                    </span>
                  ))}
                  {mh.conditions.length > 2 && <span className="badge badge-blue">+{mh.conditions.length - 2} more</span>}
                </div>

                <div style={{ color: 'var(--text-muted)' }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '24px' }}>
                  {/* Tabs */}
                  <div className="tabs" style={{ marginBottom: 24, maxWidth: 580 }}>
                    {['conditions', 'medications', 'vaccinations', 'lab results', 'surgeries'].map(tab => (
                      <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)} style={{ textTransform: 'capitalize' }}>
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Conditions */}
                  {activeTab === 'conditions' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                      {mh.conditions.map(c => (
                        <div key={c.name} style={{ padding: 16, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Activity size={16} color="#0ea5e9" />
                              <span style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</span>
                            </div>
                            <Badge label={c.status} />
                          </div>
                          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
                            <span>Diagnosed: {c.diagnosedDate}</span>
                            <span className={`badge badge-${c.severity === 'Severe' || c.severity === 'High' ? 'red' : c.severity === 'Moderate' ? 'yellow' : 'green'}`} style={{ fontSize: 11 }}>{c.severity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Medications */}
                  {activeTab === 'medications' && (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr><th>Medication</th><th>Frequency</th><th>Since</th><th>Prescribed By</th></tr>
                        </thead>
                        <tbody>
                          {mh.medications.map((m, i) => (
                            <tr key={i}>
                              <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Pill size={14} color="#6366f1" /><span style={{ fontWeight: 500 }}>{m.name}</span></div></td>
                              <td>{m.frequency}</td>
                              <td>{m.since}</td>
                              <td>{m.prescribedBy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Vaccinations */}
                  {activeTab === 'vaccinations' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                      {mh.vaccinations.map((v, i) => (
                        <div key={i} style={{ padding: 16, borderRadius: 12, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Syringe size={16} color="#10b981" />
                            <span style={{ fontWeight: 700, fontSize: 14 }}>{v.name}</span>
                          </div>
                          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Date: {v.date}</p>
                          {v.nextDue && <p style={{ fontSize: 12, color: '#059669', marginTop: 4 }}>Next due: {v.nextDue}</p>}
                          {!v.nextDue && <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>No booster required</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Lab Results */}
                  {activeTab === 'lab results' && (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr><th>Test</th><th>Value</th><th>Normal Range</th><th>Date</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                          {mh.labResults.map((l, i) => (
                            <tr key={i}>
                              <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FlaskConical size={14} color="#6366f1" /><span style={{ fontWeight: 500 }}>{l.test}</span></div></td>
                              <td style={{ fontWeight: 700 }}>{l.value}</td>
                              <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{l.range}</td>
                              <td>{l.date}</td>
                              <td><Badge label={l.status === 'Elevated' || l.status === 'High' || l.status === 'Abnormal' ? 'Elevated' : l.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Surgeries */}
                  {activeTab === 'surgeries' && (
                    mh.surgeries.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        <Scissors size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
                        <p>No surgical history on record</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {mh.surgeries.map((s, i) => (
                          <div key={i} style={{ padding: 16, borderRadius: 12, background: '#fff7ed', border: '1px solid #fed7aa' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <Scissors size={16} color="#f59e0b" />
                              <span style={{ fontWeight: 700, fontSize: 15 }}>{s.procedure}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
                              <span>Date: {s.date}</span>
                              <span>Hospital: {s.hospital}</span>
                              <span>Surgeon: {s.surgeon}</span>
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
      </div>
    </DashboardLayout>
  );
}

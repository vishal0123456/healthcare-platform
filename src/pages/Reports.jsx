import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, FlaskConical, Camera, Heart, Activity, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import { reports } from '../data/reports';
import { patients } from '../data/patients';

const typeConfig = {
  'Blood Test': { icon: FlaskConical, color: '#0ea5e9', bg: '#e0f2fe' },
  Imaging: { icon: Camera, color: '#6366f1', bg: '#ede9fe' },
  Cardiac: { icon: Heart, color: '#ef4444', bg: '#fee2e2' },
  Hormonal: { icon: Activity, color: '#f59e0b', bg: '#fef3c7' },
  Orthopedic: { icon: Activity, color: '#10b981', bg: '#d1fae5' },
};

const statusStyle = {
  Normal: { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', icon: CheckCircle },
  Borderline: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', icon: AlertTriangle },
  Abnormal: { bg: '#fef2f2', border: '#fecaca', color: '#b91c1c', icon: AlertTriangle },
};

export default function Reports() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = reports.filter(r => {
    const matchSearch = r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.lab.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || r.type === typeFilter;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const viewReport = (r) => { setSelectedReport(r); setShowModal(true); };

  return (
    <DashboardLayout title="Medical Reports" subtitle="Upload, manage and review patient diagnostic reports">

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Reports', value: reports.length, color: '#0ea5e9', border: '#bae6fd', bg: '#f0f9ff' },
          { label: 'Normal', value: reports.filter(r => r.status === 'Normal').length, color: '#10b981', border: '#bbf7d0', bg: '#f0fdf4' },
          { label: 'Borderline', value: reports.filter(r => r.status === 'Borderline').length, color: '#f59e0b', border: '#fde68a', bg: '#fffbeb' },
          { label: 'Abnormal', value: reports.filter(r => r.status === 'Abnormal').length, color: '#ef4444', border: '#fecaca', bg: '#fef2f2' },
        ].map(s => (
          <div key={s.label} className="card hover-lift" style={{ padding: '18px 20px', background: s.bg, border: `1px solid ${s.border}`, cursor: 'pointer' }}
            onClick={() => setStatusFilter(s.label === 'Total Reports' ? 'All' : s.label)}
          >
            <p style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
            <p style={{ fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1.1, marginTop: 4 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by patient, title, or lab..." />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select className="form-input form-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">All Types</option>
            {['Blood Test', 'Imaging', 'Cardiac', 'Hormonal', 'Orthopedic'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="form-input form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">All Statuses</option>
            {['Normal', 'Borderline', 'Abnormal'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-primary btn-sm"><Upload size={14} /> Upload Report</button>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Showing <strong>{filtered.length}</strong> of {reports.length} reports
      </p>

      {/* Report cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px,1fr))', gap: 20 }}>
        {filtered.map(report => {
          const tc = typeConfig[report.type] || typeConfig['Blood Test'];
          const ss = statusStyle[report.status] || statusStyle.Normal;
          const Icon = tc.icon;
          const StatusIcon = ss.icon;
          const patient = patients.find(p => p.id === report.patientId);

          return (
            <div key={report.id} className="card hover-lift" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: tc.bg, border: `1px solid ${tc.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color={tc.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: tc.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{report.type}</p>
                    <h4 style={{ fontSize: 14, fontWeight: 700, marginTop: 2, lineHeight: 1.3 }}>{report.title}</h4>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: ss.bg, border: `1px solid ${ss.border}`, fontSize: 12, fontWeight: 700, color: ss.color, flexShrink: 0 }}>
                  <StatusIcon size={12} />
                  {report.status}
                </div>
              </div>

              {/* Patient row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 10 }}>
                <Avatar initials={patient?.avatar} color={patient?.avatarColor} size={32} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>{report.patientName}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{report.patientId}</p>
                </div>
              </div>

              {/* Meta grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                {[
                  ['Date', report.date],
                  ['Lab', report.lab],
                  ['By', report.uploadedBy.replace('Dr. ', 'Dr.')],
                  ['File', `${report.format} · ${report.fileSize}`],
                ].map(([k, v]) => (
                  <div key={k}><span style={{ fontWeight: 600 }}>{k}:</span> {v}</div>
                ))}
              </div>

              {/* Findings */}
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'var(--surface-2)', padding: '10px 12px', borderRadius: 8, lineHeight: 1.55, borderLeft: `3px solid ${tc.color}`, margin: 0 }}>
                {report.findings}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <button onClick={() => viewReport(report)} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <Eye size={13} /> View Full Report
                </button>
                <button className="btn btn-secondary btn-sm" aria-label="Download"><Download size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state"><FileText size={40} /><h4>No reports found</h4><p>Try adjusting your filters</p></div>
      )}

      {/* Detail modal */}
      {selectedReport && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedReport.title} size="lg">
          {(() => {
            const ss = statusStyle[selectedReport.status] || statusStyle.Normal;
            const StatusIcon = ss.icon;
            const tc = typeConfig[selectedReport.type] || typeConfig['Blood Test'];
            return (
              <div>
                {/* Status banner */}
                <div style={{ padding: '14px 16px', borderRadius: 10, marginBottom: 20, background: ss.bg, border: `1px solid ${ss.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <StatusIcon size={18} color={ss.color} style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: ss.color }}>Status: {selectedReport.status}</p>
                    <p style={{ fontSize: 13, marginTop: 4, color: 'var(--text-secondary)' }}>{selectedReport.findings}</p>
                  </div>
                </div>

                {/* Meta info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
                  {[
                    ['Report ID', selectedReport.id],
                    ['Date', selectedReport.date],
                    ['Lab', selectedReport.lab],
                    ['Uploaded By', selectedReport.uploadedBy],
                    ['Format', `${selectedReport.format} (${selectedReport.fileSize})`],
                    ['Patient', selectedReport.patientName],
                  ].map(([label, value]) => (
                    <div key={label} style={{ padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 10 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Parameters table */}
                {selectedReport.parameters.length > 0 && (
                  <>
                    <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FlaskConical size={16} color={tc.color} /> Test Parameters
                    </h4>
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr><th>Parameter</th><th>Value</th><th>Unit</th><th>Reference Range</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                          {selectedReport.parameters.map((p, i) => (
                            <tr key={i}>
                              <td style={{ fontWeight: 600 }}>{p.name}</td>
                              <td style={{ fontWeight: 800, fontSize: 15, color: p.status !== 'Normal' ? '#ef4444' : '#10b981' }}>{p.value}</td>
                              <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{p.unit}</td>
                              <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{p.range}</td>
                              <td><Badge label={p.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {selectedReport.parameters.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '32px', background: 'var(--surface-2)', borderRadius: 12, color: 'var(--text-muted)' }}>
                    <Camera size={32} style={{ opacity: 0.3, marginBottom: 10 }} />
                    <p style={{ fontSize: 14 }}>This is an imaging report. File can be downloaded for review.</p>
                  </div>
                )}
              </div>
            );
          })()}
        </Modal>
      )}
    </DashboardLayout>
  );
}

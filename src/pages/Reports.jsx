import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, Filter, FlaskConical, Camera, Heart, Activity } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import { reports } from '../data/reports';
import { patients } from '../data/patients';

const typeIcons = {
  'Blood Test': FlaskConical,
  Imaging: Camera,
  Cardiac: Heart,
  Hormonal: Activity,
  Orthopedic: Activity,
};
const typeColors = {
  'Blood Test': '#0ea5e9',
  Imaging: '#6366f1',
  Cardiac: '#ef4444',
  Hormonal: '#f59e0b',
  Orthopedic: '#10b981',
};

export default function Reports() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = reports.filter(r => {
    const matchSearch = r.patientName.toLowerCase().includes(search.toLowerCase()) || r.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || r.type === typeFilter;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const viewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const statusBadgeMap = {
    Normal: 'badge-green',
    Borderline: 'badge-yellow',
    Abnormal: 'badge-red',
  };

  return (
    <DashboardLayout title="Medical Reports" subtitle="Upload, manage and review patient diagnostic reports">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Reports', value: reports.length, color: '#0ea5e9' },
          { label: 'Normal', value: reports.filter(r => r.status === 'Normal').length, color: '#10b981' },
          { label: 'Borderline', value: reports.filter(r => r.status === 'Borderline').length, color: '#f59e0b' },
          { label: 'Abnormal', value: reports.filter(r => r.status === 'Abnormal').length, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${s.color}` }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by patient or report type..." />
        <div style={{ display: 'flex', gap: 10 }}>
          <select className="form-input form-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 'auto' }}>
            <option>All</option>
            <option>Blood Test</option>
            <option>Imaging</option>
            <option>Cardiac</option>
            <option>Hormonal</option>
            <option>Orthopedic</option>
          </select>
          <select className="form-input form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
            <option>All</option>
            <option>Normal</option>
            <option>Borderline</option>
            <option>Abnormal</option>
          </select>
          <button className="btn btn-primary btn-sm"><Upload size={15} /> Upload Report</button>
        </div>
      </div>

      {/* Reports grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {filtered.map(report => {
          const Icon = typeIcons[report.type] || FileText;
          const color = typeColors[report.type] || '#0ea5e9';
          const patient = patients.find(p => p.id === report.patientId);

          return (
            <div key={report.id} className="card" style={{ padding: 20 }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{report.type}</span>
                    <h4 style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{report.title}</h4>
                  </div>
                </div>
                <span className={`badge ${statusBadgeMap[report.status] || 'badge-blue'}`}>{report.status}</span>
              </div>

              {/* Patient info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 8 }}>
                <Avatar initials={patient?.avatar} color={patient?.avatarColor} size={32} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>{report.patientName}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{report.patientId}</p>
                </div>
              </div>

              {/* Meta */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div><span style={{ fontWeight: 600 }}>Date:</span> {report.date}</div>
                <div><span style={{ fontWeight: 600 }}>Lab:</span> {report.lab}</div>
                <div><span style={{ fontWeight: 600 }}>By:</span> {report.uploadedBy}</div>
                <div><span style={{ fontWeight: 600 }}>Format:</span> {report.format} · {report.fileSize}</div>
              </div>

              {/* Findings preview */}
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'var(--surface-2)', padding: '10px 12px', borderRadius: 8, lineHeight: 1.5, marginBottom: 16, borderLeft: `3px solid ${color}` }}>
                {report.findings}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => viewReport(report)} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <Eye size={14} /> View Full Report
                </button>
                <button className="btn btn-secondary btn-sm"><Download size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report detail modal */}
      {selectedReport && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedReport.title} size="lg">
          <div>
            {/* Status banner */}
            <div style={{
              padding: '12px 16px', borderRadius: 10, marginBottom: 20,
              background: selectedReport.status === 'Normal' ? '#f0fdf4' : selectedReport.status === 'Borderline' ? '#fffbeb' : '#fef2f2',
              border: `1px solid ${selectedReport.status === 'Normal' ? '#bbf7d0' : selectedReport.status === 'Borderline' ? '#fde68a' : '#fecaca'}`,
            }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: selectedReport.status === 'Normal' ? '#065f46' : selectedReport.status === 'Borderline' ? '#92400e' : '#991b1b' }}>
                Status: {selectedReport.status}
              </p>
              <p style={{ fontSize: 13, marginTop: 4, color: 'var(--text-secondary)' }}>{selectedReport.findings}</p>
            </div>

            {/* Meta info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Report ID', value: selectedReport.id },
                { label: 'Date', value: selectedReport.date },
                { label: 'Lab', value: selectedReport.lab },
                { label: 'Uploaded By', value: selectedReport.uploadedBy },
                { label: 'Format', value: `${selectedReport.format} (${selectedReport.fileSize})` },
                { label: 'Patient', value: selectedReport.patientName },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Parameters table */}
            {selectedReport.parameters.length > 0 && (
              <>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Test Parameters</h4>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr><th>Parameter</th><th>Value</th><th>Unit</th><th>Reference Range</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {selectedReport.parameters.map((p, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{p.name}</td>
                          <td style={{ fontWeight: 700, color: p.status !== 'Normal' ? '#ef4444' : '#10b981' }}>{p.value}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{p.unit}</td>
                          <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{p.range}</td>
                          <td><Badge label={p.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}

import React, { useState } from 'react';
import { Stethoscope, Video, AlertTriangle, Calendar, Clock, Eye, Pill, Activity, Plus } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import { consultations } from '../data/consultations';

const typeConfig = {
  'In-Person': { color: '#10b981', bg: '#d1fae5', icon: Stethoscope },
  'Video': { color: '#6366f1', bg: '#ede9fe', icon: Video },
  'Emergency': { color: '#ef4444', bg: '#fee2e2', icon: AlertTriangle },
};

export default function Consultations() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedConsult, setSelectedConsult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = consultations.filter(c => {
    const matchSearch = c.patientName.toLowerCase().includes(search.toLowerCase()) ||
      c.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      c.diagnosis.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchType = typeFilter === 'All' || c.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const viewConsult = (c) => { setSelectedConsult(c); setShowModal(true); };

  return (
    <DashboardLayout title="Consultation Records" subtitle="Patient consultations, prescriptions and clinical notes">

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total', value: consultations.length, color: '#0ea5e9', bg: '#f0f9ff' },
          { label: 'Completed', value: consultations.filter(c => c.status === 'Completed').length, color: '#10b981', bg: '#f0fdf4' },
          { label: 'Ongoing', value: consultations.filter(c => c.status === 'Ongoing').length, color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Emergency', value: consultations.filter(c => c.type === 'Emergency').length, color: '#ef4444', bg: '#fef2f2' },
        ].map(s => (
          <div key={s.label} className="card hover-lift" style={{ padding: '18px 20px', background: s.bg, cursor: 'pointer' }}
            onClick={() => setStatusFilter(s.label === 'Total' ? 'All' : s.label)}
          >
            <p style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
            <p style={{ fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1.1, marginTop: 4 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by patient, doctor, or diagnosis..." />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select className="form-input form-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">All Types</option>
            {['In-Person', 'Video', 'Emergency'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="form-input form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">All Statuses</option>
            {['Completed', 'Ongoing'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> New Consultation</button>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Showing <strong>{filtered.length}</strong> of {consultations.length} consultations
      </p>

      {/* Consultation list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(c => {
          const tc = typeConfig[c.type] || typeConfig['In-Person'];
          const TypeIcon = tc.icon;
          return (
            <div key={c.id} className="card hover-lift" style={{ padding: 20, borderLeft: `4px solid ${tc.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                {/* Patient */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 200 }}>
                  <Avatar initials={c.patientAvatar} color={c.patientAvatarColor} size={48} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>{c.patientName}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.patientId}</p>
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {c.doctorName} · {c.specialization}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 3, lineHeight: 1.3 }}>
                    {c.chiefComplaint}
                  </p>
                  <p style={{ fontSize: 13, color: tc.color, fontWeight: 700, marginTop: 3 }}>
                    Dx: {c.diagnosis}
                  </p>
                </div>

                {/* Type, date, duration */}
                <div style={{ textAlign: 'center', minWidth: 120 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: tc.bg, borderRadius: 999, marginBottom: 8 }}>
                    <TypeIcon size={13} color={tc.color} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: tc.color }}>{c.type}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Calendar size={11} /> {c.date}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 2 }}>
                    <Clock size={11} /> {c.time} · {c.duration}
                  </p>
                </div>

                {/* Status + action */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                  <Badge label={c.status} />
                  <button onClick={() => viewConsult(c)} className="btn btn-secondary btn-sm" style={{ gap: 5 }}>
                    <Eye size={13} /> View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state"><Stethoscope size={40} /><h4>No consultations found</h4><p>Try adjusting your search or filters</p></div>
      )}

      {/* Detail modal */}
      {selectedConsult && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Consultation Record" size="lg">
          <div>
            {/* Header */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 24, padding: 18, background: 'var(--surface-2)', borderRadius: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar initials={selectedConsult.patientAvatar} color={selectedConsult.patientAvatarColor} size={56} />
                <div>
                  <p style={{ fontWeight: 800, fontSize: 17 }}>{selectedConsult.patientName}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedConsult.patientId}</p>
                  <Badge label={selectedConsult.status} />
                </div>
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, minWidth: 240 }}>
                {[
                  ['Doctor', selectedConsult.doctorName],
                  ['Date & Time', `${selectedConsult.date} at ${selectedConsult.time}`],
                  ['Duration', selectedConsult.duration],
                  ['Type', selectedConsult.type],
                  ['Specialization', selectedConsult.specialization],
                  ['Follow-up', selectedConsult.followUpDate],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vitals */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Vitals at Visit</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 20 }}>
              {Object.entries(selectedConsult.vitals).map(([key, val]) => (
                <div key={key} className="vital-card">
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', marginBottom: 4 }}>{key}</p>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Diagnosis & complaint */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
              <div style={{ padding: 16, background: '#fffbeb', borderRadius: 10, border: '1px solid #fde68a' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>Chief Complaint</p>
                <p style={{ fontSize: 14 }}>{selectedConsult.chiefComplaint}</p>
              </div>
              <div style={{ padding: 16, background: '#ede9fe', borderRadius: 10, border: '1px solid #ddd6fe' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#5b21b6', textTransform: 'uppercase', marginBottom: 6 }}>Diagnosis</p>
                <p style={{ fontSize: 14, fontWeight: 700 }}>{selectedConsult.diagnosis}</p>
              </div>
            </div>

            {/* Prescription */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Pill size={16} color="#6366f1" /> Prescription
            </h4>
            <div className="table-container" style={{ marginBottom: 20 }}>
              <table>
                <thead>
                  <tr><th>#</th><th>Medicine</th><th>Dose / Frequency</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  {selectedConsult.prescription.map((p, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{i + 1}</td>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Pill size={13} color="#6366f1" /><span style={{ fontWeight: 600 }}>{p.medicine}</span></div></td>
                      <td style={{ color: 'var(--text-secondary)' }}>{p.dose}</td>
                      <td><span className="badge badge-blue">{p.duration}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={16} color="#0ea5e9" /> Doctor's Clinical Notes
            </h4>
            <div style={{ padding: 16, background: '#f0f9ff', borderRadius: 10, border: '1px solid #bae6fd', borderLeft: '4px solid #0ea5e9' }}>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-secondary)' }}>{selectedConsult.notes}</p>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}

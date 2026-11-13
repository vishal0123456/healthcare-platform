import React, { useState } from 'react';
import { Stethoscope, Video, AlertTriangle, Calendar, Clock, Eye, Pill } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import { consultations } from '../data/consultations';

const typeConfig = {
  'In-Person': { color: '#10b981', icon: Stethoscope },
  'Video': { color: '#6366f1', icon: Video },
  'Emergency': { color: '#ef4444', icon: AlertTriangle },
};

export default function Consultations() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedConsult, setSelectedConsult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = consultations.filter(c => {
    const matchSearch = c.patientName.toLowerCase().includes(search.toLowerCase()) || c.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const viewConsult = (c) => { setSelectedConsult(c); setShowModal(true); };

  return (
    <DashboardLayout title="Consultation Records" subtitle="Patient consultations, prescriptions and clinical notes">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total', value: consultations.length, color: '#0ea5e9' },
          { label: 'Completed', value: consultations.filter(c => c.status === 'Completed').length, color: '#10b981' },
          { label: 'Ongoing', value: consultations.filter(c => c.status === 'Ongoing').length, color: '#f59e0b' },
          { label: 'Emergency', value: consultations.filter(c => c.type === 'Emergency').length, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${s.color}` }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by patient or doctor..." />
        <div style={{ display: 'flex', gap: 10 }}>
          <select className="form-input form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
            <option>All</option>
            <option>Completed</option>
            <option>Ongoing</option>
          </select>
          <button className="btn btn-primary btn-sm"><Stethoscope size={14} /> New Consultation</button>
        </div>
      </div>

      {/* Consultation cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(c => {
          const typeConf = typeConfig[c.type] || typeConfig['In-Person'];
          const TypeIcon = typeConf.icon;

          return (
            <div key={c.id} className="card" style={{ padding: '20px 24px', borderLeft: `4px solid ${typeConf.color}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto auto', gap: 20, alignItems: 'center' }}>
                {/* Patient */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar initials={c.patientAvatar} color={c.patientAvatarColor} size={48} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>{c.patientName}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.patientId}</p>
                  </div>
                </div>

                {/* Doctor & complaint */}
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{c.doctorName} · {c.specialization}</p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginTop: 3 }}>{c.chiefComplaint}</p>
                  <p style={{ fontSize: 13, color: typeConf.color, fontWeight: 600, marginTop: 3 }}>Dx: {c.diagnosis}</p>
                </div>

                {/* Type & date */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <TypeIcon size={14} color={typeConf.color} />
                    <span style={{ fontSize: 13, color: typeConf.color, fontWeight: 600 }}>{c.type}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                    <Calendar size={12} /> {c.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                    <Clock size={12} /> {c.time} · {c.duration}
                  </div>
                </div>

                {/* Status */}
                <Badge label={c.status} />

                {/* Action */}
                <button onClick={() => viewConsult(c)} className="btn btn-sm btn-secondary"><Eye size={14} /> View</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consultation Detail Modal */}
      {selectedConsult && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Consultation Record" size="lg">
          <div>
            {/* Patient & doctor header */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24, padding: 20, background: 'var(--surface-2)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar initials={selectedConsult.patientAvatar} color={selectedConsult.patientAvatarColor} size={56} />
                <div>
                  <p style={{ fontWeight: 800, fontSize: 17 }}>{selectedConsult.patientName}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedConsult.patientId}</p>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, fontSize: 13 }}>
                  {[
                    { label: 'Doctor', value: selectedConsult.doctorName },
                    { label: 'Date', value: `${selectedConsult.date} at ${selectedConsult.time}` },
                    { label: 'Duration', value: selectedConsult.duration },
                    { label: 'Type', value: selectedConsult.type },
                    { label: 'Status', value: selectedConsult.status },
                    { label: 'Follow-up', value: selectedConsult.followUpDate },
                  ].map(i => (
                    <div key={i.label}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>{i.label}</p>
                      <p style={{ fontWeight: 600 }}>{i.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vitals */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Vitals at Visit</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 20 }}>
              {Object.entries(selectedConsult.vitals).map(([key, val]) => (
                <div key={key} style={{ padding: '12px', background: '#f0f9ff', borderRadius: 10, textAlign: 'center', border: '1px solid #bae6fd' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', marginBottom: 4 }}>{key.toUpperCase()}</p>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Diagnosis & complaint */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ padding: 16, background: '#fef3c7', borderRadius: 10, border: '1px solid #fde68a' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>Chief Complaint</p>
                <p style={{ fontSize: 14 }}>{selectedConsult.chiefComplaint}</p>
              </div>
              <div style={{ padding: 16, background: '#ede9fe', borderRadius: 10, border: '1px solid #ddd6fe' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#5b21b6', textTransform: 'uppercase', marginBottom: 6 }}>Diagnosis</p>
                <p style={{ fontSize: 14, fontWeight: 700 }}>{selectedConsult.diagnosis}</p>
              </div>
            </div>

            {/* Prescription */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Prescription</h4>
            <div className="table-container" style={{ marginBottom: 20 }}>
              <table>
                <thead>
                  <tr><th>Medicine</th><th>Dose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  {selectedConsult.prescription.map((p, i) => (
                    <tr key={i}>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Pill size={14} color="#6366f1" /><span style={{ fontWeight: 600 }}>{p.medicine}</span></div></td>
                      <td>{p.dose}</td>
                      <td>{p.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Doctor's Notes</h4>
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 10, border: '1px solid var(--border)', borderLeft: '4px solid #0ea5e9' }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{selectedConsult.notes}</p>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}

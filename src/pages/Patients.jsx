import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Heart, Eye, UserPlus, Filter, Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import { patients } from '../data/patients';

export default function Patients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search);
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const viewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  return (
    <DashboardLayout title="Patient Profiles" subtitle="Centralized patient information and records">
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID..." />

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Status filter */}
          <select className="form-input form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto', minWidth: 140 }}>
            <option>All</option>
            <option>Active</option>
            <option>Critical</option>
            <option>Recovered</option>
          </select>

          <button className="btn btn-secondary btn-sm"><Download size={16} /> Export</button>
          <button className="btn btn-primary btn-sm"><UserPlus size={16} /> Add Patient</button>
        </div>
      </div>

      {/* Patient count */}
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Showing <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{filtered.length}</span> patients
      </p>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age / Gender</th>
              <th>Blood Group</th>
              <th>Contact</th>
              <th>Doctor</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(patient => (
              <tr key={patient.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar initials={patient.avatar} color={patient.avatarColor} size={38} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{patient.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{patient.id}</div>
                    </div>
                  </div>
                </td>
                <td>{patient.age} yrs · {patient.gender}</td>
                <td>
                  <span className="badge badge-red">{patient.bloodGroup}</span>
                </td>
                <td>
                  <div style={{ fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                      <Phone size={12} /> {patient.phone}
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{patient.doctor}</td>
                <td style={{ fontSize: 13 }}>{patient.lastVisit}</td>
                <td><Badge label={patient.status} /></td>
                <td>
                  <button onClick={() => viewDetails(patient)} className="btn btn-sm" style={{ padding: '6px 12px', fontSize: 13, gap: 6 }}>
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Patient Profile" size="lg">
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 28 }}>
            {/* Left: Avatar and basic */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <Avatar initials={selectedPatient.avatar} color={selectedPatient.avatarColor} size={120} />
              <Badge label={selectedPatient.status} />
            </div>

            {/* Right: Details */}
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{selectedPatient.name}</h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>Patient ID: {selectedPatient.id}</p>

              {/* Info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: 24 }}>
                <InfoRow label="Age" value={`${selectedPatient.age} years`} />
                <InfoRow label="Gender" value={selectedPatient.gender} />
                <InfoRow label="Blood Group" value={selectedPatient.bloodGroup} />
                <InfoRow label="Date of Birth" value={selectedPatient.dob} />
                <InfoRow label="Phone" value={selectedPatient.phone} icon={<Phone size={14} />} />
                <InfoRow label="Email" value={selectedPatient.email} icon={<Mail size={14} />} />
                <InfoRow label="Height" value={selectedPatient.height} />
                <InfoRow label="Weight" value={selectedPatient.weight} />
                <InfoRow label="BMI" value={selectedPatient.bmi} />
                <InfoRow label="Doctor" value={selectedPatient.doctor} />
              </div>

              <InfoRow label="Address" value={selectedPatient.address} icon={<MapPin size={14} />} />

              {/* Allergies */}
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Allergies</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selectedPatient.allergies.length > 0 ? (
                    selectedPatient.allergies.map(a => <span key={a} className="badge badge-red">{a}</span>)
                  ) : (
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>No known allergies</span>
                  )}
                </div>
              </div>

              {/* Emergency contact */}
              <div style={{ marginTop: 20, padding: 16, background: 'var(--surface-2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Emergency Contact</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <InfoRow label="Name" value={selectedPatient.emergencyContact.name} />
                  <InfoRow label="Relation" value={selectedPatient.emergencyContact.relation} />
                  <InfoRow label="Phone" value={selectedPatient.emergencyContact.phone} icon={<Phone size={14} />} />
                </div>
              </div>

              {/* Insurance */}
              <div style={{ marginTop: 16, padding: 16, background: '#e0f2fe', borderRadius: 10, border: '1px solid #bae6fd' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Insurance Details</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <InfoRow label="Provider" value={selectedPatient.insurance.provider} />
                  <InfoRow label="Policy No" value={selectedPatient.insurance.policyNo} />
                  <InfoRow label="Valid Until" value={selectedPatient.insurance.validity} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</p>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}

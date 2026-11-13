import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Heart, Eye, UserPlus, Download, LayoutGrid, List, Droplets } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import { patients } from '../data/patients';

function InfoPair({ label, value, icon }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 5 }}>
        {icon && <span style={{ color: 'var(--text-muted)' }}>{icon}</span>}
        {value}
      </p>
    </div>
  );
}

export default function Patients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [view, setView] = useState('table');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const viewDetails = (patient) => { setSelectedPatient(patient); setShowModal(true); };

  const statusCounts = {
    All: patients.length,
    Active: patients.filter(p => p.status === 'Active').length,
    Critical: patients.filter(p => p.status === 'Critical').length,
    Recovered: patients.filter(p => p.status === 'Recovered').length,
  };

  return (
    <DashboardLayout title="Patient Profiles" subtitle="Centralized patient information and health records">

      {/* Quick stat pills */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {Object.entries(statusCounts).map(([status, count]) => {
          const colors = { All: '#0ea5e9', Active: '#10b981', Critical: '#ef4444', Recovered: '#6366f1' };
          const isActive = statusFilter === status;
          return (
            <button key={status} onClick={() => setStatusFilter(status)} style={{
              padding: '7px 16px', borderRadius: 999,
              border: `1.5px solid ${isActive ? colors[status] : '#e2e8f0'}`,
              background: isActive ? `${colors[status]}12` : 'white',
              color: isActive ? colors[status] : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 15, fontWeight: 800 }}>{count}</span>
              {status}
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, ID, or doctor..." />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* View toggle */}
          <div style={{ display: 'flex', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: 3 }}>
            {[{ v: 'table', I: List }, { v: 'grid', I: LayoutGrid }].map(({ v, I }) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '5px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: view === v ? 'white' : 'transparent',
                color: view === v ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: view === v ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s', display: 'flex',
              }}>
                <I size={16} />
              </button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm"><Download size={15} /> Export</button>
          <button className="btn btn-primary btn-sm"><UserPlus size={15} /> Add Patient</button>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Showing <strong>{filtered.length}</strong> of {patients.length} patients
      </p>

      {/* Table view */}
      {view === 'table' && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Age / Gender</th>
                <th>Blood Group</th>
                <th>Contact</th>
                <th>Assigned Doctor</th>
                <th>Last Visit</th>
                <th>BMI</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => viewDetails(p)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Avatar initials={p.avatar} color={p.avatarColor} size={38} />
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.age} yrs · {p.gender}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#dc2626' }}>
                      <Droplets size={11} /> {p.bloodGroup}
                    </span>
                  </td>
                  <td>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Phone size={11} /> {p.phone}
                    </p>
                  </td>
                  <td style={{ fontSize: 13 }}>{p.doctor}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.lastVisit}</td>
                  <td>
                    <span style={{ fontSize: 13, fontWeight: 700, color: p.bmi > 25 ? '#f59e0b' : '#10b981' }}>{p.bmi}</span>
                  </td>
                  <td><Badge label={p.status} /></td>
                  <td onClick={e => e.stopPropagation()}>
                    <button onClick={() => viewDetails(p)} className="btn btn-sm btn-secondary" style={{ gap: 5 }}>
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid view */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
          {filtered.map(p => (
            <div key={p.id} className="card hover-lift" style={{ padding: 22, cursor: 'pointer' }} onClick={() => viewDetails(p)}>
              {/* Card top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar initials={p.avatar} color={p.avatarColor} size={48} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.id}</p>
                  </div>
                </div>
                <Badge label={p.status} />
              </div>

              {/* Blood group */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#dc2626' }}>
                  <Droplets size={11} /> {p.bloodGroup}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: '#f1f5f9', borderRadius: 999, fontSize: 12, color: 'var(--text-secondary)' }}>
                  {p.age} yrs · {p.gender}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Phone size={13} color="#0ea5e9" /> {p.phone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Heart size={13} color="#6366f1" /> {p.doctor}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Calendar size={13} color="#10b981" /> Last visit: {p.lastVisit}</div>
              </div>

              {p.allergies.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', marginBottom: 6, textTransform: 'uppercase' }}>Allergies</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {p.allergies.map(a => <span key={a} className="badge badge-red" style={{ fontSize: 11 }}>{a}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="empty-state">
          <UserPlus size={40} />
          <h4>No patients found</h4>
          <p>Try adjusting your search or filter</p>
        </div>
      )}

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Patient Profile" size="lg">
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 28 }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar initials={selectedPatient.avatar} color={selectedPatient.avatarColor} size={120} style={{ margin: '0 auto 12px' }} />
              <Badge label={selectedPatient.status} />
              <div style={{ marginTop: 14, padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', marginBottom: 4 }}>Blood Group</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Droplets size={18} /> {selectedPatient.bloodGroup}
                </p>
              </div>
              <div style={{ marginTop: 10, padding: '10px', background: 'var(--surface-2)', borderRadius: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>BMI</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: selectedPatient.bmi > 25 ? '#f59e0b' : '#10b981' }}>{selectedPatient.bmi}</p>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{selectedPatient.name}</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Patient ID: {selectedPatient.id}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', marginBottom: 20 }}>
                <InfoPair label="Age" value={`${selectedPatient.age} years`} />
                <InfoPair label="Gender" value={selectedPatient.gender} />
                <InfoPair label="Date of Birth" value={selectedPatient.dob} />
                <InfoPair label="Height / Weight" value={`${selectedPatient.height} · ${selectedPatient.weight}`} />
                <InfoPair label="Phone" value={selectedPatient.phone} icon={<Phone size={13} />} />
                <InfoPair label="Email" value={selectedPatient.email} icon={<Mail size={13} />} />
                <InfoPair label="Doctor" value={selectedPatient.doctor} icon={<Heart size={13} />} />
                <InfoPair label="Last Visit" value={selectedPatient.lastVisit} icon={<Calendar size={13} />} />
              </div>

              <InfoPair label="Address" value={selectedPatient.address} icon={<MapPin size={13} />} />

              {/* Allergies */}
              {selectedPatient.allergies.length > 0 && (
                <div style={{ marginTop: 16, padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', marginBottom: 8 }}>⚠️ Known Allergies</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedPatient.allergies.map(a => <span key={a} className="badge badge-red">{a}</span>)}
                  </div>
                </div>
              )}

              {/* Emergency contact */}
              <div style={{ marginTop: 16, padding: '14px', background: 'var(--surface-2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 10 }}>Emergency Contact</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <InfoPair label="Name" value={selectedPatient.emergencyContact.name} />
                  <InfoPair label="Relation" value={selectedPatient.emergencyContact.relation} />
                  <InfoPair label="Phone" value={selectedPatient.emergencyContact.phone} />
                </div>
              </div>

              {/* Insurance */}
              <div style={{ marginTop: 12, padding: '14px', background: '#f0f9ff', borderRadius: 10, border: '1px solid #bae6fd' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', marginBottom: 10 }}>🛡️ Insurance Details</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <InfoPair label="Provider" value={selectedPatient.insurance.provider} />
                  <InfoPair label="Policy No." value={selectedPatient.insurance.policyNo} />
                  <InfoPair label="Valid Until" value={selectedPatient.insurance.validity} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}

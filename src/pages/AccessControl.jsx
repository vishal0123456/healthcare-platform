import React, { useState } from 'react';
import { Shield, Eye, Edit, Lock, UserPlus, CheckCircle, XCircle, Phone, Mail, Calendar } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import { users, roleConfig } from '../data/users';

const permissionLabels = {
  all: 'Full System Access',
  view_patients: 'View Patients',
  edit_patients: 'Edit Patients',
  view_reports: 'View Reports',
  create_consultation: 'Create Consultations',
  view_nutrition: 'View Nutrition Plans',
  view_wellness: 'View Wellness Programs',
  view_own_profile: 'View Own Profile',
  view_own_reports: 'View Own Reports',
  view_own_consultations: 'View Own Consultations',
  view_own_nutrition: 'View Own Nutrition Plan',
  view_own_wellness: 'View Own Wellness Plan',
  manage_nutrition_plans: 'Manage Nutrition Plans',
  manage_wellness_programs: 'Manage Wellness Programs',
};

export default function AccessControl() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const viewUser = (u) => { setSelectedUser(u); setShowModal(true); };

  return (
    <DashboardLayout title="Access Control" subtitle="Role-based user management and permission administration">

      {/* Role overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 28 }}>
        {Object.entries(roleConfig).map(([role, config]) => {
          const count = users.filter(u => u.role === role).length;
          const isActive = roleFilter === role;
          return (
            <div
              key={role}
              className="card hover-lift"
              onClick={() => setRoleFilter(isActive ? 'All' : role)}
              style={{
                padding: '16px 18px',
                borderTop: `4px solid ${config.color}`,
                cursor: 'pointer',
                background: isActive ? config.bg : 'white',
                outline: isActive ? `2px solid ${config.color}` : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={18} color={config.color} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: config.color }}>{role}</span>
              </div>
              <p style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{count}</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>user{count !== 1 ? 's' : ''}</p>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, or department..." />
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="form-input form-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">All Roles</option>
            {Object.keys(roleConfig).map(r => <option key={r}>{r}</option>)}
          </select>
          <button className="btn btn-primary btn-sm"><UserPlus size={14} /> Add User</button>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Showing <strong>{filtered.length}</strong> of {users.length} users
      </p>

      {/* Users table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Last Login</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => {
              const config = roleConfig[user.role];
              return (
                <tr key={user.id} style={{ cursor: 'pointer' }} onClick={() => viewUser(user)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Avatar initials={user.avatar} color={user.avatarColor} size={38} />
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: config?.bg, color: config?.color, fontSize: 12, fontWeight: 700 }}>
                      <Shield size={11} /> {user.role}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user.department}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user.phone}</td>
                  <td style={{ fontSize: 13 }}>{user.lastLogin}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 60, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: config?.color, width: `${(user.permissions.length / Object.keys(permissionLabels).length) * 100}%` }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.permissions.includes('all') ? 'Full' : `${user.permissions.length}`}</span>
                    </div>
                  </td>
                  <td><Badge label={user.status} /></td>
                  <td onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <button onClick={() => viewUser(user)} style={{ padding: 6, borderRadius: 6, border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex' }} title="View"><Eye size={13} color="#6366f1" /></button>
                      <button style={{ padding: 6, borderRadius: 6, border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex' }} title="Edit"><Edit size={13} color="#0ea5e9" /></button>
                      <button style={{ padding: 6, borderRadius: 6, border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex' }} title="Lock"><Lock size={13} color="#f59e0b" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="User Profile & Permissions" size="lg">
          <div>
            {/* User header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24, padding: 20, background: 'var(--surface-2)', borderRadius: 12, flexWrap: 'wrap' }}>
              <Avatar initials={selectedUser.avatar} color={selectedUser.avatarColor} size={64} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>{selectedUser.name}</h3>
                <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                  <Badge label={selectedUser.role} />
                  <Badge label={selectedUser.status} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: 13 }}>
                <p style={{ color: 'var(--text-secondary)' }}><Mail size={12} style={{ display: 'inline', marginRight: 5 }} />{selectedUser.email}</p>
                <p style={{ color: 'var(--text-secondary)' }}><Phone size={12} style={{ display: 'inline', marginRight: 5 }} />{selectedUser.phone}</p>
                <p style={{ color: 'var(--text-secondary)' }}><Shield size={12} style={{ display: 'inline', marginRight: 5 }} />{selectedUser.department}</p>
                <p style={{ color: 'var(--text-secondary)' }}><Calendar size={12} style={{ display: 'inline', marginRight: 5 }} />Joined {selectedUser.joinDate}</p>
              </div>
            </div>

            {/* Role description */}
            <div style={{ padding: 14, background: `${roleConfig[selectedUser.role]?.color}0d`, borderRadius: 10, border: `1px solid ${roleConfig[selectedUser.role]?.color}30`, marginBottom: 22 }}>
              <p style={{ fontSize: 13 }}>
                <span style={{ fontWeight: 700 }}>Role Description: </span>
                <span style={{ color: 'var(--text-secondary)' }}>{roleConfig[selectedUser.role]?.description}</span>
              </p>
            </div>

            {/* Permissions grid */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Permission Matrix</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
              {Object.entries(permissionLabels).map(([key, label]) => {
                const hasPermission = selectedUser.permissions.includes('all') || selectedUser.permissions.includes(key);
                return (
                  <div key={key} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 12px', borderRadius: 8,
                    background: hasPermission ? '#f0fdf4' : '#fafafa',
                    border: `1px solid ${hasPermission ? '#bbf7d0' : '#e2e8f0'}`,
                  }}>
                    {hasPermission
                      ? <CheckCircle size={15} color="#10b981" style={{ flexShrink: 0 }} />
                      : <XCircle size={15} color="#cbd5e1" style={{ flexShrink: 0 }} />}
                    <span style={{ fontSize: 13, color: hasPermission ? '#065f46' : '#94a3b8', fontWeight: hasPermission ? 600 : 400 }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dashboard modules */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Accessible Modules</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {roleConfig[selectedUser.role]?.dashboardModules.map(m => (
                <span key={m} className="badge badge-blue" style={{ textTransform: 'capitalize', fontSize: 12 }}>
                  {m.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}

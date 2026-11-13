import React, { useState } from 'react';
import { Shield, Users, Eye, Edit, Trash2, UserPlus, Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';
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
  view_nutrition: 'View Nutrition',
  view_wellness: 'View Wellness',
  view_own_profile: 'View Own Profile',
  view_own_reports: 'View Own Reports',
  view_own_consultations: 'View Own Consultations',
  view_own_nutrition: 'View Own Nutrition',
  view_own_wellness: 'View Own Wellness',
  manage_nutrition_plans: 'Manage Nutrition Plans',
  manage_wellness_programs: 'Manage Wellness Programs',
};

export default function AccessControl() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const viewUser = (user) => { setSelectedUser(user); setShowModal(true); };

  return (
    <DashboardLayout title="Access Control" subtitle="Role-based user management and permission administration">
      {/* Role overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 28 }}>
        {Object.entries(roleConfig).map(([role, config]) => {
          const count = users.filter(u => u.role === role).length;
          return (
            <div key={role} className="card" style={{ padding: '16px 18px', borderTop: `4px solid ${config.color}`, cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => setRoleFilter(role === roleFilter ? 'All' : role)}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={18} color={config.color} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: config.color }}>{role}</span>
              </div>
              <p style={{ fontSize: 24, fontWeight: 800 }}>{count}</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{config.description.substring(0, 55)}...</p>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
        <div style={{ display: 'flex', gap: 10 }}>
          <select className="form-input form-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ width: 'auto' }}>
            <option>All</option>
            <option>Admin</option>
            <option>Doctor</option>
            <option>Patient</option>
            <option>Nutritionist</option>
            <option>Yoga Instructor</option>
          </select>
          <button className="btn btn-primary btn-sm"><UserPlus size={14} /> Add User</button>
        </div>
      </div>

      {/* Users table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => {
              const config = roleConfig[user.role];
              return (
                <tr key={user.id}>
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
                      <Shield size={12} /> {user.role}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user.department}</td>
                  <td style={{ fontSize: 13 }}>{user.lastLogin}</td>
                  <td><Badge label={user.status} /></td>
                  <td>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.permissions.length} permissions</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => viewUser(user)} style={{ padding: '5px', borderRadius: 6, border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex' }}>
                        <Eye size={14} color="#6366f1" />
                      </button>
                      <button style={{ padding: '5px', borderRadius: 6, border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex' }}>
                        <Edit size={14} color="#0ea5e9" />
                      </button>
                      <button style={{ padding: '5px', borderRadius: 6, border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex' }}>
                        <Lock size={14} color="#f59e0b" />
                      </button>
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
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="User Details & Permissions" size="lg">
          <div>
            {/* User header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: 20, background: 'var(--surface-2)', borderRadius: 12 }}>
              <Avatar initials={selectedUser.avatar} color={selectedUser.avatarColor} size={64} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>{selectedUser.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{selectedUser.email}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <Badge label={selectedUser.role} />
                  <Badge label={selectedUser.status} />
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: 13, color: 'var(--text-secondary)' }}>
                <p><span style={{ fontWeight: 600 }}>Department:</span> {selectedUser.department}</p>
                <p><span style={{ fontWeight: 600 }}>Phone:</span> {selectedUser.phone}</p>
                <p><span style={{ fontWeight: 600 }}>Joined:</span> {selectedUser.joinDate}</p>
                <p><span style={{ fontWeight: 600 }}>Last Login:</span> {selectedUser.lastLogin}</p>
              </div>
            </div>

            {/* Role description */}
            <div style={{ padding: 16, background: `${roleConfig[selectedUser.role]?.color}0f`, borderRadius: 10, border: `1px solid ${roleConfig[selectedUser.role]?.color}30`, marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: 'var(--text-primary)' }}>
                <span style={{ fontWeight: 700 }}>Role Description: </span>
                {roleConfig[selectedUser.role]?.description}
              </p>
            </div>

            {/* Permissions */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Assigned Permissions</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.entries(permissionLabels).map(([key, label]) => {
                const hasPermission = selectedUser.permissions.includes('all') || selectedUser.permissions.includes(key);
                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: hasPermission ? '#f0fdf4' : '#fafafa', border: `1px solid ${hasPermission ? '#bbf7d0' : '#e2e8f0'}` }}>
                    {hasPermission ? <CheckCircle size={16} color="#10b981" /> : <XCircle size={16} color="#cbd5e1" />}
                    <span style={{ fontSize: 13, color: hasPermission ? '#065f46' : '#94a3b8', fontWeight: hasPermission ? 600 : 400 }}>{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Dashboard modules */}
            <h4 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 14 }}>Accessible Dashboard Modules</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {roleConfig[selectedUser.role]?.dashboardModules.map(m => (
                <span key={m} className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{m.replace(/([A-Z])/g, ' $1')}</span>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}

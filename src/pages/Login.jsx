import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, Shield, Stethoscope, Apple, Activity, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const demoUsers = [
  { role: 'Admin', email: 'admin@medicore.health', password: 'Admin@123', icon: Shield, color: '#0ea5e9', desc: 'Full system access' },
  { role: 'Doctor', email: 'priya.mehta@medicore.health', password: 'Doctor@123', icon: Stethoscope, color: '#6366f1', desc: 'Patient & consultation mgmt' },
  { role: 'Patient', email: 'aarav.sharma@email.com', password: 'Patient@123', icon: User, color: '#10b981', desc: 'Personal health records' },
  { role: 'Nutritionist', email: 'kavya.nair@medicore.health', password: 'Nutri@123', icon: Apple, color: '#f59e0b', desc: 'Manage diet plans' },
  { role: 'Yoga Instructor', email: 'ramesh.sharma@medicore.health', password: 'Yoga@123', icon: Activity, color: '#ec4899', desc: 'Wellness programs' },
];

const features = [
  'Centralized Patient Profiles',
  'Medical History & Reports',
  'Consultation Records',
  'Personalized Nutrition Plans',
  'Yoga & Wellness Tracking',
  'Role-Based Secure Access',
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Try a demo account below.');
      }
      setLoading(false);
    }, 700);
  };

  const fillDemo = (u) => {
    setEmail(u.email);
    setPassword(u.password);
    setSelectedRole(u.role);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#0f172a',
    }}>
      {/* Left panel — branding */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(145deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
        padding: '48px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
        className="login-left"
      >
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: -120, right: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.04), transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(14,165,233,0.4)' }}>
            <Heart size={24} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>MediCore</div>
            <div style={{ fontSize: 10, color: '#475569', fontWeight: 600, letterSpacing: '0.12em' }}>HEALTHCARE PLATFORM</div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: 999, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0ea5e9', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: '#7dd3fc', fontWeight: 600 }}>Algomindz Solutions Pvt. Ltd.</span>
          </div>

          <h1 style={{ fontSize: 46, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Centralized<br />
            <span style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Healthcare
            </span><br />
            Management
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.75, maxWidth: 380, marginBottom: 36 }}>
            A unified platform for patients, doctors, nutritionists and wellness professionals to collaborate on holistic healthcare.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle size={15} color="#10b981" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', gap: 36 }}>
          {[
            { val: '248+', label: 'Patients' },
            { val: '18', label: 'Doctors' },
            { val: '5', label: 'Roles' },
            { val: '7', label: 'Modules' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontSize: 24, fontWeight: 900, color: 'white' }}>{s.val}</p>
              <p style={{ fontSize: 12, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: 460,
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 44px',
        overflowY: 'auto',
        flexShrink: 0,
      }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>Sign in</h2>
          <p style={{ fontSize: 15, color: '#64748b' }}>Access your healthcare dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              style={{ fontSize: 15 }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                className="form-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                style={{ paddingRight: 44, fontSize: 15 }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#dc2626', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(14,165,233,0.35)',
              marginBottom: 28,
            }}
          >
            {loading ? (
              <>
                <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Signing in...
              </>
            ) : (
              'Sign In to MediCore'
            )}
          </button>
        </form>

        {/* Demo accounts */}
        <div>
          <div className="divider-text" style={{ marginBottom: 16 }}>DEMO ACCOUNTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {demoUsers.map(u => (
              <button
                key={u.role}
                onClick={() => fillDemo(u)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px',
                  border: `1.5px solid ${selectedRole === u.role ? u.color : '#e2e8f0'}`,
                  borderRadius: 10,
                  background: selectedRole === u.role ? `${u.color}0d` : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={e => { if (selectedRole !== u.role) { e.currentTarget.style.borderColor = u.color; e.currentTarget.style.background = `${u.color}08`; } }}
                onMouseLeave={e => { if (selectedRole !== u.role) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; } }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `${u.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <u.icon size={16} color={u.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{u.role}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>{u.desc}</p>
                </div>
                {selectedRole === u.role && <CheckCircle size={16} color={u.color} />}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 12 }}>Click a role to auto-fill • No real data stored</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .login-left { display: none !important; } }
      `}</style>
    </div>
  );
}

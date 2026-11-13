import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, Shield, Stethoscope, Apple, Activity, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const demoUsers = [
  { role: 'Admin', email: 'admin@medicore.health', password: 'Admin@123', icon: Shield, color: '#0ea5e9' },
  { role: 'Doctor', email: 'priya.mehta@medicore.health', password: 'Doctor@123', icon: Stethoscope, color: '#6366f1' },
  { role: 'Patient', email: 'aarav.sharma@email.com', password: 'Patient@123', icon: User, color: '#10b981' },
  { role: 'Nutritionist', email: 'kavya.nair@medicore.health', password: 'Nutri@123', icon: Apple, color: '#f59e0b' },
  { role: 'Yoga Instructor', email: 'ramesh.sharma@medicore.health', password: 'Yoga@123', icon: Activity, color: '#ec4899' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 600);
  };

  const fillDemo = (u) => {
    setEmail(u.email);
    setPassword(u.password);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)' }} />

      <div style={{ width: '100%', maxWidth: 960, display: 'flex', gap: 48, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Left: Branding */}
        <div style={{ flex: 1, display: 'none', flexDirection: 'column', gap: 32, color: 'white' }} className="login-brand">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 50, height: 50, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={26} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>MediCore</div>
                <div style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '0.08em' }}>HEALTHCARE PLATFORM</div>
              </div>
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Centralized<br />
              <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Healthcare</span><br />
              Management
            </h1>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
              A unified platform for patients, doctors, nutritionists and wellness professionals to collaborate on holistic healthcare.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Centralized Patient Profiles', 'Medical History & Reports', 'Consultation Records', 'Personalized Nutrition Plans', 'Yoga & Wellness Tracking', 'Role-Based Secure Access'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#0ea5e9' }}>✓</div>
                <span style={{ fontSize: 14, color: '#cbd5e1' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Login form */}
        <div style={{ flex: '0 0 440px', width: '100%', maxWidth: 440 }}>
          <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 24, padding: '40px 36px', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
            {/* Logo on form */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={22} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>MediCore</div>
                <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '0.08em' }}>HEALTHCARE PLATFORM</div>
              </div>
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Welcome back</h2>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Sign in to your healthcare account</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@medicore.health"
                  required
                  autoComplete="email"
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
                    style={{ paddingRight: 44 }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15 }}
              >
                {loading ? (
                  <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                ) : 'Sign In'}
              </button>
            </form>

            {/* Demo accounts */}
            <div style={{ marginTop: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>DEMO ACCOUNTS</span>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {demoUsers.map((u) => (
                  <button
                    key={u.role}
                    onClick={() => fillDemo(u)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 10px',
                      border: `1.5px solid ${u.color}30`,
                      borderRadius: 8,
                      background: `${u.color}08`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = u.color; e.currentTarget.style.background = `${u.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${u.color}30`; e.currentTarget.style.background = `${u.color}08`; }}
                  >
                    <u.icon size={14} color={u.color} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: u.color }}>{u.role}</span>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 10 }}>Click any role to auto-fill credentials</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .login-brand { display: flex !important; } }
      `}</style>
    </div>
  );
}

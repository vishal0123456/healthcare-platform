import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Heart, Eye, EyeOff, Shield, Stethoscope, Apple,
  Activity, User, CheckCircle, ArrowLeft, Phone, Mail, Building
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// role → sidebar permission keys
const rolePermissions = {
  Patient: ['view_own_profile', 'view_own_reports', 'view_own_consultations', 'view_own_nutrition', 'view_own_wellness'],
  Doctor: ['view_patients', 'edit_patients', 'view_reports', 'create_consultation', 'view_nutrition', 'view_wellness'],
  Nutritionist: ['view_patients', 'view_reports', 'manage_nutrition_plans'],
  'Yoga Instructor': ['view_patients', 'manage_wellness_programs'],
};

const roleColorMap = {
  Patient: '#10b981',
  Doctor: '#6366f1',
  Nutritionist: '#f59e0b',
  'Yoga Instructor': '#ec4899',
};

const roles = [
  { role: 'Patient', icon: User, color: '#10b981', desc: 'Access your personal health records' },
  { role: 'Doctor', icon: Stethoscope, color: '#6366f1', desc: 'Manage patients & consultations' },
  { role: 'Nutritionist', icon: Apple, color: '#f59e0b', desc: 'Create & manage diet plans' },
  { role: 'Yoga Instructor', icon: Activity, color: '#ec4899', desc: 'Manage wellness programs' },
];

const features = [
  { icon: User, label: 'Patient', desc: 'Access your personal health records' },
  { icon: Stethoscope, label: 'Doctor', desc: 'Manage patients & consultations' },
  { icon: Apple, label: 'Nutritionist', desc: 'Create & manage diet plans' },
  { icon: Activity, label: 'Yoga Instructor', desc: 'Manage wellness programs' },
];

export default function Signup() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    department: '', password: '', confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required.';
    if (!form.email.includes('@')) return 'Enter a valid email address.';
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) return 'Enter a valid 10-digit phone number.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);

    setTimeout(() => {
      const initials = form.fullName.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

      const newUser = {
        id: `U${Date.now()}`,
        name: form.fullName.trim(),
        email: form.email.toLowerCase(),
        password: form.password,
        role: selectedRole,
        avatar: initials,
        avatarColor: roleColorMap[selectedRole] || '#0ea5e9',
        department: form.department.trim() || selectedRole,
        phone: form.phone.trim(),
        joinDate: new Date().toISOString().slice(0, 10),
        lastLogin: new Date().toISOString().slice(0, 10),
        status: 'Active',
        permissions: rolePermissions[selectedRole] || [],
      };

      // Register into AuthContext runtime registry
      const regResult = register(newUser);
      setLoading(false);

      if (!regResult.success) {
        setError(regResult.message);
        return;
      }

      setSuccess(true);

      // Auto-login after 1.5 s
      setTimeout(() => {
        login(form.email.toLowerCase(), form.password, newUser);
        navigate('/dashboard');
      }, 1500);
    }, 900);
  };

  // ── Success screen ──────────────────────────────────────────
  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 12px 32px rgba(16,185,129,0.35)' }}>
            <CheckCircle size={40} color="white" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>Account Created!</h2>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65 }}>
            Welcome to MediCore, <strong>{form.fullName.split(' ')[0]}</strong>!<br />
            Logging you in automatically…
          </p>
          <div style={{ marginTop: 24, height: 4, background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: 2, animation: 'shimmer 1.2s infinite' }} />
        </div>
      </div>
    );
  }

  // ── Main layout ─────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0f172a' }}>

      {/* Left branding panel */}
      <div style={{ flex: 1, background: 'linear-gradient(145deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)', padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }} className="login-left">
        <div style={{ position: 'absolute', top: -120, right: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(14,165,233,0.4)' }}>
            <Heart size={24} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>MediCore</div>
            <div style={{ fontSize: 10, color: '#475569', fontWeight: 600, letterSpacing: '0.12em' }}>HEALTHCARE PLATFORM</div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 999, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 600 }}>Create your free account</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Join the<br />
            <span style={{ background: 'linear-gradient(90deg, #34d399, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MediCore</span><br />
            Network
          </h1>
          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.75, maxWidth: 380, marginBottom: 36 }}>
            Connect with patients, doctors, nutritionists and wellness professionals on one unified platform.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {features.map(f => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${roleColorMap[f.label]}20`, border: `1px solid ${roleColorMap[f.label]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <f.icon size={15} color={roleColorMap[f.label]} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{f.label}</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>{f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#334155' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#38bdf8', fontWeight: 700, textDecoration: 'none' }}>Sign in →</Link>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ width: 480, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 44px', overflowY: 'auto', flexShrink: 0 }}>

        {/* ── STEP 1: Choose role ── */}
        {step === 1 && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>Create Account</h2>
              <p style={{ fontSize: 15, color: '#64748b' }}>First, choose your role in MediCore</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {roles.map(r => (
                <button key={r.role} onClick={() => { setSelectedRole(r.role); setStep(2); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', border: '1.5px solid #e2e8f0', borderRadius: 12, background: 'white', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.background = `${r.color}08`; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${r.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <r.icon size={22} color={r.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{r.role}</p>
                    <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{r.desc}</p>
                  </div>
                  <span style={{ fontSize: 20, color: '#cbd5e1' }}>›</span>
                </button>
              ))}
            </div>

            <p style={{ marginTop: 28, fontSize: 14, color: '#94a3b8', textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#0ea5e9', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </>
        )}

        {/* ── STEP 2: Fill details ── */}
        {step === 2 && (() => {
          const r = roles.find(x => x.role === selectedRole);
          return (
            <>
              <button onClick={() => { setStep(1); setError(''); }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0 }}>
                <ArrowLeft size={15} /> Back to roles
              </button>

              {/* Selected role badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: `${r.color}0d`, border: `1.5px solid ${r.color}30`, borderRadius: 10, marginBottom: 24 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${r.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <r.icon size={16} color={r.color} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: r.color }}>Signing up as: {r.role}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>{r.desc}</p>
                </div>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Your Details</h2>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Fill in your information to create your account</p>

              <form onSubmit={handleSubmit}>
                {/* Full name */}
                <div className="form-group">
                  <label className="form-label">Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input name="fullName" type="text" className="form-input" value={form.fullName} onChange={handleChange} placeholder="e.g. Dr. Priya Mehta" required style={{ paddingLeft: 36 }} />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input name="email" type="email" className="form-input" value={form.email} onChange={handleChange} placeholder="you@example.com" required style={{ paddingLeft: 36 }} />
                  </div>
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input name="phone" type="tel" className="form-input" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required style={{ paddingLeft: 36 }} />
                  </div>
                </div>

                {/* Department */}
                <div className="form-group">
                  <label className="form-label">
                    Department / Specialization{' '}
                    <span style={{ color: '#94a3b8', fontWeight: 400, textTransform: 'none', fontSize: 11 }}>(optional)</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input name="department" type="text" className="form-input" value={form.department} onChange={handleChange} placeholder="e.g. Cardiology, General Medicine" style={{ paddingLeft: 36 }} />
                  </div>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="form-label">Password <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <input name="password" type={showPw ? 'text' : 'password'} className="form-input" value={form.password} onChange={handleChange} placeholder="Min 8 characters" required style={{ paddingRight: 44 }} />
                    <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }} aria-label="Toggle password">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {form.password.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {[1, 2, 3, 4].map(i => {
                          const strength = form.password.length >= 12 ? 4 : form.password.length >= 10 ? 3 : form.password.length >= 8 ? 2 : 1;
                          const fillColor = strength >= 3 ? '#10b981' : strength === 2 ? '#f59e0b' : '#ef4444';
                          return <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? fillColor : '#e2e8f0', transition: 'background 0.3s' }} />;
                        })}
                      </div>
                      <p style={{ fontSize: 11, marginTop: 4, color: '#94a3b8' }}>
                        {form.password.length < 8 ? 'Too short' : form.password.length < 10 ? 'Fair — consider a longer password' : form.password.length < 12 ? 'Good' : '✓ Strong password'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div className="form-group">
                  <label className="form-label">Confirm Password <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <input name="confirmPassword" type={showConfirmPw ? 'text' : 'password'} className="form-input" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" required
                      style={{ paddingRight: 44, borderColor: form.confirmPassword.length > 0 && form.confirmPassword !== form.password ? '#ef4444' : '' }}
                    />
                    <button type="button" onClick={() => setShowConfirmPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }} aria-label="Toggle confirm password">
                      {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {form.confirmPassword.length > 0 && form.confirmPassword === form.password && (
                    <p style={{ fontSize: 11, color: '#10b981', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle size={12} /> Passwords match
                    </p>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#dc2626', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={loading} style={{
                  width: '100%', padding: '13px',
                  background: loading ? '#94a3b8' : `linear-gradient(135deg, ${r.color}, ${r.color}cc)`,
                  color: 'white', border: 'none', borderRadius: 10,
                  fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'all 0.2s',
                  boxShadow: loading ? 'none' : `0 4px 16px ${r.color}44`,
                  marginBottom: 16,
                }}>
                  {loading
                    ? <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Creating account…</>
                    : <><CheckCircle size={18} /> Create My Account</>
                  }
                </button>
              </form>

              <p style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#0ea5e9', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
              </p>
            </>
          );
        })()}
      </div>

      <style>{`@media (max-width: 900px) { .login-left { display: none !important; } }`}</style>
    </div>
  );
}

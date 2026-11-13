import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        {/* Animated icon */}
        <div style={{
          width: 100, height: 100,
          background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 32px',
          boxShadow: '0 20px 40px rgba(14,165,233,0.3)',
          animation: 'pulse 2s infinite',
        }}>
          <Heart size={48} color="white" />
        </div>

        <h1 style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
          404
        </h1>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Page Not Found</h2>
        <p style={{ fontSize: 16, color: '#64748b', marginBottom: 36, lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back to your healthcare dashboard.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary btn-lg"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary btn-lg"
          >
            <Home size={18} /> Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

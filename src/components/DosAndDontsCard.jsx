import React from 'react';

export default function DosAndDontsCard({ dos = [], donts = [] }) {
  if (!dos.length && !donts.length) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 12,
      marginTop: 14,
    }} className="anim-fade-up">

      {/* DOs Card */}
      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 14,
        padding: '1.15rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 10,
          color: '#15803d',
          fontWeight: 800,
          fontSize: '0.88rem',
        }}>
          <span style={{
            background: '#dcfce7',
            width: 24, height: 24, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.78rem',
          }}>✓</span>
          <span>Yang Harus Dilakukan (DOs)</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {dos.map((item, idx) => (
            <li key={idx} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: '0.82rem', color: '#1e293b',
              lineHeight: 1.5,
            }}>
              <span style={{ color: '#16a34a', fontWeight: 800, minWidth: 16 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* DONTs Card */}
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: 14,
        padding: '1.15rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 10,
          color: '#b91c1c',
          fontWeight: 800,
          fontSize: '0.88rem',
        }}>
          <span style={{
            background: '#fee2e2',
            width: 24, height: 24, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.78rem',
          }}>✕</span>
          <span>Yang Harus Dihindari (DON'Ts)</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {donts.map((item, idx) => (
            <li key={idx} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: '0.82rem', color: '#1e293b',
              lineHeight: 1.5,
            }}>
              <span style={{ color: '#dc2626', fontWeight: 800, minWidth: 16 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

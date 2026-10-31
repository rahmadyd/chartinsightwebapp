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
        background: 'linear-gradient(135deg, rgba(52,211,153,0.08), rgba(52,211,153,0.02))',
        border: '1.5px solid rgba(52,211,153,0.3)',
        borderRadius: 16,
        padding: '1.15rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 10,
          color: '#34d399',
          fontWeight: 800,
          fontSize: '0.88rem',
        }}>
          <span style={{
            background: 'rgba(52,211,153,0.2)',
            width: 26, height: 26, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem',
          }}>✓</span>
          <span>Yang Harus Dilakukan (DOs)</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {dos.map((item, idx) => (
            <li key={idx} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: '0.8rem', color: 'var(--color-text-2)',
              lineHeight: 1.5,
            }}>
              <span style={{ color: '#34d399', fontWeight: 800, minWidth: 16 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* DONTs Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(248,113,113,0.08), rgba(248,113,113,0.02))',
        border: '1.5px solid rgba(248,113,113,0.3)',
        borderRadius: 16,
        padding: '1.15rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 10,
          color: '#f87171',
          fontWeight: 800,
          fontSize: '0.88rem',
        }}>
          <span style={{
            background: 'rgba(248,113,113,0.2)',
            width: 26, height: 26, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem',
          }}>✕</span>
          <span>Yang Harus Dihindari (DON'Ts)</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {donts.map((item, idx) => (
            <li key={idx} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: '0.8rem', color: 'var(--color-text-2)',
              lineHeight: 1.5,
            }}>
              <span style={{ color: '#f87171', fontWeight: 800, minWidth: 16 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

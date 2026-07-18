import { useState, lazy, Suspense } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const CupidPlayer = lazy(() =>
  import('../cupid-player').then(m => ({ default: m.CupidPlayer }))
);

export default function MusicButton() {
  const [showPlayer, setShowPlayer] = useState(false);
  const { isDarkMode } = useDarkMode();

  return (
    <>
      {/* Floating music button */}
      <button
        onClick={() => setShowPlayer(true)}
        aria-label="Open music player"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 99998,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDarkMode
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vinyl record */}
          <circle
            cx="12"
            cy="13"
            r="8.5"
            fill={isDarkMode ? '#FFB6C1' : '#6366f1'}
            opacity="0.9"
          />
          <circle
            cx="12"
            cy="13"
            r="5"
            stroke={isDarkMode ? '#1a1a2e' : '#ffffff'}
            strokeWidth="0.6"
            opacity="0.3"
          />
          <circle
            cx="12"
            cy="13"
            r="2"
            fill={isDarkMode ? '#1a1a2e' : '#ffffff'}
            opacity="0.5"
          />
          <circle
            cx="12"
            cy="13"
            r="0.8"
            fill={isDarkMode ? '#FFB6C1' : '#6366f1'}
          />
          {/* Tonearm */}
          <line
            x1="17"
            y1="6"
            x2="14"
            y2="11"
            stroke={isDarkMode ? '#ccc' : '#444'}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle
            cx="17.5"
            cy="5.5"
            r="1.2"
            fill={isDarkMode ? '#ccc' : '#444'}
          />
        </svg>
      </button>

      {/* Player modal overlay */}
      {showPlayer && (
        <Suspense fallback={null}>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              background: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              animation: 'cupid-modal-fade-in 0.3s ease-out',
            }}
            onClick={e => {
              if (e.target === e.currentTarget) setShowPlayer(false);
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 'min(90vmin, 700px)',
                position: 'relative',
              }}
            >
              <CupidPlayer onClose={() => setShowPlayer(false)} />
            </div>
          </div>

          <style>{`
            @keyframes cupid-modal-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </Suspense>
      )}
    </>
  );
}
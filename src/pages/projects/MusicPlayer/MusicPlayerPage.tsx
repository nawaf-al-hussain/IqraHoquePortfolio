import { Link } from 'react-router-dom';
import { Code, ExternalLink, Music, Disc3, Headphones, Palette, MonitorSmartphone } from 'lucide-react';

const features = [
  {
    icon: <Music size={24} />,
    title: 'Multi-Platform Streaming',
    description: 'Seamlessly integrates with YouTube, Spotify, and Apple Music APIs to fetch and play playlists from any platform.',
  },
  {
    icon: <Disc3 size={24} />,
    title: 'Local Audio Playback',
    description: 'Full-featured local audio player with support for various formats. Reads and displays metadata from audio files using music-metadata.',
  },
  {
    icon: <Headphones size={24} />,
    title: 'Playback Controls',
    description: 'Complete playback controls including play/pause, next/previous track, shuffle, repeat, volume adjustment, and seekable progress bar.',
  },
  {
    icon: <Palette size={24} />,
    title: 'Dual Themes',
    description: 'Beautiful pink and blue theme options with custom UI assets, animated record player, and smooth needle transitions.',
  },
  {
    icon: <MonitorSmartphone size={24} />,
    title: 'Cross-Platform Desktop App',
    description: 'Built with Electron for native desktop experience on Windows, macOS, and Linux with custom window controls and resizing.',
  },
];

const MusicPlayerPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'inherit',
    }}>
      {/* Back button */}
      <Link
        to="/#projects"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#ec4899',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          marginBottom: '2rem',
        }}
      >
        &larr; Back to Projects
      </Link>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
      }}>
        <img
          src="/images/music-player/icon.png"
          alt="Cupid Player icon"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            objectFit: 'cover',
          }}
        />
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}>
            Cupid Player
          </h1>
          <p style={{
            color: '#888',
            fontSize: '1.05rem',
            marginTop: '0.3rem',
          }}>
            A feature-rich desktop music player with multi-platform streaming
          </p>
        </div>
      </div>

      {/* App screenshot */}
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '2.5rem',
        border: '1px solid rgba(0,0,0,0.1)',
      }}>
        <img
          src="/images/music-player/frame.png"
          alt="Cupid Player screenshot"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Tech Stack */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.8rem' }}>Tech Stack</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['Electron', 'React', 'Vite', 'JavaScript', 'Node.js', 'Spotify API', 'Apple MusicKit', 'YouTube API (youtubei.js)', 'music-metadata'].map((tech) => (
            <span
              key={tech}
              style={{
                background: 'rgba(236, 72, 153, 0.1)',
                color: '#ec4899',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 500,
                border: '1px solid rgba(236, 72, 153, 0.2)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Key Features</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: 'rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '12px',
                padding: '1.2rem',
              }}
            >
              <div style={{ color: '#ec4899', marginBottom: '0.5rem' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.5 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.8rem' }}>Architecture</h2>
        <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.7 }}>
          Cupid Player follows a clean modular architecture. The <strong>Electron main process</strong> handles
          system-level operations like window management, file system access for local audio, and native menu controls.
          The <strong>renderer process</strong> is a React SPA powered by Vite, responsible for the entire UI.
          Custom hooks (<code>useAudioPlayer</code>, <code>useSpotifyPlayer</code>, <code>useTheme</code>) encapsulate
          playback logic, Spotify integration, and theme switching respectively. Platform-specific API modules
          (YouTube, Spotify, Apple Music) are isolated in their own directories with separate auth and API layers,
          making it easy to extend or swap streaming providers.
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          href="https://github.com/nawaf-al-hussain/music-player"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ec4899',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'background 0.2s',
          }}
        >
          <Code size={18} />
          View Source Code
        </a>
        <a
          href="https://github.com/cupidbity/cupid-music-player"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            color: '#ec4899',
            padding: '12px 24px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            border: '1px solid #ec4899',
            transition: 'background 0.2s',
          }}
        >
          <ExternalLink size={18} />
          Original Repo
        </a>
      </div>
    </div>
  );
};

export default MusicPlayerPage;
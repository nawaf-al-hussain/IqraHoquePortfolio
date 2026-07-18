import { useCallback, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './CupidPlayer.css';
import useAudioPlayer, { type Track } from './useAudioPlayer';
import useTheme from './useTheme';

import progressBarStars from './assets/progress_bar_stars.png';
import star from './assets/star.png';
import starSelected from './assets/star_selected.png';

// ── Default demo tracks (free sample audio URLs) ──────────
const DEFAULT_TRACKS: Track[] = [
  {
    title: 'Lovers Rock',
    artist: 'TV Girl',
    album: 'French Exit',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/3d/09/0c/3d090c87-f02b-3c3c-cedf-603cc900082f/888174780955_cover.jpg/600x600bb.jpg',
  },
  {
    title: 'Come Inside Of My Heart',
    artist: 'IV OF SPADES',
    album: 'CLAPCLAPCLAP!',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a4/e0/8d/a4e08db1-0d81-e8c4-6fc5-877761b22063/190295484996.jpg/600x600bb.jpg',
  },
  {
    title: 'Pluto Projector',
    artist: 'Rex Orange County',
    album: 'Pony',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e3/af/48/e3af4809-2a90-38c3-c485-44ae6471f75b/886447950241.jpg/600x600bb.jpg',
  },
  {
    title: 'There Is a Light That Never Goes Out',
    artist: 'The Smiths',
    album: 'The Queen Is Dead',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/e8/70/1ae870c3-b402-096b-c4c4-8022af5a2ed9/745099189662.jpg/600x600bb.jpg',
  },
  {
    title: 'Kiss Me',
    artist: 'Sixpence None the Richer',
    album: 'Sixpence None the Richer',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/0f/6b/92/0f6b92f7-52e1-67e4-6a7b-7196ef793cdc/080688551261.png/600x600bb.jpg',
  },
  {
    title: 'Sesame Syrup',
    artist: 'Cigarettes After Sex',
    album: 'Crush',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/38/eb/db/38ebdb06-1924-4f50-a8d8-a8629065e0f9/720841235095_Cover.jpg/600x600bb.jpg',
  },
  {
    title: 'Over the Moon',
    artist: 'The Marías',
    album: 'Superclean, Vol. II',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/71/5f/fc/715ffc50-c006-500b-ad3e-830a6a6bbc70/artwork.jpg/600x600bb.jpg',
  },
  {
    title: 'Lovesick',
    artist: 'Laufey',
    album: 'Bewitched',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1f/de/6c/1fde6cb4-9703-c214-cdc6-8ecf7d0f0aa0/197189040030.jpg/600x600bb.jpg',
  },
  {
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    album: 'Cigarettes After Sex',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b3/5e/0f/b35e0fbe-2370-fc48-0f0c-977525e93bf2/720841214601_Cover.jpg/600x600bb.jpg',
  },
  {
    title: 'Glue Song',
    artist: 'beabadoobee',
    album: 'Glue Song',
    file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/76/6e/b6/766eb6e4-d746-00cf-7009-5d3719854f65/196922349447_Cover.jpg/600x600bb.jpg',
  },
];

// ── Helpers ────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function readTracksFromStorage(): Track[] {
  try {
    const stored = localStorage.getItem('cupid-player-tracks');
    if (stored) return JSON.parse(stored) as Track[];
  } catch { /* ignore */ }
  return DEFAULT_TRACKS;
}

function saveTracksToStorage(tracks: Track[]): void {
  try {
    localStorage.setItem('cupid-player-tracks', JSON.stringify(tracks));
  } catch { /* ignore */ }
}

// ── Playlist list in settings ──────────────────────────────

function PlaylistList({ tracks, currentTrackIndex, onSelect }: {
  tracks: Track[];
  currentTrackIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="cupid-settings-playlist-list">
      {tracks.length === 0 ? (
        <div className="cupid-settings-label">no tracks yet</div>
      ) : (
        tracks.map((t, i) => (
          <button
            key={`${t.title}-${i}`}
            className={`cupid-settings-playlist-item ${i === currentTrackIndex ? 'active' : ''}`}
            onClick={() => onSelect(i)}
          >
            {t.title} — {t.artist}
          </button>
        ))
      )}
    </div>
  );
}

// ── Marquee text for long titles ───────────────────────────

function MarqueeText({ className, text }: { className: string; text: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const textEl = textRef.current;
    if (!outer || !textEl) return;
    setShouldScroll(textEl.offsetWidth > outer.clientWidth);
  }, [text]);

  return (
    <div className={`${className} cupid-marquee-container`} ref={outerRef}>
      <span ref={textRef} className="cupid-marquee-measure">{text}</span>
      <span className={shouldScroll ? 'cupid-marquee-scroll' : ''}>
        {text}
        {shouldScroll && <span className="cupid-marquee-gap">{text}</span>}
      </span>
    </div>
  );
}

// ── Track list drawer ──────────────────────────────────────

function TrackDrawer({ tracks, currentTrackIndex, onSelect, open, onClose }: {
  tracks: Track[];
  currentTrackIndex: number;
  onSelect: (index: number) => void;
  open: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  return createPortal(
    <div className="cupid-track-drawer-backdrop" onClick={onClose}>
      <div className="cupid-track-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cupid-track-drawer-header">
          <span className="cupid-settings-label" style={{ fontSize: 'calc(14 / 306 * var(--cupid-w))' }}>playlist</span>
          <button className="cupid-settings-theme-btn" onClick={onClose}>close</button>
        </div>
        <div className="cupid-track-drawer-list">
          {tracks.map((t, i) => (
            <button
              key={`${t.title}-${i}`}
              className={`cupid-track-drawer-item ${i === currentTrackIndex ? 'active' : ''}`}
              onClick={() => { onSelect(i); onClose(); }}
            >
              {t.art && <img src={t.art} className="cupid-track-drawer-art" alt="" draggable={false} />}
              <div className="cupid-track-drawer-info">
                <div className="cupid-track-drawer-title">{t.title}</div>
                <div className="cupid-track-drawer-artist">{t.artist}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>,
    containerRef.current ?? document.body,
  );
}

// ── Main CupidPlayer Component ────────────────────────────

interface CupidPlayerProps {
  onClose?: () => void;
}

export default function CupidPlayer({ onClose }: CupidPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [playMode, setPlayMode] = useState<'normal' | 'shuffle' | 'repeat'>(() => {
    try {
      const stored = localStorage.getItem('cupid-player-playmode');
      if (stored === 'normal' || stored === 'shuffle' || stored === 'repeat') return stored;
    } catch { /* ignore */ }
    return 'normal';
  });
  const [volumeHovered, setVolumeHovered] = useState(false);
  const [volumeDragging, setVolumeDragging] = useState(false);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const [tracks, setTracks] = useState<Track[]>(readTracksFromStorage);
  const [showSettings, setShowSettings] = useState(false);
  const [showTrackDrawer, setShowTrackDrawer] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const seekRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const player = useAudioPlayer(tracks, playMode);

  const {
    track,
    trackIndex,
    isPlaying,
    progress,
    duration,
    currentTime,
    togglePlay,
    next,
    prev,
    seek,
    setTrack,
    volume,
    setVolume,
    muted,
    toggleMute,
  } = player;

  const cyclePlayMode = useCallback(() => {
    setPlayMode((m) => {
      const next = m === 'normal' ? 'shuffle' : m === 'shuffle' ? 'repeat' : 'normal';
      try { localStorage.setItem('cupid-player-playmode', next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // ── Drag and drop audio files ───────────────────────────
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(
      (f) => f.type.startsWith('audio/') || f.name.endsWith('.mp3') || f.name.endsWith('.wav') || f.name.endsWith('.ogg') || f.name.endsWith('.flac') || f.name.endsWith('.m4a'),
    );
    if (files.length === 0) return;

    const newTracks: Track[] = files.map((f) => {
      const name = f.name.replace(/\.[^.]+$/, '');
      return {
        title: name,
        artist: 'Local File',
        file: URL.createObjectURL(f),
        art: null,
      };
    });

    setTracks((prev) => {
      const combined = [...prev, ...newTracks];
      saveTracksToStorage(combined);
      return combined;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  }, []);

  const { theme, toggleTheme, assets } = useTheme();

  const [recordFrame, setRecordFrame] = useState(0);
  const [needleFrame, setNeedleFrame] = useState(0);
  const [isPink, setIsPink] = useState(theme === 'pink');
  const [swapping, setSwapping] = useState(false);
  const [needleLifted, setNeedleLifted] = useState(false);
  const [starHovered, setStarHovered] = useState(false);
  const [needleChangeFrame, setNeedleChangeFrame] = useState(0);
  const prevTrackRef = useRef<string | null>(null);

  const currentFrames = isPink ? assets.recordFramesA : assets.recordFramesB;
  const incomingFrames = isPink ? assets.recordFramesB : assets.recordFramesA;

  // Spin animation while playing
  useEffect(() => {
    if (!isPlaying || swapping) return;
    const interval = setInterval(() => {
      setRecordFrame((f) => (f + 1) % currentFrames.length);
      setNeedleFrame((f) => (f + 1) % assets.needlePlayFrames.length);
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying, swapping, currentFrames.length, assets.needlePlayFrames.length]);

  // Detect song change and trigger swap
  useEffect(() => {
    if (prevTrackRef.current === track.title) return;
    const wasInitialOrPlaceholder = prevTrackRef.current === null || prevTrackRef.current === 'No track';
    prevTrackRef.current = track.title;
    if (track.title === 'No track') return;
    if (wasInitialOrPlaceholder) return;
    if (needleLifted) return;

    setNeedleLifted(true);
    setNeedleChangeFrame(0);

    setTimeout(() => setNeedleChangeFrame(1), 200);
    setTimeout(() => setSwapping(true), 400);

    setTimeout(() => {
      setIsPink((p) => !p);
      setRecordFrame(0);
      setSwapping(false);
    }, 1000);

    setTimeout(() => {
      setNeedleChangeFrame(0);
      setNeedleLifted(false);
      setNeedleFrame(0);
    }, 1100);
  }, [track.title, needleLifted]);

  // Progress bar dragging
  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = seekRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setHoverProgress(pct);
      seek(pct);
    };
    const onMouseUp = () => {
      setDragging(false);
      setStarHovered(false);
      setHoverProgress(null);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, seek]);

  // Volume bar dragging
  useEffect(() => {
    if (!volumeDragging) return;
    const onMouseMove = (e: MouseEvent) => {
      if (!volumeBarRef.current) return;
      const rect = volumeBarRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
      setVolume(pct);
    };
    const onMouseUp = () => {
      setVolumeDragging(false);
      setVolumeHovered(false);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [volumeDragging, setVolume]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prev();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'Escape':
          onClose?.();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, next, prev, setVolume, volume, toggleMute, onClose]);

  return (
    <>
      {/* This hidden div acts as the portal target for TrackDrawer */}
      <div ref={containerRef} className="cupid-portal-target" style={{ display: 'none' }} />
      <div
        className={`cupid-player ${theme === 'blue' ? 'cupid-theme-blue' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Close button for modal */}
        {onClose && (
          <button
            className="cupid-close-btn"
            onClick={onClose}
            aria-label="Close player"
          >
            ✕
          </button>
        )}

        {/* Drag-and-drop overlay */}
        {isDragOver && (
          <div className="cupid-drop-overlay">
            <div className="cupid-drop-overlay-text">drop audio files here</div>
          </div>
        )}

        {/* Base frame */}
        <img src={assets.frame} className="cupid-layer" alt="" draggable={false} />

        {/* Window title */}
        <div className="cupid-window-title">cupid player</div>

        {/* Record player centered in frame */}
        <img src={assets.recordPlayer} className="cupid-record-player" alt="" draggable={false} />
        <img
          src={currentFrames[recordFrame]}
          className={`cupid-record-player ${swapping ? 'cupid-record-slide-out' : ''}`}
          alt=""
          draggable={false}
        />
        {swapping && (
          <img
            src={incomingFrames[0]}
            className="cupid-record-player cupid-record-slide-in"
            alt=""
            draggable={false}
          />
        )}
        <img
          src={needleLifted ? assets.needleChangeFrames[needleChangeFrame] : assets.needlePlayFrames[needleFrame]}
          className="cupid-record-player"
          alt=""
          draggable={false}
        />

        {/* Frame overlay (no background) to clip sliding records */}
        <img src={assets.frameNoBg} className="cupid-layer cupid-frame-overlay" alt="" draggable={false} />

        {/* Decorative */}
        <img src={assets.plant} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />

        {/* Progress bar layers */}
        <img src={assets.progressBar} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />
        <img
          src={progressBarStars}
          className="cupid-layer cupid-layer-ui"
          alt=""
          draggable={false}
          style={{
            clipPath: `inset(0 ${(1 - (131 + (hoverProgress ?? progress) * 226 + 10) / 512) * 100}% 0 0)`,
          }}
        />
        <img
          src={starHovered ? starSelected : star}
          className={`cupid-layer cupid-layer-ui cupid-star-indicator ${starHovered ? 'cupid-star-hovered' : ''}`}
          alt=""
          draggable={false}
          style={{
            transform: 'translateX(calc(-3 / 306 * var(--cupid-w) + ' + ((hoverProgress ?? progress) * 226 / 512 * 1.719) + ' * var(--cupid-w) / 100))',
          }}
        />

        {/* Playback control layers (visual only) */}
        <img src={assets.backwardsButton} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />
        <img src={isPlaying ? assets.pauseButton : assets.playButton} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />
        <img src={assets.forwardsButton} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />

        {/* Volume/mute button layer */}
        <img
          src={muted ? assets.muteButton : assets.volumeButton}
          className="cupid-layer cupid-layer-ui"
          alt=""
          draggable={false}
          style={{ opacity: 0.8 }}
        />

        {/* Shuffle/repeat button layer */}
        <img
          src={playMode === 'repeat' ? assets.repeatButton : assets.shuffleButton}
          className="cupid-layer cupid-layer-ui"
          alt=""
          draggable={false}
          style={{ opacity: playMode === 'normal' ? 0.4 : 0.8 }}
        />

        {/* Window control layers (visual only — no action in browser) */}
        <img src={assets.minimizerButton} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />
        <img src={assets.windowButton} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />
        <img src={assets.exitButton} className="cupid-layer cupid-layer-ui" alt="" draggable={false} />

        {/* Settings button layer */}
        <img src={assets.settings} className="cupid-layer cupid-layer-ui cupid-settings-layer" alt="" draggable={false} />

        {/* SVG clip-path for pixel-art album mask */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="cupid-album-mask" clipPathUnits="objectBoundingBox">
              <rect x="0.07317" y="0" width="0.85366" height="1" />
              <rect x="0.04878" y="0.02439" width="0.90244" height="0.95122" />
              <rect x="0.02439" y="0.04878" width="0.95122" height="0.90244" />
              <rect x="0" y="0.07317" width="1" height="0.85366" />
            </clipPath>
          </defs>
        </svg>

        {/* Album art clipped to pixel mask */}
        {track.art && (
          <div className="cupid-album-mask">
            <img src={track.art} className="cupid-album-art" alt="" draggable={false} />
          </div>
        )}

        {/* Album frame overlay */}
        <img src={assets.albumFrame} className="cupid-layer cupid-album-frame-layer" alt="" draggable={false} />

        {/* Now playing section */}
        <div className="cupid-now-playing">
          <div className="cupid-track-info">
            <div className="cupid-now-playing-label">now playing...</div>
            <MarqueeText className="cupid-track-title" text={track.title} />
            <div className="cupid-track-artist">by {track.artist}</div>
          </div>
        </div>

        {/* Time display */}
        <div className="cupid-time-display">
          <span className="cupid-time-current">{formatTime(currentTime)}</span>
          <span className="cupid-time-remaining">{formatTime(duration - currentTime)}</span>
        </div>

        {/* Progress bar seek target */}
        <div
          className="cupid-progress-seek"
          ref={seekRef}
          onMouseEnter={() => setStarHovered(true)}
          onMouseLeave={() => { if (!dragging) { setStarHovered(false); } }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragging(true);
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            setHoverProgress(pct);
            seek(pct);
          }}
        />

        {/* Playback control click targets */}
        <div className="cupid-btn cupid-btn-prev" onClick={prev} />
        <div className="cupid-btn cupid-btn-play" onClick={togglePlay} />
        <div className="cupid-btn cupid-btn-next" onClick={next} />

        {/* Volume bar layers — shown on hover or drag */}
        {(volumeHovered || volumeDragging) && (
          <>
            <img src={assets.volumeBarLow} className="cupid-layer cupid-layer-ui cupid-volume-bar-layer" alt="" draggable={false} />
            <img
              src={assets.volumeBarHigh}
              className="cupid-layer cupid-layer-ui cupid-volume-bar-layer"
              alt=""
              draggable={false}
              style={{
                clipPath: `inset(${((1 - (muted ? 0 : volume)) * (420 - 338) / 512 + 338 / 512) * 100}% 0 0 0)`,
              }}
            />
          </>
        )}

        {/* Volume icon — hover to reveal bar */}
        <div
          className={`cupid-volume-hover-zone ${(volumeHovered || volumeDragging) ? 'expanded' : ''}`}
          onMouseLeave={() => { if (!volumeDragging) setVolumeHovered(false); }}
        >
          <div
            className="cupid-btn-volume-icon"
            onClick={toggleMute}
            onMouseEnter={() => setVolumeHovered(true)}
          />
          {(volumeHovered || volumeDragging) && (
            <div
              className="cupid-volume-bar-area"
              ref={volumeBarRef}
              onMouseDown={(e) => {
                e.preventDefault();
                setVolumeDragging(true);
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
                setVolume(pct);
              }}
            />
          )}
        </div>

        {/* Shuffle/repeat click target */}
        <div className="cupid-btn cupid-btn-playmode" onClick={cyclePlayMode} title={playMode} />

        {/* Window control click targets — decorative in browser */}
        <div className="cupid-btn cupid-btn-minimize" style={{ pointerEvents: 'none' }} />
        <div className="cupid-btn cupid-btn-exit" style={{ pointerEvents: 'none' }} />

        {/* Settings button */}
        <div className="cupid-btn cupid-btn-settings" onClick={() => setShowSettings((v) => !v)} />

        {/* Window button — opens playlist drawer in browser */}
        <div
          className="cupid-btn cupid-btn-window"
          onClick={() => setShowTrackDrawer(true)}
          title="show playlist"
        />

        {/* Settings panel */}
        {showSettings && (
          <div className="cupid-settings-panel">
            <div className="cupid-settings-panel-inner">
              <div className="cupid-settings-label">theme</div>
              <div className="cupid-settings-theme-row">
                <button
                  className={`cupid-settings-theme-btn ${theme === 'pink' ? 'active' : ''}`}
                  onClick={() => { if (theme !== 'pink') toggleTheme(); }}
                >
                  pink
                </button>
                <button
                  className={`cupid-settings-theme-btn ${theme === 'blue' ? 'active' : ''}`}
                  onClick={() => { if (theme !== 'blue') toggleTheme(); }}
                >
                  blue
                </button>
              </div>

              <div className="cupid-settings-label">tracks ({tracks.length})</div>
              <PlaylistList
                tracks={tracks}
                currentTrackIndex={trackIndex}
                onSelect={(i) => setTrack(i)}
              />

              <div className="cupid-settings-label" style={{ marginTop: 'calc(4 / 306 * var(--cupid-w))' }}>add music</div>
              <div className="cupid-settings-label" style={{ fontSize: 'calc(9 / 306 * var(--cupid-w))', opacity: 0.7 }}>
                drag &amp; drop audio files onto the player
              </div>

              <div className="cupid-settings-label" style={{ marginTop: 'calc(4 / 306 * var(--cupid-w))' }}>shortcuts</div>
              <div className="cupid-settings-label" style={{ fontSize: 'calc(9 / 306 * var(--cupid-w))', opacity: 0.7 }}>
                space: play/pause · arrows: seek/volume · m: mute · esc: close
              </div>

              <button
                className="cupid-settings-theme-btn"
                style={{ marginTop: 'calc(4 / 306 * var(--cupid-w))' }}
                onClick={() => {
                  setTracks(DEFAULT_TRACKS);
                  saveTracksToStorage(DEFAULT_TRACKS);
                }}
              >
                reset playlist
              </button>
            </div>
          </div>
        )}

        {/* Track drawer */}
        <TrackDrawer
          tracks={tracks}
          currentTrackIndex={trackIndex}
          onSelect={setTrack}
          open={showTrackDrawer}
          onClose={() => setShowTrackDrawer(false)}
        />
      </div>
    </>
  );
}
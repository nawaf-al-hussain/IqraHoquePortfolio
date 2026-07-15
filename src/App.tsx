import { Component } from 'react'
import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
import { useThemeColors } from './hooks/useThemeColors'
import { colors } from './styles/colors'
import Navigation from './components/section/Navigation'
import About from './components/section/About'
import { divider } from './assets'
import './App.css'

// Error Boundary to catch lazy-load failures
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          padding: '2rem',
          color: '#999',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>This section failed to load.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Wrapper that combines ErrorBoundary + Suspense
function SafeLazy({ children, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

// Lazy load project pages
const Contact = lazy(() => import('./pages/Contact'))
const ChineseMenuPage = lazy(() => import('./pages/projects/ChineseMenu/ChineseMenuPage'))

// Lazy load below-the-fold components for better initial load
const Projects = lazy(() => import('./components/section/Projects'))
const Experience = lazy(() => import('./components/section/Experience'))
const Skills = lazy(() => import('./components/section/Skills'))
const Certifications = lazy(() => import('./components/section/Certifications'))
const Footer = lazy(() => import('./components/Footer'))

function HomePage() {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  return (
    <>
      <About />
      <SafeLazy fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Projects />
      </SafeLazy>
      <SafeLazy fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Experience />
      </SafeLazy>
      {/* Divider with gradient transitions */}
      <div className="w-full py-8 relative" style={{
        background: isDarkMode ? themeColors.background.gradientEnd : colors.white,
        transition: 'background 0.3s ease-in-out'
      }}>
        {/* Top gradient overlay to blend with Experience section */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '60px',
            background: isDarkMode
              ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
              : `linear-gradient(180deg, ${colors.white} 0%, transparent 100%)`,
            zIndex: 1
          }}
        />
        {/* Bottom gradient overlay to blend with Skills section */}
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '200px',
            background: isDarkMode 
              ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
              : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
            zIndex: 1
          }}
        />
        <img
          src={divider}
          alt="Section divider"
          className="w-full h-auto relative"
          style={{
            zIndex: 2,
            filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none',
            opacity: isDarkMode ? 0.7 : 1
          }}
          width="1200"
          height="100"
          loading="lazy"
        />
      </div>
      <SafeLazy fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Skills />
      </SafeLazy>
      <SafeLazy fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Certifications />
      </SafeLazy>
    </>
  )
}

function AppContent() {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();

  // Hide portfolio nav & footer on the Chinese Menu page (it has its own navbar)
  const isProjectPage = location.pathname.startsWith('/projects/');

  return (
    <>
      {!isProjectPage && <Navigation />}
      <div className="app transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#101727' : undefined }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content" className="main-content">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chinese-menu" element={<ChineseMenuPage />} />
            </Routes>
          </Suspense>
        </main>
        {!isProjectPage && (
          <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
            <Footer />
          </Suspense>
        )}
      </div>
    </>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}

export default App
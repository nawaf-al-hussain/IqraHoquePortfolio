import { Link } from 'react-router-dom';
import Hero from './Hero';
import './Hero.css';
import './Navbar.css';

const ChineseMenuPage = () => {
  return (
    <div className="chinese-menu-page">
      {/* Back to Portfolio button */}
      <Link
        to="/#projects"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 99999,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: '0.9rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'background 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        &larr; Back to Portfolio
      </Link>

      {/* The full Chinese Menu experience */}
      <Hero />
    </div>
  );
};

export default ChineseMenuPage;
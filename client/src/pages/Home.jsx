import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navItems = [
    {
      title: "Join Chat",
      description: "Enter live chat room with room code",
      link: "/chat",
    },
    {
      title: "Admin Panel",
      description: "Moderate & manage messages",
      link: "/admin",
    },
    {
      title: "Broadcast",
      description: "Live stream viewer",
      link: "/broadcast",
    },
    {
      title: "Super Admin",
      description: "Full room & user management",
      link: "/super-admin",
    },
  ];

  return (
    <div style={containerStyle}>
      {/* Subtle Background */}
      <div style={bgGradient} />
      <div style={bgPattern} />

      {/* Main Content */}
      <div style={{
        ...contentStyle,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
      }}>
        {/* Logo & Title */}
        <div style={headerStyle}>
          <div style={logoContainerStyle}>
            <span style={logoText}>ACC</span>
          </div>
          <h1 style={titleStyle}>AWS Cloud Connect</h1>
          <p style={subtitleStyle}>
            Enterprise real-time chat & broadcast platform
          </p>
        </div>

        {/* Navigation Cards */}
        <div style={cardsGridStyle}>
          {navItems.map((item, index) => (
            <NavCard 
              key={index} 
              {...item} 
              index={index}
              isLoaded={isLoaded}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <span style={footerTextStyle}>v2.0</span>
          <span style={footerDivider}>|</span>
          <span style={footerTextStyle}>Production Ready</span>
        </div>
      </div>
    </div>
  );
}

function NavCard({ title, description, link, index, isLoaded }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          ...cardStyle,
          background: isHovered ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.02)',
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded 
            ? (isHovered ? 'translateY(-2px)' : 'translateY(0)') 
            : 'translateY(20px)',
          transition: `all 0.3s ease ${index * 0.1}s`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={cardNumberStyle}>0{index + 1}</div>
        <h3 style={cardTitleStyle}>{title}</h3>
        <p style={cardDescStyle}>{description}</p>
        <div style={cardArrowStyle}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path 
              d="M3 8H13M13 8L9 4M13 8L9 12" 
              stroke={isHovered ? "#c4b5fd" : "#6b7280"} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// ============== STYLES ==============

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  background: "#0a0a0f",
  padding: "60px 24px",
};

const bgGradient = {
  position: "absolute",
  inset: 0,
  background: `
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(88, 28, 135, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse 40% 30% at 80% 100%, rgba(59, 7, 100, 0.08) 0%, transparent 50%)
  `,
};

const bgPattern = {
  position: "absolute",
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
};

const contentStyle = {
  position: "relative",
  zIndex: 10,
  width: "100%",
  maxWidth: "800px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "48px",
};

const logoContainerStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  borderRadius: "12px",
  background: "rgba(139, 92, 246, 0.1)",
  border: "1px solid rgba(139, 92, 246, 0.2)",
  marginBottom: "20px",
};

const logoText = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#a78bfa",
  letterSpacing: "2px",
};

const titleStyle = {
  fontSize: "clamp(28px, 4vw, 38px)",
  fontWeight: "600",
  color: "#f5f3ff",
  marginBottom: "12px",
  letterSpacing: "-0.02em",
};

const subtitleStyle = {
  fontSize: "15px",
  color: "#6b7280",
  margin: 0,
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  marginBottom: "32px",
};

const cardStyle = {
  position: "relative",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  background: "rgba(255, 255, 255, 0.02)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const cardNumberStyle = {
  fontSize: "11px",
  fontWeight: "500",
  color: "#4b5563",
  marginBottom: "8px",
  letterSpacing: "0.05em",
};

const cardTitleStyle = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#e5e7eb",
  marginBottom: "4px",
};

const cardDescStyle = {
  fontSize: "13px",
  color: "#6b7280",
  margin: 0,
};

const cardArrowStyle = {
  position: "absolute",
  right: "20px",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const footerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  paddingTop: "24px",
  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
};

const footerTextStyle = {
  fontSize: "12px",
  color: "#4b5563",
};

const footerDivider = {
  color: "#374151",
  fontSize: "12px",
};

// Responsive styles
const mediaQueryStyle = `
  @media (max-width: 600px) {
    .cards-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

// Add responsive styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = mediaQueryStyle;
  document.head.appendChild(style);
}

export default Home;

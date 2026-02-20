import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top, #1a1a2e, #0f0f1b)",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: "25px",
          padding: "60px 40px",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(123,44,191,0.3)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
            background: "linear-gradient(135deg,#9d4edd,#c77dff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Live Broadcast System
        </h1>

        <p style={{ opacity: 0.6, marginBottom: "50px" }}>
          Real-time moderated chat & live streaming platform
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "25px",
          }}
        >
          <NavCard
            title="Join Chat"
            description="Enter live chat room"
            link="/chat"
          />

          <NavCard
            title="Admin Panel"
            description="Moderate messages"
            link="/admin"
          />

          <NavCard
            title="Broadcast"
            description="Live stream viewer"
            link="/broadcast"
          />

          <NavCard
            title="Super Admin"
            description="Manage room & users"
            link="/super-admin"
          />
        </div>
      </div>
    </div>
  );
}

function NavCard({ title, description, link }) {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          padding: "30px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "0.3s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 0 25px rgba(157,78,221,0.6)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "none")
        }
      >
        <h3 style={{ marginBottom: "10px", color: "#c77dff" }}>
          {title}
        </h3>

        <p style={{ opacity: 0.6 }}>{description}</p>
      </div>
    </Link>
  );
}

export default Home;
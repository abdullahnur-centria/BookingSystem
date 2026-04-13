import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ backgroundColor: "#ffb400", padding: "15px 30px", borderBottom: "2px solid #e6a200" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        
        <h1 style={{ margin: 0, color: "black", fontSize: "24px" }}>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>City Cycle Rentals</Link>
        </h1>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>Home</Link>
          <Link to="/register" style={{ color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>Book Now</Link>
          <Link to="/bookings" style={{ color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>View Bookings</Link>
        </div>

      </nav>
    </header>
  );
}
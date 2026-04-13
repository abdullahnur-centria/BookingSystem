import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="cta">
      <h2>Ready to Ride?</h2>
      <p>Explore the city like never before. Click below to secure your rental!</p>
      {/* We use Link instead of a standard <a> tag or a button with an alert */}
      <Link to="/register">
        <button>Book Your Bike Now</button>
      </Link>
    </div>
  );
}
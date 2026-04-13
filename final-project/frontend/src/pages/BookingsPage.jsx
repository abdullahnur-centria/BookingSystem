import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch the data from our new backend GET route!
    fetch("http://localhost:3000/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  return (
    <main style={{ padding: "60px 20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Admin Dashboard: Saved Bookings</h2>
      <p style={{ marginBottom: "30px" }}>Here is the live data pulled directly from the PostgreSQL database!</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {bookings.length === 0 ? <p>No bookings yet.</p> : null}
        
        {bookings.map((booking) => (
          <div key={booking.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "left" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#ffb400" }}>Booking #{booking.id}</h3>
            <p style={{ margin: "5px 0" }}><strong>Name:</strong> {booking.name}</p>
            <p style={{ margin: "5px 0" }}><strong>Email:</strong> {booking.email}</p>
            <p style={{ margin: "5px 0" }}><strong>Date:</strong> {booking.date.split('T')[0]}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
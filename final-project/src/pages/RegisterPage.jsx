import { useState } from "react";
import { z } from "zod";

// STEP 4: ZOD VALIDATION SCHEMA
// I define the rules for 3 input fields here
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Please enter a valid email address"),
  date: z.string().min(1, "Please select a booking date"), 
});

export default function RegisterPage() {
  // State for our form data, validation errors, and the server response
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });
  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles updating state when the user types
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Handles what happens when the user clicks Submit
  async function handleSubmit(event) {
    event.preventDefault(); // Stops the page from refreshing

    // Validate the form data against our Zod schema
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      // If validation fails, extract the errors and show them
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      setApiResponse(null);
      return;
    }

    // If valid, clear errors and show a loading state
    setErrors({});
    setLoading(true);

    // STEP 5: SEND DATA TO HTTPBIN
    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();
      setApiResponse(data); // Save the response to state
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending data!");
    } finally {
      setLoading(false);
    }
  }

  // STEP 2: KEEP THEME CONSISTENT (Inline styling to match your yellow/white theme)
  return (
    <main style={{ padding: "60px 20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Book Your Bike</h2>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>Fill out the details below to reserve your ride.</p>

      {/* STEP 3: FORM WITH 3 DIFFERENT INPUT TYPES (text, email, date) */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Input 1: Text */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="name" style={{ fontWeight: "bold", marginBottom: "5px" }}>Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }} />
          {errors.name && <span style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{errors.name}</span>}
        </div>

        {/* Input 2: Email */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="email" style={{ fontWeight: "bold", marginBottom: "5px" }}>Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }} />
          {errors.email && <span style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{errors.email}</span>}
        </div>

        {/* Input 3: Date */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="date" style={{ fontWeight: "bold", marginBottom: "5px" }}>Booking Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }} />
          {errors.date && <span style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{errors.date}</span>}
        </div>

        <button type="submit" disabled={loading} style={{ padding: "12px", fontSize: "16px", fontWeight: "bold", backgroundColor: "#ffb400", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}>
          {loading ? "Sending..." : "Confirm Booking"}
        </button>
      </form>

      {/* STEP 6: SHOW THE RESPONSE ON THE PAGE */}
      {apiResponse && (
        <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px", textAlign: "left" }}>
          <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Booking Successful! 🎉</h3>
          <p>Here is the server echo verifying your data was received:</p>
          <pre style={{ backgroundColor: "#2d2d2d", color: "#4af626", padding: "15px", borderRadius: "5px", overflowX: "auto", fontSize: "14px" }}>
            {JSON.stringify(apiResponse.json, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
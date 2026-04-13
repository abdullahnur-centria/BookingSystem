import express from "express";
import cors from "cors";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Needed in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

// GET route to fetch all bookings (This helps you get the 2 bonus points!)
app.get("/api/bookings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, date, created_at FROM bookings ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// POST route to save a new booking from your React form
app.post("/api/bookings", async (req, res) => {
  try {
    // 1. Grab the exact 3 fields your React form sends
    const { name, email, date } = req.body;

    // 2. Basic safety check
    if (!name || !email || !date) {
      return res.status(400).json({ error: "Name, email, and date are required!" });
    }

    // 3. Insert into the new database table
    const result = await pool.query(
      "INSERT INTO bookings (name, email, date) VALUES ($1, $2, $3) RETURNING *",
      [name, email, date]
    );

    // 4. Send the saved database row back to React
    res.status(201).json({
      message: "Booking successfully saved!",
      booking: result.rows[0]
    });
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
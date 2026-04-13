-- Drop the table if it already exists so we can start fresh
DROP TABLE IF EXISTS bookings;

-- Create our new table matching your React form
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert one test row just to make sure it works
INSERT INTO bookings (name, email, date)
VALUES ('Test User', 'test@example.com', '2026-05-01');
// backend/index.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); // Important to parse JSON body

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // replace with your MySQL password
    database: 'signup' // replace with your DB name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

// ==================== SIGNUP ====================
app.post('/signup', async (req, res) => {
    console.log("Request body:", req.body); // <-- Debug log

    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword); // Debug log
        console.log("Full hashed password:", hashedPassword);

        const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
        const values = [name, email, hashedPassword];

        db.query(sql, [values], (err, data) => {
            if (err) {
                console.error("DB Insert Error:", err);
                return res.status(500).json({ message: "Error during sign-up." });
            }
            return res.status(200).json({ message: "Sign-up successful!" });
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server error." });
    }
});



// ==================== LOGIN ====================
app.post("/login", (req, res) => {
  console.log("Login request body:", req.body); // Log the incoming request
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.error("DB Select Error:", err);
      return res.status(500).json({ message: "Error during login." });
    }

    console.log("Query result:", data); // Log the database query result
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, data[0].password);
      console.log("Password valid:", isPasswordValid); // Log password validation result
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      return res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      console.error("Password comparison error:", error);
      return res.status(500).json({ message: "Server error during login." });
    }
  });
});

// ==================== INFORMATION ====================
// Endpoint to save account profile data
app.post('/signup', (req, res) => {
  const {
    fullName, dob, pronoun, nationality, city, address,
    email, phone, linkedin, portfolio,
    education, university, graduationYear,
    technicalSkills, softSkills
  } = req.body;

  const sql = `INSERT INTO user_profiles 
  (fullName, dob, pronoun, nationality, city, address,
   email, phone, linkedin, portfolio,
   education, university, graduationYear,
   technicalSkills, softSkills)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    fullName, dob, pronoun, nationality, city, address,
    email, phone, linkedin, portfolio,
    education, university, graduationYear,
    technicalSkills, softSkills
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Profile saved successfully!" });
  });
});

app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});


// ==================== START SERVER ====================
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

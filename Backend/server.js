const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");
;

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// ==================== DATABASE CONNECTION ====================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Your MySQL password
  database: "signup", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

// ==================== LOAD QUESTIONS ====================
let questions = [];
try {
  questions = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
  console.log(`📘 Loaded ${questions.length} questions`);
} catch (err) {
  console.error("⚠️ Failed to load questions.json:", err.message);
}

// ==================== SIGNUP API ====================
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [name, email, hashedPassword];

    db.query(sql, [values], (err) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).json({ message: "Error during sign-up." });
      }
      res.status(200).json({ message: "Sign-up successful!" });
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// ==================== LOGIN API ====================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.error("DB Select Error:", err);
      return res.status(500).json({ message: "Error during login." });
    }

    if (data.length === 0)
      return res.status(404).json({ message: "User not found." });

    try {
      const isPasswordValid = await bcrypt.compare(password, data[0].password);
      if (!isPasswordValid)
        return res.status(401).json({ message: "Invalid credentials." });

      res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      console.error("Password comparison error:", error);
      res.status(500).json({ message: "Server error during login." });
    }
  });
});
// ==================== PROFILE SAVE API ====================
app.post('/save-profile', (req, res) => {
    const {
        fullName, dob, pronoun, nationality, city, address,
        email, phone, linkedin, portfolio,
        education, university, graduationYear,
        technicalSkills, softSkills
    } = req.body;

    if (!fullName || !dob || !email)
        return res.status(400).json({ message: "Full Name, Date of Birth, and Email are required." });

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

    db.query(sql, values, (err) => {
        if (err) {
            console.error("DB Insert Error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Profile saved successfully!" });
    });
});

// ==================== PROFILE SAVE / UPDATE API ====================
app.post("/api/profile", (req, res) => {
  const { name, email, department, course, session, image } = req.body;

  if (!name || !email)
    return res.status(400).json({ error: "Name and Email required" });

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      const updateQuery = `
        UPDATE users 
        SET name=?, department=?, course=?, session=?, image=? 
        WHERE email=?`;
      db.query(updateQuery, [name, department, course, session, image, email], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ message: "Profile updated successfully" });
      });
    } else {
      const insertQuery = `
        INSERT INTO users (name, email, department, course, session, image)
        VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(insertQuery, [name, email, department, course, session, image], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ message: "Profile saved successfully" });
      });
    }
  });
});

// ==================== FETCH PROFILE BY EMAIL ====================
app.get("/api/profile/:email", (req, res) => {
  const { email } = req.params;
  const selectQuery = "SELECT * FROM users WHERE email = ?";
  db.query(selectQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(results[0]);
  });
});

// ==================== QUIZ USER REGISTRATION ====================
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  // Step 1️⃣: Check if email already exists
  const checkQuery = "SELECT * FROM quizusers WHERE email = ?";
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error("DB Check Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Step 2️⃣: Hash password and insert
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery =
        "INSERT INTO quizusers (name, email, password) VALUES (?, ?, ?)";
      db.query(insertQuery, [name, email, hashedPassword], (err2) => {
        if (err2) {
          console.error("Insert Error:", err2);
          return res.status(500).json({ message: "Database insert error" });
        }
        res.status(201).json({ message: "Quiz user registered successfully" });
      });
    } catch (error) {
      console.error("Hashing Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
});


// ==================== QUIZ LOGIN API ====================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const sql = "SELECT * FROM quizusers WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    try {
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      console.error("Password Compare Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
});


// ==================== START SERVER ====================
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

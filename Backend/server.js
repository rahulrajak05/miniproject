const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// ==================== DATABASE CONNECTION ====================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'signup' // Replace with your DB name
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
    console.log(`✅ Loaded ${questions.length} questions`);
} catch (err) {
    console.error("⚠️ Failed to load questions.json:", err.message);
}

// Utility: Shuffle array
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// ==================== SIGNUP API ====================
app.post('/signup', async (req, res) => {
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

// ==================== QUESTIONS API ====================
// app.get("/api/questions", (req, res) => {
//     if (!questions.length) {
//         return res.status(500).json({ message: "No questions found." });
//     }

//     const shuffled = shuffleArray(questions);
//     const randomSet = shuffled.slice(0, 5);
//     res.json(randomSet);
// });

// ==================== SERVER START ====================
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

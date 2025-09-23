const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // your DB user
  password: "password",// your DB password
  database: "gymdb"    // your DB name
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Save membership data
app.post("/api/membership", (req, res) => {
  const {
    membershipId,
    selectedPlan,
    price,
    shift,
    paymentMethod,
    formData,
    dateTime
  } = req.body;

  const sql = `
    INSERT INTO memberships 
    (membershipId, selectedPlan, price, shift, paymentMethod, name, email, phone, aadhar, address, joiningDate, dateTime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    membershipId,
    selectedPlan,
    price,
    shift,
    paymentMethod,
    formData.name,
    formData.email,
    formData.phone,
    formData.aadhar,
    formData.address,
    formData.joiningDate,
    dateTime
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Database insert failed");
    }
    res.status(200).send("Membership saved");
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));

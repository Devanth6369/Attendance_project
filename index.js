const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

// Dummy student data
const students = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Isaac", "Jack"];
const teacherEmail = "teacher@example.com"; // Change to the actual teacher's email

// API endpoint to fetch student data
app.get("/students", (req, res) => {
    res.json(students);
});

// API endpoint to handle attendance submission
app.post("/submit-attendance", async (req, res) => {
    const absentStudents = req.body.absentStudents;

    if (absentStudents.length === 0) {
        return res.status(200).send("No absentees today!");
    }

    // Configure nodemailer
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sibaathahmed@gmail.com", // Replace with your email
            pass: "sibaath@2004", // Replace with your email password or app password
        },
    });

    let mailOptions = {
        from: "sibaathahmed@gmail.com",
        to: teacherEmail,
        subject: "Attendance Report",
        text: `Absent Students: ${absentStudents.join(", ")}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Attendance submitted successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send attendance report.");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

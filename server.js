const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // To use environment variables

const app = express();
const port = process.env.PORT || 3001; // Changed port to 3001

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, contact, message } = req.body;

    // Validate input
    if (!name || !email || !contact || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create transporter object for Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "creativesbynoopur@gmail.com", // Recipient email address
      subject: "New Contact Form Submission",
      text: `You have received a new message from ${name} (${email}, ${contact}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

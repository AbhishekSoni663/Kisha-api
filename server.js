const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, contact, message } = req.body;

  if (!name || !email || !contact || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "creativesbynoopur@gmail.com",
    subject: "New Contact Form Submission",
    text: `You have received a new message from ${name} (${email}, ${contact}):\n\n${message}`,
  };

  try {
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

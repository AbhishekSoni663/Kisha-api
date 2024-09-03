const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, contact, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "creativesbynoopur@gmail.com", // Recipient's email address
    subject: "New Contact Form Submission",
    text: `You have received a new message from ${name} (${email}, ${contact}):\n\n${message}`, // Include contact in the email body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Failed to send email" });
    }
    res.status(200).json({ message: "Email sent successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

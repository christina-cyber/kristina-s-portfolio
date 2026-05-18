import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3001;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: clientOrigin, methods: ["POST"] }));
app.use(express.json({ limit: "200kb" }));

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
const gmailTo = process.env.GMAIL_TO || gmailUser;
const transporter =
  gmailUser && gmailAppPassword
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      })
    : null;

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (!transporter || !gmailTo) {
    console.error("Missing Gmail configuration. Check GMAIL_USER/GMAIL_APP_PASSWORD.");
    return res.status(500).json({ error: "Email service is not configured." });
  }

  try {
    await transporter.sendMail({
      from: `"Owl Post" <${gmailUser}>`,
      to: gmailTo,
      replyTo: email,
      subject: `New Owl Post from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`Email server listening on http://localhost:${port}`);
});

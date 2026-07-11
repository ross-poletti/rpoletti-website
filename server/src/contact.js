import nodemailer from "nodemailer";

function cleanText(value) {
  return String(value || "").trim();
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function validateContact(body = {}) {
  // Honeypot field: real visitors never see or fill this in, bots usually do.
  if (cleanText(body.website)) {
    return { message: "Unable to process this submission." };
  }

  const contact = {
    name: cleanText(body.name),
    email: cleanText(body.email),
    message: cleanText(body.message)
  };

  if (!contact.name || !contact.email || !contact.message) {
    return { message: "Please fill in your name, email, and message." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return { message: "Please enter a valid email address." };
  }

  if (contact.message.length > 5000) {
    return { message: "Message is too long." };
  }

  return { contact };
}

function getTransporter() {
  return nodemailer.createTransport({
    host: requiredEnv("MAIL_HOST"),
    port: Number(process.env.MAIL_PORT || 587),
    secure: String(process.env.MAIL_SECURE).toLowerCase() === "true",
    auth: {
      user: requiredEnv("MAIL_USER"),
      pass: requiredEnv("MAIL_PASS")
    }
  });
}

export async function sendContactMessage(contact) {
  const transporter = getTransporter();

  await transporter.sendMail({
    to: requiredEnv("CONTACT_TO_EMAIL"),
    from: process.env.CONTACT_FROM_EMAIL || requiredEnv("MAIL_USER"),
    replyTo: contact.email,
    subject: `New contact form message from ${contact.name}`,
    text: `${contact.message}\n\nFrom: ${contact.name} <${contact.email}>`
  });
}

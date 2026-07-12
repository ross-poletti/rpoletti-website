import nodemailer from "nodemailer";

export const serviceTypes = [
  "Server Management",
  "Custom PC Build",
  "Computer Maintenance",
  "General Request",
  "Other"
];

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

export function validateServiceRequest(body = {}) {
  // Honeypot field: real visitors never see or fill this in, bots usually do.
  if (cleanText(body.website)) {
    return { message: "Unable to process this submission." };
  }

  const request = {
    name: cleanText(body.name),
    email: cleanText(body.email),
    phone: cleanText(body.phone),
    serviceType: cleanText(body.serviceType),
    message: cleanText(body.message)
  };

  const requiredFields = ["name", "email", "phone", "serviceType", "message"];
  const missingField = requiredFields.find((field) => !request[field]);

  if (missingField) {
    return { message: "Please fill in your name, email, phone, service type, and details." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) {
    return { message: "Please enter a valid email address." };
  }

  if (!serviceTypes.includes(request.serviceType)) {
    return { message: "Please select a valid service type." };
  }

  if (request.message.length > 5000) {
    return { message: "Message is too long." };
  }

  return { request };
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

export async function sendServiceRequest(request) {
  const transporter = getTransporter();

  await transporter.sendMail({
    to: process.env.SERVICE_REQUEST_TO_EMAIL || requiredEnv("CONTACT_TO_EMAIL"),
    from: process.env.SERVICE_REQUEST_FROM_EMAIL || requiredEnv("MAIL_USER"),
    replyTo: request.email,
    subject: `New service request from ${request.name}: ${request.serviceType}`,
    text: [
      request.message,
      "",
      `From: ${request.name} <${request.email}>`,
      `Phone: ${request.phone}`,
      `Service: ${request.serviceType}`
    ].join("\n")
  });
}

import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sendContactMessage, validateContact } from "./contact.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const { contact, message: validationError } = validateContact(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    await sendContactMessage(contact);
    res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact message failed:", error);
    res.status(500).json({
      message: "The message could not be sent right now. Please try again later."
    });
  }
});

app.use(express.static(clientDistPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(port, () => {
  console.log(`rpoletti-website listening on port ${port}`);
});

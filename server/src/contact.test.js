import test from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "./contact.js";

test("validateContact requires name, email, and message", () => {
  const { message, contact } = validateContact({ name: "", email: "", message: "" });
  assert.equal(message, "Please fill in your name, email, and message.");
  assert.equal(contact, undefined);
});

test("validateContact rejects malformed email addresses", () => {
  const { message } = validateContact({
    name: "Ada",
    email: "not-an-email",
    message: "Hello there"
  });
  assert.equal(message, "Please enter a valid email address.");
});

test("validateContact rejects overly long messages", () => {
  const { message } = validateContact({
    name: "Ada",
    email: "ada@example.com",
    message: "x".repeat(5001)
  });
  assert.equal(message, "Message is too long.");
});

test("validateContact rejects honeypot submissions", () => {
  const { message } = validateContact({
    name: "Bot",
    email: "bot@example.com",
    message: "spam",
    website: "http://spam.example.com"
  });
  assert.equal(message, "Unable to process this submission.");
});

test("validateContact returns a trimmed contact on success", () => {
  const { contact, message } = validateContact({
    name: "  Ada Lovelace  ",
    email: " ada@example.com ",
    message: " Hello there "
  });

  assert.equal(message, undefined);
  assert.deepEqual(contact, {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Hello there"
  });
});

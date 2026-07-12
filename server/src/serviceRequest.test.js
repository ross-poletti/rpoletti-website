import test from "node:test";
import assert from "node:assert/strict";
import { validateServiceRequest } from "./serviceRequest.js";

test("validateServiceRequest requires name, email, phone, service type, and message", () => {
  const { message, request } = validateServiceRequest({});
  assert.equal(message, "Please fill in your name, email, phone, service type, and details.");
  assert.equal(request, undefined);
});

test("validateServiceRequest rejects malformed email addresses", () => {
  const { message } = validateServiceRequest({
    name: "Ada",
    email: "not-an-email",
    phone: "555-1234",
    serviceType: "Custom PC Build",
    message: "Need a new build"
  });
  assert.equal(message, "Please enter a valid email address.");
});

test("validateServiceRequest rejects unknown service types", () => {
  const { message } = validateServiceRequest({
    name: "Ada",
    email: "ada@example.com",
    phone: "555-1234",
    serviceType: "Lawn Mowing",
    message: "Need a new build"
  });
  assert.equal(message, "Please select a valid service type.");
});

test("validateServiceRequest rejects honeypot submissions", () => {
  const { message } = validateServiceRequest({
    name: "Bot",
    email: "bot@example.com",
    phone: "555-1234",
    serviceType: "Other",
    message: "spam",
    website: "http://spam.example.com"
  });
  assert.equal(message, "Unable to process this submission.");
});

test("validateServiceRequest returns a trimmed request on success", () => {
  const { request, message } = validateServiceRequest({
    name: "  Ada Lovelace  ",
    email: " ada@example.com ",
    phone: " 555-1234 ",
    serviceType: "Server Management",
    message: " Need help with my home server "
  });

  assert.equal(message, undefined);
  assert.deepEqual(request, {
    name: "Ada Lovelace",
    email: "ada@example.com",
    phone: "555-1234",
    serviceType: "Server Management",
    message: "Need help with my home server"
  });
});

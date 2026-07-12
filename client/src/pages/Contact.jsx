import { useState } from "react";

const initialForm = { name: "", email: "", message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState("");

  function updateField(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setErrorText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <section className="page">
      <h2>Contact</h2>
      <form className="panel contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={updateField("website")}
          autoComplete="off"
          tabIndex={-1}
          className="honeypot"
          aria-hidden="true"
        />

        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={updateField("name")}
          />
        </div>

        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={updateField("email")}
          />
        </div>

        <div className="field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={form.message}
            onChange={updateField("message")}
          />
        </div>

        <button type="submit" className="button button-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" ? (
          <div className="status-card">Thank you — your message has been sent.</div>
        ) : null}
        {status === "error" ? <div className="status-card error">{errorText}</div> : null}
      </form>
    </section>
  );
}

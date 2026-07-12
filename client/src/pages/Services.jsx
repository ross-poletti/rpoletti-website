import { useState } from "react";

const offerings = [
  {
    name: "Server Management",
    description: "Setup, maintenance, and monitoring for small home or business servers."
  },
  {
    name: "Custom PC Builds",
    description: "Custom-configured and built to your needs and budget, from gaming rigs to home servers."
  },
  {
    name: "Computer Maintenance",
    description: "Troubleshooting, upgrades, performance tuning, and repairs to keep your systems running reliably."
  }
];

const serviceTypes = [
  "Server Management",
  "Custom PC Build",
  "Computer Maintenance",
  "General Request",
  "Other"
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  serviceType: serviceTypes[0],
  message: "",
  website: ""
};

export default function Services() {
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
      const response = await fetch("/api/service-request", {
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
      <h2>Services</h2>
      <p className="page-intro">
        {/* EDIT ME: adjust the service area / description as you see fit. */}
        I provide personal technology services across California's Central Coast,
        including server management, and custom PC builds and maintenance.
      </p>

      <div className="project-grid">
        {offerings.map((offering) => (
          <article className="panel project-card" key={offering.name}>
            <h3>{offering.name}</h3>
            <p>{offering.description}</p>
          </article>
        ))}
      </div>

      <h3 className="subsection-heading">Request a Service</h3>
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
          <label htmlFor="service-name">Name</label>
          <input id="service-name" required value={form.name} onChange={updateField("name")} />
        </div>

        <div className="field">
          <label htmlFor="service-email">Email</label>
          <input
            id="service-email"
            type="email"
            required
            value={form.email}
            onChange={updateField("email")}
          />
        </div>

        <div className="field">
          <label htmlFor="service-phone">Phone</label>
          <input
            id="service-phone"
            type="tel"
            required
            value={form.phone}
            onChange={updateField("phone")}
          />
        </div>

        <div className="field">
          <label htmlFor="service-type">Service Type</label>
          <select id="service-type" value={form.serviceType} onChange={updateField("serviceType")}>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="service-message">Details</label>
          <textarea
            id="service-message"
            required
            rows={5}
            value={form.message}
            onChange={updateField("message")}
          />
        </div>

        <button type="submit" className="button button-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Request Service"}
        </button>

        {status === "success" ? (
          <div className="status-card">
            Thank you for your request. I will respond as soon as possible.
          </div>
        ) : null}
        {status === "error" ? <div className="status-card error">{errorText}</div> : null}
      </form>
    </section>
  );
}

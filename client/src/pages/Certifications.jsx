// EDIT ME: add a "date" (e.g. "Earned 2025") or a verify link to any entry if you want it shown.
const certifications = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    description:
      "Validates baseline skills in network security, threats and vulnerabilities, and risk management."
  },
  {
    name: "CompTIA A+",
    issuer: "CompTIA",
    description:
      "Validates core skills in hardware, networking, operating systems, and troubleshooting."
  },
  {
    name: "Certified Coach",
    issuer: "USA Swimming",
    description: "Certification required to coach competitive swimmers under USA Swimming."
  },
  {
    name: "Administrative Official",
    issuer: "USA Swimming",
    description: "Handles meet administration and entry processing for sanctioned swim competitions.",
    status: "In Progress"
  }
];

function CertCard({ cert }) {
  return (
    <article className="panel cert-card">
      <div className="cert-card-header">
        <span className="cert-issuer">{cert.issuer}</span>
        {cert.status ? <span className="cert-status">{cert.status}</span> : null}
      </div>
      <h3>{cert.name}</h3>
      <p>{cert.description}</p>
    </article>
  );
}

export default function Certifications() {
  return (
    <section className="page">
      <h2>Certifications</h2>
      <div className="cert-grid">
        {certifications.map((cert) => (
          <CertCard key={cert.name} cert={cert} />
        ))}
      </div>
    </section>
  );
}

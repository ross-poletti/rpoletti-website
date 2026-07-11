const infra = [
  { label: "Orchestration", value: "K3s cluster, GitOps-managed with FluxCD" },
  { label: "Git & CI", value: "Self-hosted Gitea, mirrored to GitHub Actions" },
  { label: "Registry", value: "Images built and pushed to GHCR on every merge" },
  { label: "Rollout", value: "Keel polls the registry and redeploys automatically" },
  { label: "Ingress", value: "Cloudflare Tunnels — no ports exposed to the internet" }
];

export default function Homelab() {
  return (
    <section id="homelab" className="section">
      <h2>Homelab</h2>
      <p className="section-intro">
        This site — and everything else I build — runs on a small self-hosted K3s
        cluster. {/* EDIT ME: add hardware/setup detail here if you want. */}
      </p>
      <div className="infra-grid">
        {infra.map((item) => (
          <div className="panel infra-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

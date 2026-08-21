// EDIT ME: add a repoUrl to any entry to show a "View source" link on that card.
const projects = [
  {
    name: "Poletti Pump Service",
    description:
      "Marketing site and service-inquiry form built for a local pump and well service company.",
    stack: ["Node.js", "Express", "Nodemailer"],
    repoUrl: null
  },
  {
    name: "Car Maintenance Log",
    description:
      "Self-hosted vehicle maintenance tracker that reads live from Google Sheets and calculates upcoming maintenance due dates.",
    stack: ["React", "Vite", "Express"],
    repoUrl: null
  }
];

const hardware = [
  { label: "Location", value: "Home server rack" },
  { label: "Cluster Nodes", value: "3x Dell OptiPlex, running Debian + K3s" },
  { label: "Hypervisor", value: "Proxmox VE" },
  { label: "Storage", value: "NAS running Unraid" }
];

const services = [
  { label: "Orchestration", value: "K3s cluster, GitOps-managed with FluxCD" },
  { label: "Routing & Firewall", value: "pfSense, virtualized on Proxmox" },
  { label: "Network Monitoring", value: "LibreNMS, virtualized on Proxmox" },
  { label: "Game Server", value: "Minecraft server, virtualized on Proxmox" },
  { label: "Photo & Video Backup", value: "Immich, self-hosted on the K3s cluster" },
  { label: "Git & CI", value: "Self-hosted Gitea, mirrored to GitHub Actions" },
  { label: "Registry", value: "Images built and pushed to GHCR on every merge" },
  { label: "Rollout", value: "Keel polls the registry and redeploys automatically" },
  { label: "Ingress", value: "Cloudflare Tunnel — no ports exposed to the internet" }
];

function ProjectCard({ project }) {
  return (
    <article className="panel project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <ul className="tag-list">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {project.repoUrl ? (
        <a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer">
          View source &rarr;
        </a>
      ) : null}
    </article>
  );
}

function InfraGrid({ items }) {
  return (
    <div className="infra-grid">
      {items.map((item) => (
        <div className="panel infra-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section className="page">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <h3 className="subsection-heading">Homelab</h3>
      <p className="page-intro">
        Self-hosted infrastructure built around three Dell OptiPlex nodes running
        Debian and K3s, which host everything I build and deploy — including this
        site — alongside a separate Proxmox server for virtualization and a NAS for
        storage.
      </p>

      <h4 className="subsection-heading nested">Hardware</h4>
      <InfraGrid items={hardware} />

      <h4 className="subsection-heading nested">Services</h4>
      <InfraGrid items={services} />
    </section>
  );
}

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
      "Self-hosted vehicle maintenance tracker that reads live from Google Sheets and works out what's due next.",
    stack: ["React", "Vite", "Express"],
    repoUrl: null
  },
  {
    name: "Homelab GitOps",
    description:
      "The Flux/K3s setup that builds and deploys every project on this page, including this site.",
    stack: ["K3s", "FluxCD", "Gitea", "Cloudflare Tunnel"],
    repoUrl: null
  }
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

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

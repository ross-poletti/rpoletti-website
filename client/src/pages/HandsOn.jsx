// EDIT ME: add your real hands-on projects here — what you worked on, what you did,
// and the outcome. One entry per project; `tags` is optional.
const handsOnProjects = [
  {
    name: "Vehicle Maintenance & Repair",
    category: "Vehicles",
    description: "Hands-on maintenance and repair work on my own vehicles.",
    tags: ["Maintenance", "Repair"]
  }
];

function HandsOnCard({ project }) {
  return (
    <article className="panel project-card">
      <span className="cert-issuer">{project.category}</span>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {project.tags?.length ? (
        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function HandsOn() {
  return (
    <section className="page">
      <h2>Hands-On Projects</h2>
      <p className="page-intro">
        Beyond software, I like working with my hands — vehicle maintenance and
        repair, and other physical builds.
      </p>
      {handsOnProjects.length ? (
        <div className="project-grid">
          {handsOnProjects.map((project) => (
            <HandsOnCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <p className="page-intro">More project write-ups coming soon.</p>
      )}
    </section>
  );
}

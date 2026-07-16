const experience = [
  {
    role: "IT Technician",
    company: "Redwire",
    period: "Aug 2024 – Present",
    location: "San Luis Obispo, CA · Part-time",
    description: "Supporting IT infrastructure on-site, part-time alongside coursework.",
    skills: ["Information Technology Infrastructure"]
  },
  {
    role: "Information Technology Intern",
    company: "Redwire",
    period: "May 2024 – Aug 2024",
    location: "Part-time",
    description: "IT infrastructure internship supporting hardware deployment and end-user support.",
    skills: ["Dell Computers", "Laptops"]
  },
  {
    role: "Swim Coach",
    company: "SLO Swim Club",
    period: "Jun 2024 – Present",
    location: "Part-time",
    description: "Coaching age-group and masters swimmers, including meet-day operations.",
    skills: ["USA Swimming Certified Coach", "Working with Children", "Sports Coaching"]
  },
  {
    role: "Warehouse Team Member",
    company: "Farm Supply Company",
    period: "Jun 2021 – May 2024",
    location: "Part-time",
    description: "Fulfilled customer orders of pet and ranch supplies and managed inventory levels.",
    skills: ["Warehouse Operations", "Forklift Operation"]
  }
];

function ExperienceItem({ item }) {
  return (
    <article className="panel experience-item">
      <div className="experience-header">
        <div>
          <h3 className="experience-role">{item.role}</h3>
          <span className="experience-company">{item.company}</span>
        </div>
        <span className="experience-period">{item.period}</span>
      </div>
      <p className="experience-description">{item.description}</p>
      <ul className="tag-list">
        {item.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  return (
    <section className="page">
      <h2>Experience</h2>
      <div className="experience-list">
        {experience.map((item) => (
          <ExperienceItem key={`${item.company}-${item.role}`} item={item} />
        ))}
      </div>
    </section>
  );
}

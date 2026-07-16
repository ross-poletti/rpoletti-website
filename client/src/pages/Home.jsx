import { Link } from "react-router-dom";
import { posts } from "../data/posts.js";

// EDIT ME: adjust to whatever you want surfaced in the sidebar's quick-facts panel.
const quickFacts = [
  { label: "Studying", value: "Computer Engineering, Cal Poly" },
  { label: "Currently", value: "IT Technician at Redwire" },
  { label: "Location", value: "San Luis Obispo, CA" },
  { label: "Certified", value: "CompTIA Security+, A+" }
];

const recentPosts = posts.slice(0, 3);

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default function Home() {
  return (
    <div className="home-layout">
      <div className="home-main">
        <section className="hero">
          <p className="eyebrow">$ whoami</p>
          <h1>Ross Poletti</h1>
          <p className="hero-tagline">
            Cal Poly Computer Engineering student, IT technician, and self-hosted
            infrastructure enthusiast.
          </p>
          <p className="hero-body">
            {/* EDIT ME: a sentence or two on what you're building, studying, or into right now. */}
            My work spans coursework, client projects, and the self-hosted
            infrastructure I design and maintain independently.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">
              View Projects
            </Link>
            <Link className="button button-secondary" to="/contact">
              Get in Touch
            </Link>
          </div>
        </section>

        <section className="home-posts">
          <div className="home-posts-header">
            <h2>Latest from the blog</h2>
            <Link className="project-link" to="/blog">
              View all &rarr;
            </Link>
          </div>
          {recentPosts.length ? (
            <div className="blog-list">
              {recentPosts.map((post) => (
                <article className="panel blog-item" key={post.slug}>
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <h3>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="page-intro">No posts yet — check back soon.</p>
          )}
        </section>
      </div>

      <aside className="home-sidebar">
        <div className="panel sidebar-card">
          {/* EDIT ME: swap this for a real photo — drop an image in client/public
             and replace the initials div below with an <img>. */}
          <div className="avatar" aria-hidden="true">
            RP
          </div>
          <h3>Ross Poletti</h3>
          <p className="sidebar-tagline">Computer Engineering student &amp; IT technician</p>
          <p className="sidebar-bio">
            Cal Poly student based in San Luis Obispo, currently serving as an IT
            Technician at Redwire and a swim coach at SLO Swim Club.
          </p>
        </div>

        <div className="panel sidebar-card">
          <h3 className="sidebar-heading">Quick Facts</h3>
          <dl className="fact-list">
            {quickFacts.map((fact) => (
              <div className="fact-row" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}

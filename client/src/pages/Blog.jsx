import { Link } from "react-router-dom";
import { posts } from "../data/posts.js";

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default function Blog() {
  return (
    <section className="page">
      <h2>Blog</h2>
      {posts.length ? (
        <div className="blog-list">
          {posts.map((post) => (
            <article className="panel blog-item" key={post.slug}>
              <span className="blog-date">{formatDate(post.date)}</span>
              <h3>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
              <Link className="project-link" to={`/blog/${post.slug}`}>
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="page-intro">No posts yet — check back soon.</p>
      )}
    </section>
  );
}

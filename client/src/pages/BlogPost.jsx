import { Link, useParams } from "react-router-dom";
import { posts } from "../data/posts.js";

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <section className="page">
        <h2>Post not found</h2>
        <p className="page-intro">
          That post doesn't exist. <Link to="/blog">Back to the blog</Link>.
        </p>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="blog-post-header">
        <Link className="project-link" to="/blog">
          &larr; Back to Blog
        </Link>
        <span className="blog-date">{formatDate(post.date)}</span>
        <h2>{post.title}</h2>
      </div>
      <div className="panel blog-post">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

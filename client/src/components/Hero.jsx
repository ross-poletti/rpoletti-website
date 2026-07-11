export default function Hero() {
  return (
    <section id="home" className="hero">
      <p className="eyebrow">$ whoami</p>
      <h1>Ross Poletti</h1>
      <p className="hero-tagline">
        Cal Poly Computer Engineering student, IT technician, and homelab tinkerer.
      </p>
      <p className="hero-body">
        {/* EDIT ME: a sentence or two on what you're building, studying, or into right now. */}
        I build things for coursework, for other people, and for a small Kubernetes
        cluster that lives in my closet.
      </p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">
          View Projects
        </a>
        <a className="button button-secondary" href="#contact">
          Get in Touch
        </a>
      </div>
    </section>
  );
}

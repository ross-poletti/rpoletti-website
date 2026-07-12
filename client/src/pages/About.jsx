export default function About() {
  return (
    <section className="page">
      <h2>About</h2>
      <div className="panel about-panel">
        <p>
          Cal Poly Computer Engineering student based in San Luis Obispo, currently
          working part-time as an IT Technician at Redwire, a role I started as an
          intern in 2024. I also coach age-group and masters swimmers at SLO Swim
          Club, and spent three years in warehouse operations at Farm Supply Company
          before that.
        </p>
        <p>
          {/* EDIT ME: add anything more personal you want here — interests, what
             drew you to engineering, etc. */}
          Outside of coursework and work, I develop personal software projects and
          deploy them on a self-hosted Kubernetes cluster.
        </p>
      </div>
    </section>
  );
}

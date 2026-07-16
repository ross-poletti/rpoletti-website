import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/certifications", label: "Certifications" },
  { to: "/projects", label: "Projects" },
  { to: "/hands-on", label: "Hands-On" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" }
];

export default function Nav() {
  return (
    <header className="site-nav">
      <Link to="/" className="brand">
        ross@poletti:~$<span className="cursor" aria-hidden="true" />
      </Link>
      <nav>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={({ isActive }) => (isActive ? "active" : undefined)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

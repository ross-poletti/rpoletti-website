const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#homelab", label: "Homelab" },
  { href: "#contact", label: "Contact" }
];

export default function Nav() {
  return (
    <header className="site-nav">
      <a href="#home" className="brand">
        ross@poletti:~$<span className="cursor" aria-hidden="true" />
      </a>
      <nav>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

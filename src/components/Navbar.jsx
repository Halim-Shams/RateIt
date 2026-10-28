import { Link, NavLink } from "react-router-dom";
import { Star, Search, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="RateIt home">
          <span className="brand-mark"><Star size={17} fill="currentColor" /></span>
          <span>Rate<span>It</span></span>
        </Link>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={22} /></button>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/explore" onClick={() => setMenuOpen(false)}>Explore</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        </nav>
        <Link to="/explore" className="nav-search" aria-label="Search facilities"><Search size={19} /></Link>
      </div>
    </header>
  );
}
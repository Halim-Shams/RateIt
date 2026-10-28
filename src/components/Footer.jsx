import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/" className="brand footer-brand"><span className="brand-mark"><Star size={15} fill="currentColor" /></span><span>Rate<span>It</span></span></Link>
        <p>Better campus choices, together.</p>
        <div className="footer-links"><Link to="/explore">Explore</Link><Link to="/about">About</Link><Link to="/about#guidelines">Community Guidelines</Link></div>
        <span className="footer-note">NJUPT · Student project</span>
      </div>
    </footer>
  );
}
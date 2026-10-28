import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Sparkles, ShieldCheck, Users } from "lucide-react";
import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";
import FacilityCard from "../components/FacilityCard";
import SectionHeading from "../components/SectionHeading";

export default function HomePage({ facilities }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const popular = [...facilities].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const recent = [...facilities].slice(4, 8);
  function search(event) {
    event.preventDefault();
    navigate(`/explore${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  }
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker"><Sparkles size={15} /> MADE FOR CAMPUS LIFE</span>
            <h1>Your campus.<br />Your experience.<br /><span>Your ratings.</span></h1>
            <p>Discover and review campus facilities and services at NJUPT. Help everyone make better choices.</p>
            <form className="hero-search" onSubmit={search}>
              <Search size={19} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cafeterias, libraries, gyms, and more..." aria-label="Search facilities" />
              <button type="submit" aria-label="Search"><Search size={18} /><span>Search</span></button>
            </form>
            <div className="hero-trust"><span><ShieldCheck size={15} /> Student-focused feedback</span><span><Users size={15} /> Community-powered</span></div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85" alt="University campus buildings" />
            <div className="hero-note"><span className="hero-note-icon">★</span><div><strong>Make campus better</strong><span>One review at a time</span></div></div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <SectionHeading eyebrow="FIND YOUR SPOT" title="Browse by category" description="Explore the places and services that make campus life easier." />
        <div className="category-grid">{categories.map((category) => <CategoryCard key={category.name} category={category} />)}</div>
      </section>

      <section className="container section-block">
        <SectionHeading eyebrow="STUDENT FAVORITES" title="Popular facilities" description="Places students are checking out and reviewing." action={<Link to="/explore" className="link-arrow">Explore all <ArrowRight size={16} /></Link>} />
        <div className="facility-grid">{popular.map((facility) => <FacilityCard key={facility.id} facility={facility} />)}</div>
      </section>

      <section className="recent-section">
        <div className="container section-block">
          <SectionHeading eyebrow="FRESH FEEDBACK" title="Explore more campus spots" action={<Link to="/explore" className="link-arrow">See all places <ArrowRight size={16} /></Link>} />
          <div className="recent-grid">{recent.map((facility) => <FacilityCard key={facility.id} facility={facility} compact />)}</div>
        </div>
      </section>

      <section className="container cta-section">
        <div><span className="eyebrow">YOUR VOICE MATTERS</span><h2>Know a place students should rate?</h2><p>Explore campus facilities and share helpful, respectful feedback with the community.</p></div>
        <Link to="/explore" className="button button-primary">Explore facilities <ArrowRight size={16} /></Link>
      </section>
    </>
  );
}
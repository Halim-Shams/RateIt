import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { categories } from "../data/categories";
import FacilityCard from "../components/FacilityCard";

export default function ExplorePage({ facilities }) {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All Categories");
  const [sort, setSort] = useState("highest");
  const [minimum, setMinimum] = useState("all");

  const filtered = useMemo(() => {
    let result = facilities.filter((facility) => {
      const term = query.toLowerCase();
      const matchesQuery = !term || `${facility.name} ${facility.category} ${facility.location}`.toLowerCase().includes(term);
      const matchesCategory = category === "All Categories" || facility.category === category;
      const matchesRating = minimum === "all" || facility.rating >= Number(minimum);
      return matchesQuery && matchesCategory && matchesRating;
    });
    if (sort === "highest") result.sort((a, b) => b.rating - a.rating);
    if (sort === "reviews") result.sort((a, b) => b.reviewCount - a.reviewCount);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [facilities, query, category, sort, minimum]);

  return (
    <div className="container page-container">
      <div className="page-title-row"><div><span className="eyebrow">DISCOVER YOUR CAMPUS</span><h1>Explore facilities</h1><p>Find and compare campus facilities and services. See what other students think.</p></div><div className="results-pill"><MapPin size={15} /> NJUPT campus</div></div>
      <div className="explore-layout">
        <aside className="filter-panel">
          <div className="filter-title"><SlidersHorizontal size={17} /><strong>Filters</strong><button onClick={() => { setCategory("All Categories"); setMinimum("all"); setQuery(""); setSort("highest"); }} className="text-button">Reset</button></div>
          <label className="field-label" htmlFor="category-filter">Category</label>
          <div className="select-wrap"><select id="category-filter" value={category} onChange={(e) => setCategory(e.target.value)}><option>All Categories</option>{categories.map((c) => <option key={c.name}>{c.name}</option>)}</select></div>
          <label className="field-label" htmlFor="rating-filter">Minimum rating</label>
          <div className="select-wrap"><select id="rating-filter" value={minimum} onChange={(e) => setMinimum(e.target.value)}><option value="all">Any rating</option><option value="4.5">4.5 and above</option><option value="4">4.0 and above</option><option value="3.5">3.5 and above</option><option value="3">3.0 and above</option></select></div>
          <div className="filter-note"><span>💡</span><p>Ratings are based on student reviews. Sample entries are included for this UI demo.</p></div>
        </aside>
        <div className="explore-results">
          <div className="explore-toolbar">
            <label className="search-input"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search facilities..." /></label>
            <label className="sort-control"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="highest">Highest rated</option><option value="reviews">Most reviewed</option><option value="name">Name (A–Z)</option></select></label>
          </div>
          <div className="results-caption"><strong>{filtered.length} facilities found</strong><span>{category === "All Categories" ? "All categories" : category}</span></div>
          {filtered.length ? <div className="facility-grid explore-grid">{filtered.map((facility) => <FacilityCard key={facility.id} facility={facility} />)}</div> : <div className="empty-state"><Search size={30} /><h3>No facilities found</h3><p>Try another search or reset your filters.</p><button className="button button-primary" onClick={() => { setQuery(""); setCategory("All Categories"); setMinimum("all"); }}>Clear filters</button></div>}
        </div>
      </div>
    </div>
  );
}
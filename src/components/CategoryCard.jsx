import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const Icon = category.icon;
  return (
    <Link to={`/explore?category=${encodeURIComponent(category.name)}`} className={`category-card category-${category.color}`}>
      <span className="category-icon"><Icon size={22} /></span>
      <strong>{category.name}</strong>
      <span className="category-description">{category.description}</span>
    </Link>
  );
}
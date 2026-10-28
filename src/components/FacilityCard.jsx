import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import RatingStars from "./RatingStars";

export default function FacilityCard({ facility, compact = false }) {
  return (
    <article className={`facility-card ${compact ? "compact-card" : ""}`}>
      <Link to={`/facility/${facility.id}`} className="facility-image-link" aria-label={`View ${facility.name}`}>
        <img className="facility-image" src={facility.image} alt={facility.name} loading="lazy" />
        <span className="image-category">{facility.category}</span>
      </Link>
      <div className="facility-card-body">
        <Link to={`/facility/${facility.id}`} className="facility-title">{facility.name}</Link>
        <div className="facility-category">{facility.category}</div>
        <div className="facility-rating-row"><RatingStars value={facility.rating} size={14} /><strong>{facility.rating.toFixed(1)}</strong><span>({facility.reviewCount} reviews)</span></div>
        <div className="facility-location"><MapPin size={13} /><span>{facility.location}</span></div>
        {!compact && <Link className="button button-outline card-button" to={`/facility/${facility.id}`}>View details <ArrowUpRight size={15} /></Link>}
      </div>
    </article>
  );
}
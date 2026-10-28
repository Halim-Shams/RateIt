import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, MapPin, ShieldCheck, Star, ThumbsUp } from "lucide-react";
import RatingStars from "../components/RatingStars";
import ReviewCard from "../components/ReviewCard";
import { categoryCriteria } from "../data/categories";

export default function FacilityDetailsPage({ facilities, reviewsByFacility }) {
  const { id } = useParams();
  const facility = facilities.find((item) => item.id === id);
  if (!facility) return <div className="container page-container"><div className="empty-state"><h2>Facility not found</h2><Link to="/explore" className="button button-primary">Back to explore</Link></div></div>;
  const reviews = [...(reviewsByFacility[id] || []), ...facility.reviews];
  const criteria = categoryCriteria[facility.category] || Object.keys(facility.criteria);
  return (
    <div className="container page-container details-page">
      <Link to="/explore" className="back-link"><ArrowLeft size={16} /> Back to explore</Link>
      <div className="detail-hero">
        <div className="detail-gallery"><img className="detail-main-image" src={facility.image} alt={facility.name} /><div className="gallery-thumbs">{(facility.gallery || [facility.image, facility.image, facility.image]).map((img, i) => <img key={i} src={img} alt={`${facility.name} view ${i + 1}`} />)}</div></div>
        <div className="detail-intro">
          <span className="category-badge">{facility.category}</span><h1>{facility.name}</h1>
          <div className="detail-location"><MapPin size={16} /> {facility.location} <span>·</span> {facility.distance}</div>
          <div className="detail-rating"><strong>{facility.rating.toFixed(1)}</strong><div><RatingStars value={facility.rating} size={19} /><span>{facility.reviewCount} reviews</span></div></div>
          <div className="detail-meta"><span><Clock size={16} /> {facility.hours}</span><span className="open-badge"><span className="status-dot" /> Hours may vary</span></div>
          <Link to={`/facility/${facility.id}/review`} className="button button-primary review-cta">Write a review <ArrowUpRight size={17} /></Link>
          <p className="anonymous-note"><ShieldCheck size={15} /> Keep feedback helpful and respectful.</p>
        </div>
      </div>
      <div className="details-columns">
        <div className="details-main-column">
          <section className="content-panel"><h2>About this place</h2><p className="description-text">{facility.description}</p><div className="info-strip"><span><MapPin size={17} /><span><strong>Location</strong><small>{facility.location}</small></span></span><span><Clock size={17} /><span><strong>Opening hours</strong><small>{facility.hours}</small></span></span></div></section>
          <section className="content-panel reviews-panel"><div className="panel-heading"><div><h2>Student reviews</h2><p>{reviews.length} reviews shared by the community</p></div><Link to={`/facility/${facility.id}/review`} className="link-arrow">Write a review <ArrowUpRight size={15} /></Link></div>{reviews.map((review) => <ReviewCard key={review.id} review={review} />)}</section>
        </div>
        <aside className="details-side-column">
          <section className="content-panel rating-breakdown"><h2>Rating breakdown</h2><p className="muted">Average scores by category</p>{criteria.map((criterion) => { const score = facility.criteria[criterion] ?? facility.rating; return <div className="breakdown-row" key={criterion}><span>{criterion}</span><div className="progress-track"><div style={{ width: `${score * 20}%` }} /></div><strong>{score.toFixed(1)}</strong></div>; })}<div className="score-summary"><Star size={19} fill="currentColor" /><span>Overall score</span><strong>{facility.rating.toFixed(1)} / 5</strong></div></section>
          <section className="guidelines-card"><ShieldCheck size={22} /><h3>Keep reviews useful</h3><p>Share specific experiences about the facility. Avoid personal attacks and private information.</p><Link to="/about#guidelines">Community guidelines <ArrowUpRight size={14} /></Link></section>
        </aside>
      </div>
    </div>
  );
}
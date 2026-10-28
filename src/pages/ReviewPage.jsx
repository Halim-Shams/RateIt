import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import RatingStars from "../components/RatingStars";
import { categoryCriteria } from "../data/categories";

export default function ReviewPage({ facilities, onSubmitReview }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const facility = facilities.find((item) => item.id === id);
  const [overall, setOverall] = useState(0);
  const [criteriaRatings, setCriteriaRatings] = useState({});
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!facility) return <div className="container page-container"><h2>Facility not found</h2><Link to="/explore">Explore facilities</Link></div>;
  const criteria = categoryCriteria[facility.category] || [];
  function submit(event) {
    event.preventDefault();
    if (!overall) return setError("Please choose an overall rating.");
    if (criteria.some((item) => !criteriaRatings[item])) return setError("Please rate each category before submitting.");
    if (comment.trim().length > 500) return setError("Please keep your review under 500 characters.");
    const ratingValues = Object.values(criteriaRatings);
    const review = {
      id: `local-${Date.now()}`,
      author: "Anonymous",
      date: "Just now",
      rating: overall,
      text: comment.trim() || "Submitted a rating without a written comment.",
      helpful: 0,
      criteria: criteriaRatings,
      categoryAverage: ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length,
    };
    onSubmitReview(facility.id, review);
    setSubmitted(true);
    setError("");
  }
  if (submitted) return <div className="container page-container"><div className="success-card"><span className="success-icon"><CheckCircle2 size={34} /></span><h1>Thanks for your feedback!</h1><p>Your review has been added to this demo session. In the connected version, reviews will be saved in the database.</p><Link to={`/facility/${facility.id}`} className="button button-primary">Back to facility</Link></div></div>;
  return (
    <div className="container page-container review-page">
      <Link to={`/facility/${facility.id}`} className="back-link"><ArrowLeft size={16} /> Back to facility</Link>
      <div className="review-page-header"><span className="eyebrow">SHARE YOUR EXPERIENCE</span><h1>Write a review</h1><p>Your feedback helps other students make better campus choices.</p></div>
      <form className="review-form content-panel" onSubmit={submit}>
        <div className="reviewing-facility"><img src={facility.image} alt="" /><div><strong>{facility.name}</strong><span>{facility.category} · {facility.location}</span></div><span className="category-badge">Campus facility</span></div>
        <div className="form-section"><h2>Overall rating <span className="required">*</span></h2><p>How was your experience?</p><div className="overall-picker"><RatingStars value={overall} interactive onChange={setOverall} size={32} label="Overall rating" /><strong>{overall ? `${overall} out of 5` : "Select a rating"}</strong></div></div>
        <div className="form-section"><h2>Rate by category <span className="required">*</span></h2><p>Rate the aspects that matter for this type of facility.</p><div className="criteria-list">{criteria.map((criterion) => <div className="criteria-item" key={criterion}><span>{criterion}</span><RatingStars value={criteriaRatings[criterion] || 0} interactive onChange={(value) => setCriteriaRatings((current) => ({ ...current, [criterion]: value }))} size={21} label={criterion} /></div>)}</div></div>
        <div className="form-section"><label htmlFor="review-comment" className="form-heading">Your review <span className="optional">(optional)</span></label><p>What should other students know? Please keep it specific and respectful.</p><textarea id="review-comment" maxLength={500} rows={5} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." /><div className="character-count">{comment.length}/500</div></div>
        <div className="anonymous-banner"><ShieldCheck size={20} /><div><strong>Anonymous in this demo</strong><p>No account is required in this UI prototype. Real submissions should be validated and moderated by the backend.</p></div></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="form-actions"><Link to={`/facility/${facility.id}`} className="button button-outline">Cancel</Link><button type="submit" className="button button-primary">Submit review</button></div>
      </form>
    </div>
  );
}
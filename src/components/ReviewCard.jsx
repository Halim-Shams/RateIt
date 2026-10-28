import { ThumbsUp, Flag } from "lucide-react";
import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-avatar">{(review.author || "A").slice(0, 1).toUpperCase()}</div>
      <div className="review-content">
        <div className="review-topline"><div><strong>{review.author || "Anonymous"}</strong><span>{review.date || "Just now"}</span></div><RatingStars value={review.rating} size={13} /></div>
        <p>{review.text}</p>
        <div className="review-actions"><button type="button" className="text-button"><ThumbsUp size={14} /> Helpful ({review.helpful ?? 0})</button><button type="button" className="text-button report-button"><Flag size={13} /> Report</button></div>
      </div>
    </article>
  );
}
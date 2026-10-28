import { Star } from "lucide-react";

export default function RatingStars({ value = 0, size = 15, interactive = false, onChange, label = "Rating" }) {
  return (
    <div className={`rating-stars ${interactive ? "interactive-stars" : ""}`} role={interactive ? "radiogroup" : "img"} aria-label={`${label}: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(value);
        return interactive ? (
          <button key={star} type="button" role="radio" aria-checked={value === star} aria-label={`${star} star${star > 1 ? "s" : ""}`} onClick={() => onChange(star)} className={`star-button ${star <= value ? "filled" : ""}`}>
            <Star size={size} fill={star <= value ? "currentColor" : "none"} />
          </button>
        ) : <Star key={star} size={size} className={filled ? "star-filled" : "star-empty"} fill={filled ? "currentColor" : "none"} />;
      })}
    </div>
  );
}
import { Link } from "react-router-dom";
import { Heart, Compass, Star, ShieldCheck, MessageSquareWarning, Users, ArrowRight } from "lucide-react";

const features = [
  { icon: Heart, title: "Our mission", text: "Help students make better decisions by sharing honest, useful feedback about campus facilities and services." },
  { icon: Compass, title: "How it works", text: "Browse facilities, compare ratings, read reviews, and share your own experience with the campus community." },
  { icon: Star, title: "Transparent ratings", text: "Overall scores are calculated from submitted reviews. Category criteria depend on the type of facility." },
  { icon: ShieldCheck, title: "Community first", text: "We encourage respectful feedback focused on facilities, service quality and real student experiences." },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero"><div className="container about-hero-inner"><span className="eyebrow">ABOUT THE PROJECT</span><h1>Better campus choices,<br /><span>together.</span></h1><p>RateIt is a student-focused platform for discovering, rating and reviewing campus facilities and services at NJUPT.</p><Link to="/explore" className="button button-primary">Explore facilities <ArrowRight size={16} /></Link></div></section>
      <section className="container section-block"><div className="about-feature-grid">{features.map(({ icon: Icon, title, text }) => <article className="about-feature-card" key={title}><span className="about-feature-icon"><Icon size={22} /></span><h2>{title}</h2><p>{text}</p></article>)}</div></section>
      <section className="container section-block" id="guidelines"><div className="guidelines-section"><div><span className="eyebrow">COMMUNITY GUIDELINES</span><h2>Make every review helpful.</h2><p>RateIt works best when feedback is honest, specific and respectful. Please review the service or facility—not an individual.</p><ul><li><ShieldCheck size={17} /> Describe your own experience accurately.</li><li><Users size={17} /> Keep comments respectful and relevant.</li><li><MessageSquareWarning size={17} /> Do not post private information or harassment.</li><li><Star size={17} /> Give ratings that reflect your experience.</li></ul></div><aside className="report-card"><MessageSquareWarning size={26} /><h3>See something concerning?</h3><p>In the full application, users will be able to report abusive or misleading reviews for moderation.</p><Link to="/explore" className="button button-outline">Browse facilities</Link></aside></div></section>
      <section className="container about-bottom-cta"><h2>Ready to explore your campus?</h2><p>Find a place, compare ratings, and help the community with your feedback.</p><Link to="/explore" className="button button-primary">Explore RateIt <ArrowRight size={16} /></Link></section>
    </div>
  );
}
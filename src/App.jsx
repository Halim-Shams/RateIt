import {Routes, Route, Navigate} from 'react-router-dom';
import {useState} from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import FacilityDetailsPage from './pages/FacilityDetailsPage';
import ReviewPage from './pages/ReviewPage';
import AboutPage from './pages/AboutPage';
import {facilities as initialFacilities} from './data/facilities';

export default function App() {
	const [facilities, setFacilities] = useState(initialFacilities);
	const [reviewsByFacility, setReviewsByFacility] = useState({});

	function addReview(facilityId, review) {
		setReviewsByFacility((current) => ({
			...current,
			[facilityId]: [review, ...(current[facilityId] || [])],
		}));
		setFacilities((current) =>
			current.map((facility) => {
				if (facility.id !== facilityId) return facility;
				const nextCount = facility.reviewCount + 1;
				const nextRating =
					(facility.rating * facility.reviewCount + review.rating) / nextCount;
				return {
					...facility,
					rating: Number(nextRating.toFixed(1)),
					reviewCount: nextCount,
				};
			}),
		);
	}

	return (
		<div className='app-shell'>
			<Navbar />
			<main className='main-content'>
				<Routes>
					<Route path='/' element={<HomePage facilities={facilities} />} />
					<Route
						path='/explore'
						element={<ExplorePage facilities={facilities} />}
					/>
					<Route
						path='/facility/:id'
						element={
							<FacilityDetailsPage
								facilities={facilities}
								reviewsByFacility={reviewsByFacility}
							/>
						}
					/>
					<Route
						path='/facility/:id/review'
						element={
							<ReviewPage facilities={facilities} onSubmitReview={addReview} />
						}
					/>
					<Route path='/about' element={<AboutPage />} />
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

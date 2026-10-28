import {useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import FacilityDetailsPage from './pages/FacilityDetailsPage';
import ReviewPage from './pages/ReviewPage';
import AboutPage from './pages/AboutPage';

import {facilities as initialFacilities} from './data/facilities';
import {getFacilities} from './services/api';
import {mapBackendFacility} from './services/facilityMapping';

export default function App() {
	const [facilities, setFacilities] = useState(initialFacilities);
	const [reviewsByFacility, setReviewsByFacility] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setApiError] = useState('');

	useEffect(() => {
		let cancelled = false;

		async function loadFacilities() {
			try {
				setIsLoading(true);
				setApiError('');

				const apiFacilities = await getFacilities();

				const mappedFacilities = apiFacilities
					.map(mapBackendFacility)
					.filter(Boolean);

				if (!cancelled) {
					if (mappedFacilities.length > 0) {
						setFacilities(mappedFacilities);
					} else {
						setApiError(
							'No matching facilities were returned by the backend. Showing demo data.',
						);
					}
				}
			} catch (error) {
				if (!cancelled) {
					setApiError(
						'Could not connect to the backend. Showing demo data until the API is available.',
					);
					console.error('Failed to load facilities:', error);
				}
			} finally {
				if (!cancelled) {
					setIsLoading(false);
				}
			}
		}

		loadFacilities();

		return () => {
			cancelled = true;
		};
	}, []);

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
				{isLoading && (
					<p role='status' className='api-status'>
						Connecting to the backend...
					</p>
				)}

				{!isLoading && apiError && (
					<p role='status' className='api-status'>
						{apiError}
					</p>
				)}

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

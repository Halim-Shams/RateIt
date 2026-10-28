const API_BASE_URL = 'http://127.0.0.1:8000/api';

async function request(path, options = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	});

	if (!response.ok) {
		let message = `Request failed (${response.status})`;

		try {
			const error = await response.json();
			message = error.detail || message;
		} catch {
			// Keep the default error message if the response isn't JSON.
		}

		throw new Error(
			typeof message === 'string' ? message : JSON.stringify(message),
		);
	}

	if (response.status === 204) return null;
	return response.json();
}

export function getFacilities({
	search = '',
	category = 'All',
	sort = 'name',
} = {}) {
	const params = new URLSearchParams({sort});

	if (search.trim()) params.set('search', search.trim());
	if (category && category.toLowerCase() !== 'all') {
		params.set('category', category);
	}

	return request(`/facilities?${params.toString()}`);
}

export function getFacility(facilityId) {
	return request(`/facilities/${facilityId}`);
}

export function getReviews(facilityId) {
	return request(`/facilities/${facilityId}/reviews`);
}

export function createReview(facilityId, review) {
	return request(`/facilities/${facilityId}/reviews`, {
		method: 'POST',
		body: JSON.stringify({
			rating: review.rating,
			title: review.title || null,
			comment: review.comment,
			display_name: review.display_name || 'Anonymous',
		}),
	});
}

export function reportReview(reviewId, reason) {
	return request(`/reviews/${reviewId}/reports`, {
		method: 'POST',
		body: JSON.stringify({reason}),
	});
}

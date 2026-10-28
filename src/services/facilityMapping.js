import {facilities as localFacilities} from '../data/facilities';

export const facilityIdMap = {
	'cafeteria-west': 6,
	'main-library': 7,
	'campus-gym': 8,
	'dorm-1': 9,
	'printing-shop': 10,
	'shuttle-bus': 11,
	'cafe-66': 12,
	'basketball-court': 13,
};

export function mapBackendFacility(apiFacility) {
	const local = localFacilities.find(
		(facility) => facility.name === apiFacility.name,
	);

	if (!local) return null;

	return {
		...local,
		id: local.id,
		backendId: apiFacility.id,
		name: apiFacility.name,
		category: apiFacility.category,
		location: apiFacility.location || local.location,
		description: apiFacility.description || local.description,

		// Preserve the existing demo display until real reviews are available.
		// Once reviews exist in the database, use the backend's actual statistics.
		rating:
			apiFacility.review_count > 0 ? apiFacility.average_rating : local.rating,
		reviewCount:
			apiFacility.review_count > 0
				? apiFacility.review_count
				: local.reviewCount,
	};
}

export function getBackendFacilityId(frontendId) {
	const backendId = facilityIdMap[frontendId];

	if (backendId == null) {
		throw new Error(`No backend ID configured for facility "${frontendId}".`);
	}

	return backendId;
}

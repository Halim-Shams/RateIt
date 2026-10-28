export const facilities = [
  {
    id: "cafeteria-west",
    name: "Campus Cafeteria (West)",
    category: "Food & Dining",
    location: "NJUPT West Campus",
    distance: "500m from main gate",
    rating: 4.2,
    reviewCount: 124,
    hours: "07:00 – 20:00",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
    ],
    description: "A popular dining spot with a variety of Chinese dishes, quick meals and affordable options for students. Seating is available indoors, with several food counters to choose from.",
    criteria: { "Food quality": 4.3, Cleanliness: 4.1, Price: 4.2, Service: 4.0 },
    reviews: [
      { id: "r1", author: "Anonymous", date: "2 days ago", rating: 5, text: "Good variety and affordable prices. The noodle counter is especially convenient between classes.", helpful: 12 },
      { id: "r2", author: "Student 023", date: "5 days ago", rating: 4, text: "Usually a good option for lunch. It gets busy around noon, so arriving a little earlier helps.", helpful: 8 },
      { id: "r3", author: "Anonymous", date: "1 week ago", rating: 4, text: "Lots of choices and generally clean tables. Some stalls have longer queues than others.", helpful: 5 }
    ]
  },
  {
    id: "main-library",
    name: "Library (Main Building)",
    category: "Study Spaces",
    location: "NJUPT Main Campus",
    distance: "Near the central plaza",
    rating: 4.6,
    reviewCount: 98,
    hours: "08:00 – 22:00",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
    description: "A quiet study environment with individual desks, group study areas and access to academic resources. Seating can be limited during exam periods.",
    criteria: { Comfort: 4.7, Cleanliness: 4.6, "Noise level": 4.5, Availability: 4.2 },
    reviews: [
      { id: "r4", author: "Anonymous", date: "1 day ago", rating: 5, text: "Great place to focus. The upper floors are usually quieter in the afternoon.", helpful: 16 },
      { id: "r5", author: "Student 118", date: "4 days ago", rating: 4, text: "Comfortable desks and good lighting, but it can be difficult to find a seat during exam week.", helpful: 7 }
    ]
  },
  {
    id: "campus-gym",
    name: "Campus Gym",
    category: "Sports & Fitness",
    location: "NJUPT East Campus",
    distance: "Beside the sports field",
    rating: 4.1,
    reviewCount: 87,
    hours: "07:00 – 21:30",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
    description: "A campus fitness space with a range of training equipment. Check current opening times and access rules before visiting.",
    criteria: { Equipment: 4.1, Cleanliness: 4.0, Accessibility: 4.3, "Value for money": 4.0 },
    reviews: [
      { id: "r6", author: "Anonymous", date: "3 days ago", rating: 4, text: "Convenient location and enough equipment for a basic workout. Busy after classes.", helpful: 9 }
    ]
  },
  {
    id: "dorm-1",
    name: "Student Dormitory (Building 1)",
    category: "Dormitories",
    location: "NJUPT Dorm Area",
    distance: "North residential area",
    rating: 3.8,
    reviewCount: 76,
    hours: "Open to residents",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85",
    description: "Student residential building with shared facilities. Reviews should focus on maintenance, cleanliness, comfort and the availability of common amenities.",
    criteria: { Cleanliness: 3.8, Facilities: 3.7, Comfort: 3.9, Maintenance: 3.6 },
    reviews: [
      { id: "r7", author: "Anonymous", date: "1 week ago", rating: 4, text: "The location is convenient. Shared areas could be maintained more regularly.", helpful: 6 }
    ]
  },
  {
    id: "printing-shop",
    name: "Campus Printing Shop",
    category: "Convenience",
    location: "NJUPT Main Campus",
    distance: "Near the teaching buildings",
    rating: 4.0,
    reviewCount: 52,
    hours: "08:30 – 19:00",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85",
    description: "A convenient place for printing assignments, scanning documents and making copies. Prices and service times may vary by job.",
    criteria: { Price: 4.0, Service: 4.1, Availability: 3.9, Convenience: 4.2 },
    reviews: [
      { id: "r8", author: "Student 064", date: "2 days ago", rating: 4, text: "Useful when I need to print assignments quickly. Ask about the price for larger jobs first.", helpful: 4 }
    ]
  },
  {
    id: "shuttle-bus",
    name: "Campus Shuttle Bus",
    category: "Campus Services",
    location: "Campus-wide",
    distance: "Multiple stops",
    rating: 3.9,
    reviewCount: 41,
    hours: "Schedule varies",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85",
    description: "A transport option for moving between campus areas. Check official campus announcements for the latest route and schedule.",
    criteria: { Reliability: 3.8, Accessibility: 4.1, Service: 3.9, "Value for money": 4.0 },
    reviews: [
      { id: "r9", author: "Anonymous", date: "6 days ago", rating: 4, text: "Helpful when the weather is bad. It would be great to have clearer schedule information.", helpful: 3 }
    ]
  },
  {
    id: "cafe-66",
    name: "Campus Café 66",
    category: "Food & Dining",
    location: "NJUPT Main Campus",
    distance: "Near the student center",
    rating: 4.5,
    reviewCount: 39,
    hours: "09:00 – 21:00",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85",
    description: "A relaxed café for coffee, light snacks and casual conversations between classes.",
    criteria: { "Food quality": 4.5, Cleanliness: 4.4, Price: 4.0, Service: 4.6 },
    reviews: [
      { id: "r10", author: "Anonymous", date: "5 hours ago", rating: 5, text: "A comfortable place to take a break. Staff were friendly when I visited.", helpful: 2 }
    ]
  },
  {
    id: "basketball-court",
    name: "Outdoor Basketball Court",
    category: "Sports & Fitness",
    location: "NJUPT Sports Area",
    distance: "Beside the running track",
    rating: 4.2,
    reviewCount: 33,
    hours: "Daylight hours",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=85",
    description: "Outdoor courts for casual games and practice. Availability may depend on weather and campus activities.",
    criteria: { Equipment: 4.1, Cleanliness: 4.0, Accessibility: 4.5, "Value for money": 4.4 },
    reviews: [
      { id: "r11", author: "Student 207", date: "1 day ago", rating: 4, text: "Good place to play after class, although it gets crowded in the evening.", helpful: 5 }
    ]
  }
];
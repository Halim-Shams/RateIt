import { Utensils, BookOpen, Dumbbell, House, ShoppingCart, Bus, WashingMachine } from "lucide-react";

export const categories = [
  { name: "Food & Dining", icon: Utensils, color: "orange", description: "Cafeterias, snack shops and cafés" },
  { name: "Study Spaces", icon: BookOpen, color: "blue", description: "Libraries and reading rooms" },
  { name: "Sports & Fitness", icon: Dumbbell, color: "green", description: "Gyms, courts and fitness areas" },
  { name: "Dormitories", icon: House, color: "purple", description: "Dorms and shared facilities" },
  { name: "Convenience", icon: ShoppingCart, color: "yellow", description: "Stores and printing services" },
  { name: "Campus Services", icon: Bus, color: "teal", description: "Transport and other services" },
];

export const categoryCriteria = {
  "Food & Dining": ["Food quality", "Cleanliness", "Price", "Service"],
  "Study Spaces": ["Comfort", "Cleanliness", "Noise level", "Availability"],
  "Sports & Fitness": ["Equipment", "Cleanliness", "Accessibility", "Value for money"],
  Dormitories: ["Cleanliness", "Facilities", "Comfort", "Maintenance"],
  Convenience: ["Price", "Service", "Availability", "Convenience"],
  "Campus Services": ["Reliability", "Accessibility", "Service", "Value for money"],
};
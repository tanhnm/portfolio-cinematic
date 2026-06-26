export interface HotelItem {
  id: string;
  name: string;
  rating: number; // 1 to 5 stars
  type: string; // e.g., "Hotel", "Resort", "Homestay"
  reviewScore: number; // e.g., 9.2
  location: string; // e.g., "Hanoi", "Da Nang", "Hoi An", "HCMC", "Phu Quoc"
  price: number; // Price in VND
  source: string; // e.g., "Booking.com", "Agoda", "Direct", "Sheets API"
}

export interface FoodAllocation {
  breakfast: number;
  lunch: number;
  dinner: number;
}

export interface DailyFoodLogs {
  [dayIndex: number]: FoodAllocation;
}

export interface CarRentalState {
  rate: number;
  days: number;
  fuel: number;
}

export interface RideCommute {
  id: string;
  from: string;
  to: string;
  cost: number;
}

export interface TripBudgetState {
  targetBudget: number;
  travelers: number;
  days: number;
  selectedHotelId: string | null;
  selectedHotelNights: number;
  food: DailyFoodLogs;
  carRental: CarRentalState;
  taxiCommutes: RideCommute[];
}

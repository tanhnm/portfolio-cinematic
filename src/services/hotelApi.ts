import axios from 'axios';
import type { HotelItem } from '../types/travel';

// Fallback Vietnam hotel dataset in case sheets macro is offline/unconfigured
const FALLBACK_HOTELS: HotelItem[] = [
  {
    id: 'h1',
    name: 'La Siesta Classic Ma May',
    rating: 4,
    type: 'Hotel',
    reviewScore: 9.4,
    location: 'Hanoi',
    price: 1800000,
    source: 'Booking.com'
  },
  {
    id: 'h2',
    name: 'InterContinental Danang Sun Peninsula',
    rating: 5,
    type: 'Resort',
    reviewScore: 9.6,
    location: 'Da Nang',
    price: 9500000,
    source: 'Agoda'
  },
  {
    id: 'h3',
    name: 'Little Hoi An Boutique Hotel & Spa',
    rating: 4,
    type: 'Hotel',
    reviewScore: 9.2,
    location: 'Hoi An',
    price: 1200000,
    source: 'Booking.com'
  },
  {
    id: 'h4',
    name: 'Rex Hotel Saigon',
    rating: 5,
    type: 'Hotel',
    reviewScore: 8.7,
    location: 'HCMC',
    price: 2600000,
    source: 'Direct'
  },
  {
    id: 'h5',
    name: 'Salinda Resort Phu Quoc Island',
    rating: 5,
    type: 'Resort',
    reviewScore: 9.5,
    location: 'Phu Quoc',
    price: 3800000,
    source: 'Agoda'
  },
  {
    id: 'h6',
    name: 'Hanoi Old Quarter Oasis Homestay',
    rating: 3,
    type: 'Homestay',
    reviewScore: 8.9,
    location: 'Hanoi',
    price: 4500000 / 10, // 450,000 VND
    source: 'Direct'
  },
  {
    id: 'h7',
    name: 'Da Nang Beachside Hostel & Rooftop',
    rating: 3,
    type: 'Homestay',
    reviewScore: 9.0,
    location: 'Da Nang',
    price: 350000,
    source: 'Booking.com'
  },
  {
    id: 'h8',
    name: 'Hoi An Ancient House Village Resort',
    rating: 4,
    type: 'Resort',
    reviewScore: 9.1,
    location: 'Hoi An',
    price: 1450000,
    source: 'Agoda'
  }
];

const SHEETS_URL_KEY = 'vietnam_trip_sheets_url';
const HOTELS_CACHE_KEY = 'vietnam_trip_hotels_cache';
const CACHE_TIME_KEY = 'vietnam_trip_hotels_cache_time';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache expiration

const api = axios.create({
  timeout: 12000
});

export const getSavedSheetUrl = (): string => {
  return localStorage.getItem(SHEETS_URL_KEY) || 'https://script.google.com/macros/s/AKfycbwUlrmnibJonY7smhKTpiw2tdqw2qby2HlFtj870UtiDGFGDqTyugT8zlEHHwyCaJe7/exec';
};

export const saveSheetUrl = (url: string): void => {
  if (url) {
    localStorage.setItem(SHEETS_URL_KEY, url.trim());
  } else {
    localStorage.removeItem(SHEETS_URL_KEY);
  }
};

export interface FetchResult {
  data: HotelItem[];
  isFallback: boolean;
  error?: string;
}

export const fetchHotels = async (): Promise<FetchResult> => {
  const url = "https://script.google.com/macros/s/AKfycbwUlrmnibJonY7smhKTpiw2tdqw2qby2HlFtj870UtiDGFGDqTyugT8zlEHHwyCaJe7/exec";

  if (!url) {
    // If no URL configured, load from cache or fallback data
    const cached = getCachedHotels();
    return {
      data: cached || FALLBACK_HOTELS,
      isFallback: true,
      error: 'Google Sheets URL is not configured. Displaying local cached/fallback data.'
    };
  }

  try {
    const response = await api.get(url);

    const payload = response.data;

    if (!Array.isArray(payload)) {
      throw new Error('Sheets macro did not return an array list of hotels');
    }

    // Safely parse properties with types matching your Google Sheets schema
    const parsedHotels: HotelItem[] = payload.map((item: any, index: number) => {
      const name = item["Hotel Name"] ? String(item["Hotel Name"]) : 'Unnamed Lodging';

      // Heuristic to detect lodging type from name
      let type = 'Hotel';
      if (name.toLowerCase().includes('resort')) type = 'Resort';
      else if (name.toLowerCase().includes('homestay') || name.toLowerCase().includes('hostel')) type = 'Homestay';

      // Convert USD price to VND for system calculations (using standard exchange rate 25,400 VND/USD)
      const priceUsd = Number(item["Price per Night (USD)"]) || 0;
      const priceVnd = Math.round(priceUsd * 25400);

      return {
        id: item["Hotel ID"] ? String(item["Hotel ID"]) : `sheet-h-${index}`,
        name: name,
        rating: item["Star Rating"] ? Math.min(5, Math.max(1, Math.round(Number(item["Star Rating"])))) : 4,
        type: type,
        reviewScore: item["Review Score"] ? Number(item["Review Score"]) : 8.5,
        location: item["Location Segment"] ? String(item["Location Segment"]) : 'Vietnam',
        price: priceVnd,
        source: item["Primary Source Channel"] ? String(item["Primary Source Channel"]) : 'Sheets API'
      };
    });

    // Write to cache
    localStorage.setItem(HOTELS_CACHE_KEY, JSON.stringify(parsedHotels));
    localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));

    return {
      data: parsedHotels,
      isFallback: false
    };
  } catch (err: any) {
    console.error('Failed fetching from sheets API:', err);

    // Read from cache if it exists, otherwise use fallback data
    const cached = getCachedHotels();
    return {
      data: cached || FALLBACK_HOTELS,
      isFallback: true,
      error: `Failed to fetch live database: ${err.message || err}. Loaded cached data.`
    };
  }
};

export const getCachedHotels = (): HotelItem[] | null => {
  try {
    const cachedStr = localStorage.getItem(HOTELS_CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    if (!cachedStr || !cachedTime) return null;

    // Check expiration (optional, we might still serve expired cache if offline)
    const isExpired = Date.now() - Number(cachedTime) > CACHE_DURATION;
    if (isExpired) {
      console.warn('Cache expired but will serve as backup if fetch fails.');
    }

    return JSON.parse(cachedStr);
  } catch {
    return null;
  }
};

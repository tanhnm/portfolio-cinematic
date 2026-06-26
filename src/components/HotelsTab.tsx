import { useState } from 'react';
import type { TripBudgetState, HotelItem } from '../types/travel';
import {
  Search,
  MapPin,
  Star,
  SlidersHorizontal,
  AlertCircle,
  Moon,
  ChevronDown
} from 'lucide-react';

interface HotelsTabProps {
  state: TripBudgetState;
  onChange: (state: TripBudgetState) => void;
  hotelList: HotelItem[];
  isLoading: boolean;
  error: string | null;
  isFallback: boolean;
}

const REMOVE_PATTERNS = [
  /\bMini Hotel(?:\s+\d+)?$/gi,
  /\bBoutique Branch(?:\s+\d+)?$/gi,
  /\bPremium Boutique(?:\s+\d+)?$/gi,
  /\bGrand Boutique(?:\s+\d+)?$/gi,
  /\bLuxury Boutique(?:\s+\d+)?$/gi,
  /\bAnnex Lodge(?:\s+\d+)?$/gi,
  /\bApec Homestay(?:\s+\d+)?$/gi,
]

const removeDuplicateWords = (text: string) => {
  return text.replace(/\b(\w+)\s+\1\b/gi, "$1");
};

export const cleanHotelName = (name: string) => {
  if (!name) return "";

  let cleaned = String(name);

  // Remove known suffixes
  REMOVE_PATTERNS.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, "");
  });

  // Hotel Hotel -> Hotel
  cleaned = cleaned.replace(/\bHotel\s+Hotel\b/gi, "Hotel");

  // Resort Resort -> Resort
  cleaned = cleaned.replace(/\bResort\s+Resort\b/gi, "Resort");

  // Villa Villa -> Villa
  cleaned = cleaned.replace(/\bVilla\s+Villa\b/gi, "Villa");

  // Generic duplicate word removal
  cleaned = removeDuplicateWords(cleaned);

  // Remove extra spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
};

export const HotelsTab: React.FC<HotelsTabProps> = ({
  state,
  onChange,
  hotelList,
  isLoading,
  error,
  isFallback
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'priceAsc' | 'priceDesc' | 'ratingDesc'>('priceAsc');
  const [showFilters, setShowFilters] = useState(false);

  const formatPriceVND = (vndAmount: number) => {
    if (Number.isNaN(vndAmount)) {
      return "0 ₫";
    }

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(vndAmount);
  };

  const formatUsd = (vndAmount: number) => {
    const usdAmount = vndAmount / 26320;
    if (Number.isNaN(usdAmount)) {
      return "$0";
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(usdAmount);
  };

  const handleSelectHotel = (hotelId: string) => {
    if (state.selectedHotelId === hotelId) {
      // Toggle select off
      onChange({
        ...state,
        selectedHotelId: null
      });
    } else {
      // Select new hotel, default nights to (days - 1) or 1
      onChange({
        ...state,
        selectedHotelId: hotelId,
        selectedHotelNights: Math.max(1, state.days - 1)
      });
    }
  };

  const adjustNights = (amount: number) => {
    const nextNights = Math.max(1, state.selectedHotelNights + amount);
    onChange({
      ...state,
      selectedHotelNights: nextNights
    });
  };

  // Get locations list dynamically
  const locations = ['All', ...Array.from(new Set(hotelList.map(h => h.location)))];

  // Filtering and Sorting
  const filteredHotels = hotelList
    .filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = selectedLocation === 'All' || hotel.location === selectedLocation;

      const matchesRating = selectedRating === 'All' || hotel.rating === selectedRating;

      return matchesSearch && matchesLocation && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'ratingDesc') return b.rating - a.rating;
      return 0;
    });

  const getGradient = (rating: number) => {
    if (rating === 5) return 'from-amber-500/20 via-orange-500/10 to-transparent';
    if (rating === 4) return 'from-teal-500/20 via-emerald-500/10 to-transparent';
    return 'from-indigo-500/20 via-slate-500/10 to-transparent';
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 animate-slide-up">
      {/* Alert if using offline fallback data */}
      {isFallback && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs p-3 rounded-xl flex items-start gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Offline/Cache Mode</p>
            <p className="text-[10px] text-amber-400/80">
              {error || 'Using localized hotel database. Connect your custom Google Sheets Web App on the Dashboard tab to sync live items.'}
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="sticky top-[-20px] pt-4 z-30 bg-slate-950 px-4 pb-3 border-b border-slate-800">
        <div className="space-y-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hotel names, type, locations..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-teal-500"
          />
          <Search className="w-4 h-4 text-slate-550 absolute left-[28px] top-[15px]" />
        </div>

        {/* Search controls toggles */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full">
            {locations.map(loc => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 transition-colors ${selectedLocation === loc
                  ? 'bg-teal-400 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-xl border shrink-0 transition-all ${showFilters
              ? 'bg-teal-500/10 text-teal-400 border-teal-500/30'
              : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Expanded Filters and Sorting */}
        {showFilters && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              {/* Star rating filter */}
              <div>
                <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Star Rating</label>
                <div className="relative">
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none appearance-none"
                  >
                    <option value="All">All Stars</option>
                    <option value="3">3 ★</option>
                    <option value="4">4 ★</option>
                    <option value="5">5 ★</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Sorting selector */}
              <div>
                <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Sort By</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none appearance-none"
                  >
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="ratingDesc">Rating: High to Low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hotel Cards Grid / List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-400 text-xs font-medium">Fetching lodging database...</span>
        </div>
      ) : filteredHotels.length === 0 ? (
        <div className="bg-slate-900 border border-slate-850 text-center rounded-2xl py-12 px-4">
          <span className="text-3xl">🌴</span>
          <p className="text-slate-350 text-sm mt-3 font-semibold">No hotels match your filters</p>
          <p className="text-slate-500 text-xs mt-1">Try resetting search filters or changing locations</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredHotels.map(hotel => {
            const isSelected = state.selectedHotelId === hotel.id;

            return (
              <div
                key={hotel.id}
                onClick={() => handleSelectHotel(hotel.id)}
                className={`group border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 relative bg-slate-900/50 hover:bg-slate-900/80 ${isSelected
                  ? 'border-teal-400 ring-1 ring-teal-400 bg-slate-900/90 shadow-lg'
                  : 'border-slate-800'
                  }`}
              >
                {/* Visual Header Graphic */}
                <div className={`h-16 bg-gradient-to-br ${getGradient(hotel.rating)} absolute inset-x-0 top-0 z-0`}></div>

                <div className="p-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      {/* Lodging Type & Rating stars */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="bg-slate-950/70 border border-slate-800/80 text-teal-400 text-[9px] px-2 py-0.5 rounded font-bold tracking-wider uppercase">
                          {hotel.type}
                        </span>
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: hotel.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      <h4 className="text-slate-100 font-bold text-sm tracking-tight leading-tight max-w-[210px] group-hover:text-white transition-colors">
                        {cleanHotelName(hotel.name)}
                      </h4>

                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-[11px]">{hotel.location}</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      {/* Review Score Badge */}
                      <span className="bg-teal-500/10 text-teal-400 font-extrabold text-[11px] px-2 py-0.5 rounded-lg border border-teal-500/20">
                        ★ {hotel.reviewScore.toFixed(1)}
                      </span>

                      <span className="text-[9px] text-slate-500 mt-2 font-mono">
                        via {hotel.source}
                      </span>
                    </div>
                  </div>

                  <hr className="border-slate-800/50 my-3" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Price per night</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-slate-100 font-bold text-sm">{formatPriceVND(hotel.price)}</span>
                        <span className="text-[10px] text-slate-500">≈ {formatUsd(hotel.price)}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div onClick={(e) => e.stopPropagation()}>
                      {isSelected ? (
                        <div className="flex items-center bg-slate-950 border border-teal-500/30 rounded-xl p-1 gap-1.5 shadow-sm">
                          <button
                            onClick={() => adjustNights(-1)}
                            className="w-7 h-7 bg-slate-800 text-slate-100 rounded-lg flex items-center justify-center font-bold text-sm active:scale-95 transition-all"
                          >
                            -
                          </button>
                          <div className="flex items-center gap-0.5 px-1">
                            <span className="text-xs font-bold text-slate-200">{state.selectedHotelNights}</span>
                            <Moon className="w-3 h-3 text-slate-450" />
                          </div>
                          <button
                            onClick={() => adjustNights(1)}
                            className="w-7 h-7 bg-slate-800 text-slate-100 rounded-lg flex items-center justify-center font-bold text-sm active:scale-95 transition-all"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSelectHotel(hotel.id)}
                          className="bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl active:scale-95 transition-all flex items-center gap-1"
                        >
                          Add to Itinerary
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { TripBudgetState } from './types/travel';
import { fetchHotels, getSavedSheetUrl } from './services/hotelApi';
import { DashboardTab } from './components/DashboardTab';
import { HotelsTab } from './components/HotelsTab';
import { FoodTab } from './components/FoodTab';
import { TransportTab } from './components/TransportTab';
import {
  AlertTriangle,
  Car,
  CheckCircle,
  Hotel,
  Menu,
  Search,
  TrendingUp,
  Users,
  Utensils
} from 'lucide-react';
import shot1Video from './assets/cinematic/Shot_1.mp4';
import shot2Video from './assets/cinematic/Shot_2.mp4';
import shot5Video from './assets/cinematic/PhuYenShort-1.mp4';
import shot6Video from './assets/cinematic/Shot_6.mp4';
import shot7Video from './assets/cinematic/Shot_7.mp4';
import shotUni from './assets/cinematic/Shot_Uni.mp4'

const LOCAL_STORAGE_KEY = 'vietnam_trip_budget_state';

const generateInitialFoodLogs = (days: number) => {
  const food: Record<number, { breakfast: number; lunch: number; dinner: number }> = {};
  for (let i = 0; i < days; i++) {
    food[i] = { breakfast: 50000, lunch: 150000, dinner: 250000 };
  }
  return food;
};

const DEFAULT_STATE: TripBudgetState = {
  targetBudget: 20000000,
  travelers: 2,
  days: 5,
  selectedHotelId: null,
  selectedHotelNights: 4,
  food: generateInitialFoodLogs(5),
  carRental: {
    rate: 0,
    days: 0,
    fuel: 0
  },
  taxiCommutes: [
    { id: '1', from: 'Noi Bai Airport', to: 'Hanoi Center', cost: 280000 },
    { id: '2', from: 'Hotel', to: 'Old Quarter Attractions', cost: 60000 }
  ]
};

type ActiveTab = 'dashboard' | 'hotels' | 'food' | 'transport';

const getYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    if (u.hostname.includes('youtube.com')) {
      return u.searchParams.get('v') || u.pathname.split('/').pop() || null;
    }
  } catch {
    // not a URL
  }
  return null;
};

const VideoPlayer = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeId = getYouTubeId(src);

  useEffect(() => {
    if (youtubeId) return; // YouTube iframes handle their own playback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => { });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [youtubeId]);

  if (youtubeId) {
    return (
      // Wrapper takes all className props (sizing, grayscale, hover transitions).
      // overflow-hidden clips the iframe to simulate object-cover.
      <div className={`relative overflow-hidden ${className ?? ''}`}>
        <iframe
          // height: 100% fills the container; aspect-ratio: 16/9 sets width automatically.
          // left-1/2 + -translate-x-1/2 centers the wider iframe so both sides crop evenly.
          className="absolute top-0 left-1/2 h-full -translate-x-1/2"
          style={{ aspectRatio: '16 / 9' }}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&showinfo=0&autohide=1&playsinline=0&rel=0&fs=0&mute=1&loop=1&vq=hd2160`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        {/* Transparent overlay that intercepts all pointer events so the
            YouTube play/pause button and controls are never triggered. */}
        <div className="absolute inset-0 z-10" />
      </div>
    );

  }

  return (
    <video
      ref={videoRef}
      className={className}
      loop
      muted
      playsInline
      autoPlay
    >
      <source src={src} type={src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
    </video>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [state, setState] = useState<TripBudgetState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.food) return parsed;
      }
    } catch (e) {
      console.warn('Failed restoring state from localStorage:', e);
    }
    return DEFAULT_STATE;
  });

  const [currentSheetUrl, setCurrentSheetUrl] = useState(getSavedSheetUrl());

  const {
    data: queryResult,
    isLoading: isLoadingHotels,
    isFetching: isSyncing,
    error: queryError,
    refetch
  } = useQuery({
    queryKey: ['hotels', currentSheetUrl],
    queryFn: fetchHotels,
  });

  const hotelList = queryResult?.data || [];
  const isFallback = queryResult?.isFallback ?? true;
  const hotelError = queryResult?.error || (queryError ? (queryError as Error).message : null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const loadHotels = async () => {
    setCurrentSheetUrl(getSavedSheetUrl());
    await refetch();
  };

  const selectedHotel = hotelList.find(h => h.id === state.selectedHotelId);
  const lodgingCost = selectedHotel ? selectedHotel.price * state.selectedHotelNights : 0;
  const foodCost = Object.values(state.food).reduce((acc, cur) => {
    return acc + (cur.breakfast || 0) + (cur.lunch || 0) + (cur.dinner || 0);
  }, 0);
  const carRentalCost = (state.carRental.rate * state.carRental.days) + state.carRental.fuel;
  const taxiCost = state.taxiCommutes.reduce((acc, cur) => acc + cur.cost, 0);
  const totalCost = lodgingCost + foodCost + carRentalCost + taxiCost;
  const costPerPerson = totalCost / Math.max(1, state.travelers);

  const formatVnd = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
  };

  const formatUsd = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value / 25400);
  };

  const budgetRatio = totalCost / (state.targetBudget || 1);
  const budgetPercent = Math.min(100, Math.round(budgetRatio * 100));
  const isOverBudget = totalCost > state.targetBudget;
  const isWarningBudget = totalCost > state.targetBudget * 0.7 && !isOverBudget;

  const getProgressColor = () => {
    if (isOverBudget) return 'bg-rose-500';
    if (isWarningBudget) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getTextColor = () => {
    if (isOverBudget) return 'text-rose-500';
    if (isWarningBudget) return 'text-amber-500';
    return 'text-emerald-600';
  };

  const getProgressGlow = () => {
    if (isOverBudget) return 'shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse';
    if (isWarningBudget) return 'shadow-[0_0_8px_rgba(245,158,11,0.3)]';
    return '';
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear this itinerary and reset all settings?')) {
      setState(DEFAULT_STATE);
    }
  };

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: TrendingUp },
    { id: 'hotels' as const, label: 'Hotels', icon: Hotel },
    { id: 'food' as const, label: 'Food', icon: Utensils },
    { id: 'transport' as const, label: 'Transport', icon: Car }
  ];

  return (
    <div className="tekina-page min-h-screen bg-white text-black selection:bg-sky-200">
      <header className={`sticky top-0 z-50 border-b-2 border-black bg-[#dadada] transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="grid h-[76px] grid-cols-3 items-center px-5 sm:h-[100px] sm:px-[13.25vw]">
          <a href="#top" className="tekina-logo text-3xl font-black leading-none sm:text-5xl" aria-label="Vietnam travel cost">
            Yus trip
          </a>

          <div></div>

          {/* <button className="mx-auto flex h-12 w-12 items-center justify-center text-black" aria-label="Open menu">
            <Menu className="h-9 w-9 stroke-[2.5]" />
          </button> */}

          <div className="flex items-center justify-end gap-4 sm:gap-9">
            <button className="hidden h-12 w-12 items-center justify-center sm:flex" aria-label="Search">
              <Search className="h-9 w-9 stroke-[2.5]" />
            </button>
            <a
              href="#planner"
              className="hidden rounded bg-black px-8 py-4 font-mono text-sm font-black text-white transition-transform active:scale-95 sm:inline-flex"
            >
              Open Planner
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="grid min-h-[calc(100svh-132px)] border-b-2 border-black sm:min-h-[calc(100svh-160px)] lg:grid-cols-2">
          <div className="flex items-center bg-white px-6 py-10 sm:px-[13.25vw] lg:px-[13.25vw] lg:py-8">
            <div className="max-w-[620px]">
              <p className="mb-5 font-mono text-xs font-black uppercase tracking-[0.28em] text-neutral-500">
                Vietnam trip budget
              </p>
              <h1 className="font-mono text-[clamp(2.75rem,5.7vw,4.5rem)] font-medium leading-[0.94] tracking-normal">
                Stunning<br />
                Travel<br />
                Cost<br />
                Planner
              </h1>
              <p className="mt-6 max-w-[560px] font-mono text-lg leading-relaxed text-neutral-600 sm:text-xl">
                A sharp budget workspace for hotels, meals, rides, and per-person totals while you shape a Vietnam itinerary.
              </p>

              <a
                href="#planner"
                className="mt-5 inline-flex rounded bg-black px-8 py-4 font-mono text-lg font-black text-white transition-transform active:scale-95"
              >
                Get Started
              </a>

            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border-t-2 border-black lg:min-h-0 lg:border-l-2 lg:border-t-0">
            <iframe
              className="h-full min-h-[420px] w-full"
              src="https://www.youtube.com/embed/rL_pTWWOiRs?autoplay=1&rel=0&showinfo=0&mute=1&loop=1&vq=hd2160"
              title="Phú Yên Cinematic - Sony FX30"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            {/* <div className="absolute bottom-5 right-5 rounded-lg bg-white px-4 py-3 font-mono text-xs font-black shadow-[0_3px_12px_rgba(0,0,0,0.18)]">
              Hello
            </div> */}
          </div>
        </section>


        <section className="border-t-2 border-black bg-[#b9efff]">
          <div className="flex flex-col items-center justify-center border-b-2 border-black bg-white p-8 text-center sm:p-[13.25vw] lg:p-[7vw]">
            <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.28em] text-neutral-500">
              Experience Vietnam
            </p>
            <h2 className="mb-6 font-mono text-4xl font-black leading-none sm:text-5xl">
              Cinematic Journeys
            </h2>
            <p className="mb-8 max-w-[600px] font-mono text-lg text-neutral-600">
              Immerse yourself in the vibrant culture, stunning landscapes, and bustling city streets before your trip even begins.
            </p>
          </div>
          <div className="grid grid-cols-1 bg-black gap-[2px] md:grid-cols-2 lg:grid-cols-3">
            {[shotUni, shot7Video, shot6Video, shot1Video, shot2Video, shot5Video].map((videoSrc, index) => (
              <div key={index} className="relative aspect-[4/5] bg-white lg:aspect-square">
                <VideoPlayer
                  src={videoSrc}
                  className="h-full w-full object-cover grayscale-[30%] transition-all duration-500 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="planner" className="tekina-workspace bg-[#f7f7f2] px-4 py-6 sm:px-8 sm:py-10 lg:px-[7vw]">
          <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="h-fit border-2 border-black bg-white p-5 font-mono lg:sticky lg:top-[124px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-neutral-500">Live budget</p>
                  <h2 className="mt-2 text-4xl font-black leading-none">Planner</h2>
                </div>
                <div className={`border-2 border-black px-2.5 py-1 text-[11px] font-black ${getTextColor()}`}>
                  {isOverBudget ? (
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      OVER
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      SAFE
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-black uppercase">
                  <span>Total {formatVnd(totalCost)}</span>
                  <span>{budgetPercent}%</span>
                </div>
                <div className="h-4 w-full overflow-hidden border-2 border-black bg-white">
                  <div
                    className={`h-full transition-all duration-500 ${getProgressColor()} ${getProgressGlow()}`}
                    style={{ width: `${budgetPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500">
                  <span>Target: {formatVnd(state.targetBudget)}</span>
                  <span>{formatVnd(Math.max(0, state.targetBudget - totalCost))} left</span>
                </div>
              </div>

              <div className="mt-6 border-2 border-black p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6" />
                  <div>
                    <span className="block text-[11px] font-black uppercase text-neutral-500">Cost per person</span>
                    <span className="text-sm font-bold">{state.travelers} travelers</span>
                  </div>
                </div>
                <strong className="mt-3 block text-2xl">{formatVnd(costPerPerson)}</strong>
                <span className="block text-xs text-neutral-500">approx. {formatUsd(costPerPerson)}</span>
              </div>

              <nav className="mt-6 grid grid-cols-2 gap-2">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center justify-center gap-2 border-2 border-black px-3 py-3 text-xs font-black uppercase transition-transform active:scale-95 ${activeTab === id ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#b9efff]'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="min-h-[720px] overflow-hidden border-2 border-black bg-white">
              {activeTab === 'dashboard' && (
                <DashboardTab
                  state={state}
                  onChange={setState}
                  hotelList={hotelList}
                  totals={{
                    lodging: lodgingCost,
                    food: foodCost,
                    carRental: carRentalCost,
                    taxi: taxiCost,
                    total: totalCost
                  }}
                  onReset={handleReset}
                  onRefreshHotels={loadHotels}
                  isSyncing={isSyncing}
                  syncError={hotelError}
                />
              )}

              {activeTab === 'hotels' && (
                <HotelsTab
                  state={state}
                  onChange={setState}
                  hotelList={hotelList}
                  isLoading={isLoadingHotels}
                  error={hotelError}
                  isFallback={isFallback}
                />
              )}

              {activeTab === 'food' && (
                <FoodTab
                  state={state}
                  onChange={setState}
                />
              )}

              {activeTab === 'transport' && (
                <TransportTab
                  state={state}
                  onChange={setState}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

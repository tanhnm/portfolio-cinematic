import { useState } from 'react';
import type { TripBudgetState, RideCommute } from '../types/travel';
import { 
  Car, 
  MapPin, 
  Trash2, 
  Plus, 
  Compass
} from 'lucide-react';

interface TransportTabProps {
  state: TripBudgetState;
  onChange: (state: TripBudgetState) => void;
}

export const TransportTab: React.FC<TransportTabProps> = ({ state, onChange }) => {
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');
  const [newCost, setNewCost] = useState<number>(0);

  const formatVnd = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
  };

  const formatUsd = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value / 25400);
  };

  // Predefined Local Grab / Taxi Commute Presets
  const GRAB_PRESETS = [
    { from: 'Noi Bai Airport (HAN)', to: 'Hanoi Old Quarter', cost: 280000 },
    { from: 'Tan Son Nhat (SGN)', to: 'HCMC District 1', cost: 160000 },
    { from: 'Da Nang Airport (DAD)', to: 'Hoi An Ancient Town', cost: 320000 },
    { from: 'Hotel', to: 'Local City Attractions', cost: 60000 }
  ];

  // Rental Presets
  const RENTAL_PRESETS = [
    { label: 'Motorbike (e.g. Wave Alpha)', rate: 150000, fuel: 80000 },
    { label: 'Premium Bike (e.g. AirBlade)', rate: 200000, fuel: 100000 },
    { label: 'Compact Car / Taxi Rental', rate: 1200000, fuel: 500000 }
  ];

  const handleRentalChange = (field: 'rate' | 'days' | 'fuel', value: number) => {
    onChange({
      ...state,
      carRental: {
        ...state.carRental,
        [field]: value
      }
    });
  };

  const applyRentalPreset = (rate: number, fuel: number) => {
    onChange({
      ...state,
      carRental: {
        rate,
        days: state.days, // set to match trip days by default
        fuel
      }
    });
  };

  const handleAddCommute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFrom.trim() || !newTo.trim() || newCost <= 0) return;

    const newItem: RideCommute = {
      id: Date.now().toString(),
      from: newFrom.trim(),
      to: newTo.trim(),
      cost: newCost
    };

    onChange({
      ...state,
      taxiCommutes: [...state.taxiCommutes, newItem]
    });

    setNewFrom('');
    setNewTo('');
    setNewCost(0);
  };

  const handleAddPresetCommute = (preset: { from: string, to: string, cost: number }) => {
    const newItem: RideCommute = {
      id: Date.now().toString(),
      from: preset.from,
      to: preset.to,
      cost: preset.cost
    };

    onChange({
      ...state,
      taxiCommutes: [...state.taxiCommutes, newItem]
    });
  };

  const handleDeleteCommute = (id: string) => {
    onChange({
      ...state,
      taxiCommutes: state.taxiCommutes.filter(c => c.id !== id)
    });
  };

  const rentalTotal = (state.carRental.rate * state.carRental.days) + state.carRental.fuel;
  const taxiTotal = state.taxiCommutes.reduce((acc, cur) => acc + cur.cost, 0);
  const grandTotal = rentalTotal + taxiTotal;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24 animate-slide-up">
      {/* Category Totals */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-4 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Transport Total Cost</span>
          <span className="text-xl font-black text-slate-100">{formatVnd(grandTotal)}</span>
          <span className="text-[10px] text-slate-550 block mt-0.5">
            Rentals: {formatVnd(rentalTotal)} | Rides: {formatVnd(taxiTotal)}
          </span>
        </div>
        <div className="text-right">
          <Car className="w-8 h-8 text-teal-400 opacity-60 ml-auto" />
        </div>
      </div>

      {/* Module 1: Car / Motorbike Rental Tracker */}
      <div className="glassmorphism rounded-2xl p-5 shadow-sm border border-slate-800 space-y-4">
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5 border-b border-slate-800/50 pb-2">
          <Car className="w-4 h-4 text-emerald-400" />
          Car & Motorbike Rentals
        </h3>

        {/* Presets */}
        <div className="space-y-1.5">
          <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Rental Presets</span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {RENTAL_PRESETS.map((preset, idx) => {
              const isMatch = state.carRental.rate === preset.rate;
              return (
                <button
                  key={idx}
                  onClick={() => applyRentalPreset(preset.rate, preset.fuel)}
                  className={`text-[10px] font-bold px-3 py-2 rounded-xl shrink-0 transition-colors border ${
                    isMatch 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' 
                      : 'bg-slate-950 border-slate-900 text-slate-450 hover:bg-slate-900/50'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Daily Rental (VND)</label>
            <input
              type="text"
              value={state.carRental.rate === 0 ? '' : state.carRental.rate.toLocaleString('vi-VN')}
              onChange={(e) => handleRentalChange('rate', parseInt(e.target.value.replace(/\D/g, '')) || 0)}
              placeholder="0"
              className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-100 font-bold focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Rental Days</label>
            <div className="flex items-center bg-slate-950 border border-slate-900 rounded-xl p-0.5 justify-between">
              <button
                onClick={() => handleRentalChange('days', Math.max(0, state.carRental.days - 1))}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-black text-sm active:scale-95 transition-all"
              >
                -
              </button>
              <span className="text-xs font-bold text-slate-200">{state.carRental.days}</span>
              <button
                onClick={() => handleRentalChange('days', state.carRental.days + 1)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-black text-sm active:scale-95 transition-all"
              >
                +
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Estimated Fuel/Gas (VND)</label>
            <input
              type="text"
              value={state.carRental.fuel === 0 ? '' : state.carRental.fuel.toLocaleString('vi-VN')}
              onChange={(e) => handleRentalChange('fuel', parseInt(e.target.value.replace(/\D/g, '')) || 0)}
              placeholder="e.g. 100,000"
              className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-100 font-bold focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-xs bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
          <span className="text-slate-400 font-medium">Rental Subtotal</span>
          <span className="text-slate-200 font-bold font-mono">{formatVnd(rentalTotal)}</span>
        </div>
      </div>

      {/* Module 2: Taxi / Grab Commute Allowance */}
      <div className="glassmorphism rounded-2xl p-5 shadow-sm border border-slate-800 space-y-4">
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5 border-b border-slate-800/50 pb-2">
          <Compass className="w-4 h-4 text-emerald-400" />
          Taxi & Ride-Hailing (Grab) Log
        </h3>

        {/* Grab Presets quick additions */}
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1.5">Add Vietnam Grab Presets</span>
          <div className="grid grid-cols-2 gap-2">
            {GRAB_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleAddPresetCommute(preset)}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-900 p-2 rounded-xl text-left transition-colors active:scale-95 flex flex-col justify-between"
              >
                <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold truncate">
                  <MapPin className="w-2.5 h-2.5 text-teal-400 shrink-0" />
                  {preset.to}
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[10px] text-slate-450 truncate max-w-[70px]">{preset.from}</span>
                  <span className="text-[9px] font-bold text-teal-400 font-mono shrink-0">{formatVnd(preset.cost)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add custom commute form */}
        <form onSubmit={handleAddCommute} className="bg-slate-950/60 border border-slate-900 rounded-xl p-3.5 space-y-3">
          <span className="text-slate-300 text-[11px] font-bold block">Log Custom Commute</span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={newFrom}
              onChange={(e) => setNewFrom(e.target.value)}
              placeholder="From: e.g. Hotel"
              className="bg-slate-900 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-teal-500 text-slate-200"
            />
            <input
              type="text"
              value={newTo}
              onChange={(e) => setNewTo(e.target.value)}
              placeholder="To: e.g. Old Quarter"
              className="bg-slate-900 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-teal-500 text-slate-200"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={newCost === 0 ? '' : newCost.toLocaleString('vi-VN')}
                onChange={(e) => setNewCost(parseInt(e.target.value.replace(/\D/g, '')) || 0)}
                placeholder="Est. Cost (VND)"
                className="w-full bg-slate-900 border border-slate-850 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-200 font-bold"
              />
              <span className="absolute right-3 top-2.5 text-[10px] text-slate-500 font-bold">VND</span>
            </div>
            
            <button
              type="submit"
              className="bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs p-2 rounded-lg transition-all flex items-center gap-1 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Log Commute
            </button>
          </div>
        </form>

        {/* Current logged commutes list */}
        <div className="space-y-2">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Commute List ({state.taxiCommutes.length})</span>
          {state.taxiCommutes.length === 0 ? (
            <div className="text-center py-6 bg-slate-950/20 border border-slate-900 rounded-xl">
              <span className="text-slate-600 text-xs">No commutes registered yet.</span>
            </div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {state.taxiCommutes.map(commute => (
                <div
                  key={commute.id}
                  className="bg-slate-950/40 border border-slate-850/60 rounded-xl p-3 flex justify-between items-center text-xs hover:border-slate-800 transition-colors"
                >
                  <div className="space-y-0.5 max-w-[190px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-200 truncate">{commute.from}</span>
                      <span className="text-slate-650 text-[10px]">➔</span>
                      <span className="text-[11px] font-bold text-slate-200 truncate">{commute.to}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      {formatVnd(commute.cost)} ≈ {formatUsd(commute.cost)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteCommute(commute.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 active:scale-90 transition-all rounded-lg hover:bg-slate-900"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

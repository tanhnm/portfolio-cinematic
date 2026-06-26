import { useState } from 'react';
import type { TripBudgetState, FoodAllocation, DailyFoodLogs } from '../types/travel';
import { Coffee, Utensils, Award, Sparkles, Copy, Check } from 'lucide-react';

interface FoodTabProps {
  state: TripBudgetState;
  onChange: (state: TripBudgetState) => void;
}

export const FoodTab: React.FC<FoodTabProps> = ({ state, onChange }) => {
  const [activeDay, setActiveDay] = useState<number>(0);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const formatVnd = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
  };

  const getDayTotal = (dayAlloc: FoodAllocation) => {
    if (!dayAlloc) return 0;
    return (dayAlloc.breakfast || 0) + (dayAlloc.lunch || 0) + (dayAlloc.dinner || 0);
  };

  const getFoodGrandTotal = () => {
    return Object.values(state.food).reduce((acc, cur) => acc + getDayTotal(cur), 0);
  };

  const updateMealCost = (dayIndex: number, meal: keyof FoodAllocation, amount: number) => {
    const dayData = state.food[dayIndex] || { breakfast: 0, lunch: 0, dinner: 0 };
    const nextCost = Math.max(0, (dayData[meal] || 0) + amount);

    onChange({
      ...state,
      food: {
        ...state.food,
        [dayIndex]: {
          ...dayData,
          [meal]: nextCost
        }
      }
    });
  };

  const setMealPreset = (dayIndex: number, meal: keyof FoodAllocation, cost: number) => {
    const dayData = state.food[dayIndex] || { breakfast: 0, lunch: 0, dinner: 0 };
    onChange({
      ...state,
      food: {
        ...state.food,
        [dayIndex]: {
          ...dayData,
          [meal]: cost
        }
      }
    });
  };

  // Bulk Apply options to write to all days
  const applyPresetToAllDays = (breakfast: number, lunch: number, dinner: number) => {
    const updatedFood: DailyFoodLogs = {};
    for (let i = 0; i < state.days; i++) {
      updatedFood[i] = { breakfast, lunch, dinner };
    }
    onChange({
      ...state,
      food: updatedFood
    });
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const applyActiveDayToAll = () => {
    const currentAllocation = state.food[activeDay] || { breakfast: 50000, lunch: 150000, dinner: 250000 };
    const updatedFood: DailyFoodLogs = {};
    for (let i = 0; i < state.days; i++) {
      updatedFood[i] = { ...currentAllocation };
    }
    onChange({
      ...state,
      food: updatedFood
    });
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const activeDayAllocation = state.food[activeDay] || { breakfast: 0, lunch: 0, dinner: 0 };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-24 animate-slide-up">
      {/* Food Budget Summary Header */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Food & Dining Total</span>
          <span className="text-xl font-black text-slate-100">{formatVnd(getFoodGrandTotal())}</span>
          <span className="text-[10px] text-slate-550 block mt-0.5">
            Avg: {formatVnd(getFoodGrandTotal() / state.days)} / day
          </span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-500 block">Total Meals</span>
          <span className="text-sm font-bold text-slate-200">{state.days * 3} meals logged</span>
        </div>
      </div>

      {/* Global Presets Controller */}
      <div className="glassmorphism rounded-2xl p-4 shadow-sm border border-slate-800 space-y-3">
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Bulk Preset Application
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => applyPresetToAllDays(50000, 50000, 50000)}
            className="bg-slate-950 hover:bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-left transition-colors group active:scale-95"
          >
            <span className="text-[10px] font-bold text-amber-400 block group-hover:text-amber-300">Street Food Only</span>
            <span className="text-[11px] text-slate-350 block">50k VND / meal</span>
            <span className="text-[9px] text-slate-500 font-mono block mt-1">Total: {formatVnd(150000 * state.days)}</span>
          </button>

          <button
            onClick={() => applyPresetToAllDays(50000, 250000, 250000)}
            className="bg-slate-950 hover:bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-left transition-colors group active:scale-95"
          >
            <span className="text-[10px] font-bold text-teal-400 block group-hover:text-teal-300">Restaurant Mix</span>
            <span className="text-[11px] text-slate-350 block">50k Bfast + 250k L/D</span>
            <span className="text-[9px] text-slate-500 font-mono block mt-1">Total: {formatVnd(550000 * state.days)}</span>
          </button>
        </div>

        <div className="flex gap-2 pt-1.5">
          <button
            onClick={applyActiveDayToAll}
            className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <Copy className="w-3.5 h-3.5" />
            Duplicate active day to all days
          </button>
        </div>

        {copiedSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] p-2 rounded-lg flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Presets successfully applied across all {state.days} days!
          </div>
        )}
      </div>

      {/* Days Tabs Selector */}
      <div className="space-y-3">
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Daily Cost Logs</label>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {Array.from({ length: state.days }).map((_, index) => {
            const dayAllocation = state.food[index] || { breakfast: 0, lunch: 0, dinner: 0 };
            const dayTotal = getDayTotal(dayAllocation);
            const isActive = activeDay === index;

            return (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border min-w-[72px] transition-all ${isActive
                    ? 'bg-teal-400/10 text-teal-400 border-teal-400/40 shadow-sm'
                    : 'bg-slate-900 border-slate-850 hover:border-slate-800 text-slate-400'
                  }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wide">Day {index + 1}</span>
                <span className={`text-[10px] font-mono mt-0.5 ${isActive ? 'text-teal-400' : 'text-slate-350'}`}>{dayTotal > 0 ? `${(dayTotal / 1000)}k` : '0k'}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Panel */}
        <div className="glassmorphism rounded-2xl p-4 shadow-sm border border-slate-800 space-y-4 animate-fade-in" key={activeDay}>
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <span className="text-sm font-bold text-slate-200">Day {activeDay + 1} Meal Breakdown</span>
            <span className="text-xs font-mono font-bold text-teal-400">Total: {formatVnd(getDayTotal(activeDayAllocation))}</span>
          </div>

          <div className="space-y-4">
            {/* Breakfast Slot */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Breakfast Log</span>
                </div>
                <span className="text-xs font-mono text-slate-350">{formatVnd(activeDayAllocation.breakfast)}</span>
              </div>

              {/* Presets and Stepper row */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 flex-1">
                  <button
                    onClick={() => setMealPreset(activeDay, 'breakfast', 50000)}
                    className={`text-[9px] font-bold py-1.5 px-2 rounded-lg flex-1 border transition-colors ${activeDayAllocation.breakfast === 50000
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        : 'bg-slate-950 border-slate-900 text-slate-450 hover:bg-slate-900/50'
                      }`}
                  >
                    Street (50k)
                  </button>
                  <button
                    onClick={() => setMealPreset(activeDay, 'breakfast', 150000)}
                    className={`text-[9px] font-bold py-1.5 px-2 rounded-lg flex-1 border transition-colors ${activeDayAllocation.breakfast === 150000
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        : 'bg-slate-950 border-slate-900 text-slate-450 hover:bg-slate-900/50'
                      }`}
                  >
                    Hotel/Cafe (150k)
                  </button>
                </div>

                <div className="flex items-center bg-slate-950 border border-slate-900 rounded-lg p-0.5">
                  <button
                    onClick={() => updateMealCost(activeDay, 'breakfast', -10000)}
                    className="w-6.5 h-6.5 text-xs text-slate-400 hover:text-slate-200 active:bg-slate-900 rounded font-black"
                  >
                    -
                  </button>
                  <span className="text-[10px] text-slate-500 px-2 font-mono">10k</span>
                  <button
                    onClick={() => updateMealCost(activeDay, 'breakfast', 10000)}
                    className="w-6.5 h-6.5 text-xs text-slate-400 hover:text-slate-200 active:bg-slate-900 rounded font-black"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Lunch Slot */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Lunch Log</span>
                </div>
                <span className="text-xs font-mono text-slate-350">{formatVnd(activeDayAllocation.lunch)}</span>
              </div>

              {/* Presets and Stepper row */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 flex-1">
                  <button
                    onClick={() => setMealPreset(activeDay, 'lunch', 50000)}
                    className={`text-[9px] font-bold py-1.5 px-2 rounded-lg flex-1 border transition-colors ${activeDayAllocation.lunch === 50000
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                        : 'bg-slate-950 border-slate-900 text-slate-450 hover:bg-slate-900/50'
                      }`}
                  >
                    Street (50k)
                  </button>
                  <button
                    onClick={() => setMealPreset(activeDay, 'lunch', 250000)}
                    className={`text-[9px] font-bold py-1.5 px-2 rounded-lg flex-1 border transition-colors ${activeDayAllocation.lunch === 250000
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                        : 'bg-slate-950 border-slate-900 text-slate-450 hover:bg-slate-900/50'
                      }`}
                  >
                    Restaurant (250k)
                  </button>
                </div>

                <div className="flex items-center bg-slate-950 border border-slate-900 rounded-lg p-0.5">
                  <button
                    onClick={() => updateMealCost(activeDay, 'lunch', -50000)}
                    className="w-6.5 h-6.5 text-xs text-slate-400 hover:text-slate-200 active:bg-slate-900 rounded font-black"
                  >
                    -
                  </button>
                  <span className="text-[10px] text-slate-500 px-2 font-mono">50k</span>
                  <button
                    onClick={() => updateMealCost(activeDay, 'lunch', 50000)}
                    className="w-6.5 h-6.5 text-xs text-slate-400 hover:text-slate-200 active:bg-slate-900 rounded font-black"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Dinner Slot */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Dinner Log</span>
                </div>
                <span className="text-xs font-mono text-slate-350">{formatVnd(activeDayAllocation.dinner)}</span>
              </div>

              {/* Presets and Stepper row */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 flex-1">
                  <button
                    onClick={() => setMealPreset(activeDay, 'dinner', 50000)}
                    className={`text-[9px] font-bold py-1.5 px-2 rounded-lg flex-1 border transition-colors ${activeDayAllocation.dinner === 50000
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-slate-950 border-slate-900 text-slate-450 hover:bg-slate-900/50'
                      }`}
                  >
                    Street (50k)
                  </button>
                  <button
                    onClick={() => setMealPreset(activeDay, 'dinner', 250000)}
                    className={`text-[9px] font-bold py-1.5 px-2 rounded-lg flex-1 border transition-colors ${activeDayAllocation.dinner === 250000
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-slate-950 border-slate-900 text-slate-450 hover:bg-slate-900/50'
                      }`}
                  >
                    Restaurant (250k)
                  </button>
                </div>

                <div className="flex items-center bg-slate-950 border border-slate-900 rounded-lg p-0.5">
                  <button
                    onClick={() => updateMealCost(activeDay, 'dinner', -50000)}
                    className="w-6.5 h-6.5 text-xs text-slate-400 hover:text-slate-200 active:bg-slate-900 rounded font-black"
                  >
                    -
                  </button>
                  <span className="text-[10px] text-slate-500 px-2 font-mono">50k</span>
                  <button
                    onClick={() => updateMealCost(activeDay, 'dinner', 50000)}
                    className="w-6.5 h-6.5 text-xs text-slate-400 hover:text-slate-200 active:bg-slate-900 rounded font-black"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

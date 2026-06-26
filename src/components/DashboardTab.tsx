import { useState } from 'react';
import type { TripBudgetState, HotelItem } from '../types/travel';
import {
  Users,
  Calendar,
  RefreshCw,
  Database,
  TrendingUp,
  Layers,
  Info
} from 'lucide-react';
import { getSavedSheetUrl, saveSheetUrl } from '../services/hotelApi';

interface DashboardTabProps {
  state: TripBudgetState;
  onChange: (state: TripBudgetState) => void;
  hotelList: HotelItem[];
  totals: {
    lodging: number;
    food: number;
    carRental: number;
    taxi: number;
    total: number;
  };
  onReset: () => void;
  onRefreshHotels: () => Promise<void>;
  isSyncing: boolean;
  syncError: string | null;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  state,
  onChange,
  hotelList,
  totals,
  onReset,
  onRefreshHotels,
  isSyncing,
  syncError
}) => {
  const [sheetUrl, setSheetUrl] = useState(getSavedSheetUrl());
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  const selectedHotel = hotelList.find(h => h.id === state.selectedHotelId);

  const formatVnd = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const formatUsd = (value: number) => {
    // 1 USD = 25,400 VND
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value / 25400);
  };

  const handleTargetBudgetChange = (val: string) => {
    const numeric = parseInt(val.replace(/\D/g, '')) || 0;
    onChange({ ...state, targetBudget: numeric });
  };

  const adjustTravelers = (amount: number) => {
    const current = state.travelers;
    const next = Math.max(1, current + amount);
    onChange({ ...state, travelers: next });
  };

  const adjustDays = (amount: number) => {
    const current = state.days;
    const next = Math.max(1, current + amount);

    // Adjust food allocations to match new days length
    const updatedFood = { ...state.food };
    if (amount > 0) {
      for (let i = current; i < next; i++) {
        updatedFood[i] = { breakfast: 50000, lunch: 150000, dinner: 250000 };
      }
    } else {
      for (let i = next; i < current; i++) {
        delete updatedFood[i];
      }
    }

    onChange({
      ...state,
      days: next,
      food: updatedFood,
      selectedHotelNights: Math.max(1, next - 1)
    });
  };

  const handleSaveUrl = () => {
    saveSheetUrl(sheetUrl);
    onRefreshHotels();
  };

  const budgetRatio = totals.total / (state.targetBudget || 1);
  const budgetPercent = Math.min(100, Math.round(budgetRatio * 100));

  // Visual Category Percentages
  const getPercentage = (catValue: number) => {
    if (totals.total === 0) return 0;

    return Math.round((catValue / totals.total) * 100);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24 animate-slide-up">
      {/* Target Budget Card */}
      <div className="glassmorphism rounded-2xl p-5 shadow-lg border border-slate-800">
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Budget Engine Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-slate-300 text-xs block mb-1">Target Trip Budget (VND)</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={state.targetBudget === 0 ? '' : state.targetBudget.toLocaleString('vi-VN')}
                onChange={(e) => handleTargetBudgetChange(e.target.value)}
                placeholder="e.g. 20,000,000"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-xl font-bold focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-700"
              />
              <span className="absolute right-4 text-xs font-medium text-slate-500">
                ≈ {formatUsd(state.targetBudget)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Travelers Stepper */}
            <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-slate-400 text-[11px] block mb-1">Travelers</span>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => adjustTravelers(-1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-750 active:scale-95 transition-all text-lg font-bold"
                >
                  -
                </button>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span className="text-slate-100 font-bold text-lg">{state.travelers}</span>
                </div>
                <button
                  onClick={() => adjustTravelers(1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-750 active:scale-95 transition-all text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Days Stepper */}
            <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-slate-400 text-[11px] block mb-1">Trip Duration</span>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => adjustDays(-1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-750 active:scale-95 transition-all text-lg font-bold"
                >
                  -
                </button>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span className="text-slate-100 font-bold text-lg">{state.days}d</span>
                </div>
                <button
                  onClick={() => adjustDays(1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-750 active:scale-95 transition-all text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown Analysis */}
      <div className="glassmorphism rounded-2xl p-5 shadow-lg border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            Budget Allocation
          </h3>
          <span className="text-xs text-slate-500">{budgetPercent}% Spent</span>
        </div>

        {/* Mini progress bar allocations */}
        <div className="space-y-4">
          {/* Lodging */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
                Lodging ({getPercentage(totals.lodging)}%)
              </span>
              <span className="text-slate-400 font-medium">
                {formatVnd(totals.lodging)}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${getPercentage(totals.lodging)}%` }}
              ></div>
            </div>
            {selectedHotel && (
              <span className="text-[10px] text-slate-500 block mt-1 truncate">
                Selected: {selectedHotel.name} ({state.selectedHotelNights} nights)
              </span>
            )}
          </div>

          {/* Food */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                Meals & Food ({getPercentage(totals.food)}%)
              </span>
              <span className="text-slate-400 font-medium">
                {formatVnd(totals.food)}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${getPercentage(totals.food)}%` }}
              ></div>
            </div>
          </div>

          {/* Transport Rental */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                Car/Motorbike Rental ({getPercentage(totals.carRental)}%)
              </span>
              <span className="text-slate-400 font-medium">
                {formatVnd(totals.carRental)}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${getPercentage(totals.carRental)}%` }}
              ></div>
            </div>
          </div>

          {/* Ride commutes */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span>
                Grab / Taxi Allowance ({getPercentage(totals.taxi)}%)
              </span>
              <span className="text-slate-400 font-medium">
                {formatVnd(totals.taxi)}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-500"
                style={{ width: `${getPercentage(totals.taxi)}%` }}
              ></div>
            </div>
            {state.taxiCommutes.length > 0 && (
              <span className="text-[10px] text-slate-500 block mt-1">
                {state.taxiCommutes.length} commutes registered
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Google Sheets API Config */}
      <div className="glassmorphism rounded-2xl p-5 shadow-lg border border-slate-800">
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-400" />
            Google Sheets DB Live Sync
          </span>
          <button
            onClick={() => setShowConfigHelp(!showConfigHelp)}
            className="text-[11px] text-teal-400 hover:underline flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            {showConfigHelp ? 'Hide Setup' : 'How to Setup?'}
          </button>
        </h3>

        {showConfigHelp && (
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-900 text-slate-400 text-xs space-y-2 mb-4 leading-relaxed animate-fade-in">
            <p className="font-semibold text-slate-300">Run your own dynamic database:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Create a Google Sheet with columns: <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">id, name, rating, type, reviewScore, location, price, source</code></li>
              <li>Go to Extensions → Apps Script. Paste script:
                <pre className="bg-slate-950 text-indigo-300 p-2 rounded text-[10px] overflow-x-auto mt-1 max-h-24">
                  {`function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var json = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    json.push(obj);
  }
  return ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
}`}
                </pre>
              </li>
              <li>Click <b>Deploy</b> → <b>New Deployment</b>. Set Access to "Anyone".</li>
              <li>Copy the <b>Web App URL</b> and paste it below.</li>
            </ol>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-slate-300 text-xs block mb-1">Google Sheets Web App URL</label>
            <input
              type="text"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveUrl}
              disabled={isSyncing}
              className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Save & Sync DB'}
            </button>

            {getSavedSheetUrl() && (
              <button
                onClick={() => {
                  setSheetUrl('');
                  saveSheetUrl('');
                  onRefreshHotels();
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-2.5 px-3 rounded-xl active:scale-95 transition-all"
              >
                Disconnect
              </button>
            )}
          </div>

          {syncError && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl flex items-start gap-2">
              <span className="font-bold">⚠️</span>
              <span>{syncError}</span>
            </div>
          )}

          {!syncError && getSavedSheetUrl() && !isSyncing && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-2.5 rounded-xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Successfully linked to live Google Sheets database.</span>
            </div>
          )}
        </div>
      </div>

      {/* Action panel */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={onReset}
          className="flex-1 border border-slate-800 hover:bg-slate-800/40 text-slate-400 hover:text-slate-300 text-xs py-3 rounded-xl font-medium transition-all active:scale-95"
        >
          Reset Itinerary
        </button>
      </div>
    </div>
  );
};

import { create } from 'zustand';
import { CountryData, TimelineEvent } from '../types/index';
import { mockCountries, mockEvents } from '../data/mockData';

interface AppState {
  selectedCountry: CountryData | null;
  currentDate: string; // ISO Date YYYY-MM-DD
  isAutoPlayPaused: boolean;
  autoPlayTimer: number; // 0 to 100 or seconds
  currentEvent: TimelineEvent | null;
  
  // Restore missing properties
  isPlaying: boolean;
  events: TimelineEvent[];
  countries: CountryData[];
  showIntro: boolean;

  setSelectedCountry: (country: CountryData | null) => void;
  setCurrentDate: (date: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsAutoPlayPaused: (paused: boolean) => void;
  setAutoPlayTimer: (timer: number) => void;
  setCurrentEvent: (event: TimelineEvent | null) => void;
  playNextWeek: () => void;
  setCountries: (countries: CountryData[]) => void;
  setShowIntro: (show: boolean) => void;
  showReferences: boolean;
  setShowReferences: (show: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  selectedCountry: null,
  currentDate: '2025-03-15',
  isPlaying: false,
  isAutoPlayPaused: false,
  autoPlayTimer: 0,
  currentEvent: null,
  events: mockEvents,
  countries: mockCountries,
  showIntro: true,
  showReferences: false,

  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsAutoPlayPaused: (paused) => set({ isAutoPlayPaused: paused }),
  setAutoPlayTimer: (timer) => set({ autoPlayTimer: timer }),
  setCurrentEvent: (event) => set({ currentEvent: event }),
  setCountries: (countries) => set({ countries }),
  setShowIntro: (show) => set({ showIntro: show }),
  setShowReferences: (show) => set({ showReferences: show }),
  playNextWeek: () =>
    set((state) => {
      const date = new Date(state.currentDate);
      date.setDate(date.getDate() + 7);
      // Loop back if end of year (simplified)
      if (date.getFullYear() > 2025) return { currentDate: '2025-03-15' };
      return { currentDate: date.toISOString().split('T')[0] };
    }),
}));

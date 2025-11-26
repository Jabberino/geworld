import { create } from 'zustand';
import { CountryData, TimelineEvent } from '../types/index';
import { mockCountries, mockEvents } from '../data/mockData';

interface AppState {
  selectedCountry: CountryData | null;
  currentDate: string; // ISO Date YYYY-MM-DD
  isPlaying: boolean;
  events: TimelineEvent[];
  countries: CountryData[];
  
  setSelectedCountry: (country: CountryData | null) => void;
  setCurrentDate: (date: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  playNextWeek: () => void;
  setCountries: (countries: CountryData[]) => void;
}

export const useStore = create<AppState>((set) => ({
  selectedCountry: null,
  currentDate: '2025-01-01',
  isPlaying: false,
  events: mockEvents,
  countries: mockCountries,

  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCountries: (countries) => set({ countries }),
  playNextWeek: () =>
    set((state) => {
      const date = new Date(state.currentDate);
      date.setDate(date.getDate() + 7);
      // Loop back if end of year (simplified)
      if (date.getFullYear() > 2025) return { currentDate: '2025-01-01' };
      return { currentDate: date.toISOString().split('T')[0] };
    }),
}));

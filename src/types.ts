export type EventType = 'THREAT' | 'IMPOSITION' | 'RELIEF' | 'COMMENTARY';

export interface TimelineEvent {
  id: string;
  date: string; // ISO Date
  countryCode: string | 'GLOBAL'; // 'VN', 'TH', or 'GLOBAL'
  headline: string;
  description: string;
  type: EventType;
  severity: number; // 1-5 (determines dot size)
}

export interface CountryMetric {
  date: string; // YYYY-MM
  spotRate: number; // e.g., 25,000 VND/USD
  spotRateDelta: number; // % change from previous month (for visual coloring)
  exportShare: number; // % of Global Trade
}

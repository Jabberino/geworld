export type EventType = 'THREAT' | 'IMPOSITION' | 'RELIEF' | 'COMMENTARY';

export interface TimelineEvent {
  id: string;
  date: string; // ISO Date YYYY-MM-DD
  countryCode: string | 'GLOBAL'; // 'VN', 'TH', or 'GLOBAL'
  headline: string;
  description: string;
  type: EventType;
  severity: number; // 1-5 (determines dot size)
}

export interface CountryMetric {
  date: string; // YYYY-MM
  spotRate: number; // e.g., 25,000 VND/USD
  spotRateDelta: number; // % change from previous month
  exportShare: number; // % of Global Trade
}

export interface CountryData {
  code: string; // ISO 2-letter code
  name: string;
  flag: string; // Emoji or URL
  leader: string;
  metrics: CountryMetric[];
  events: TimelineEvent[];
  trumpSensitivityScore: number;
  topExport: string;
  usTradeDeficit: number; // Percentage
  lat: number;
  lng: number;
}

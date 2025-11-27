export type EventType = 'THREAT' | 'IMPOSITION' | 'RELIEF' | 'COMMENTARY' | 'AGREEMENT';

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
  spotRate: number | null; // e.g., 25,000 VND/USD
  spotRateDelta?: number; // % change from previous month
  exportShare?: number; // % of Global Trade
  tradeBalance?: number | null; // Trade Balance (Exports - Imports)
}

export interface CountryData {
  code: string; // ISO 2-letter code
  name: string;
  flag: string; // Emoji or URL
  leader: string;
  metrics: CountryMetric[];
  events: TimelineEvent[];
  topExport: string;
  lat: number;
  lng: number;
  analysis?: {
    policyResponse: string[];
    researchAnalysis: string;
  };
}

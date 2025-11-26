import { TimelineEvent, CountryMetric } from './types';

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2023-01-15T00:00:00.000Z',
    countryCode: 'VN',
    headline: 'Trump threatens 25% tariff on Vietnamese textiles',
    description: 'In a late-night tweet, President Trump announced he was considering a 25% tariff on all textile imports from Vietnam, citing unfair trade practices.',
    type: 'THREAT',
    severity: 4,
  },
  {
    id: '2',
    date: '2023-02-20T00:00:00.000Z',
    countryCode: 'GLOBAL',
    headline: 'US administration announces new trade deal with Asian nations',
    description: 'A new trade deal has been signed, though details remain sparse. The deal is expected to impact global supply chains.',
    type: 'RELIEF',
    severity: 3,
  },
  {
    id: '3',
    date: '2023-03-10T00:00:00.000Z',
    countryCode: 'TH',
    headline: 'Thailand responds to US trade pressure',
    description: 'The Thai government has issued a statement regarding the recent trade pressures from the United States.',
    type: 'COMMENTARY',
    severity: 2,
  },
    {
    id: '4',
    date: '2023-04-05T00:00:00.000Z',
    countryCode: 'VN',
    headline: 'Vietnam and US reach agreement on textile trade',
    description: 'An agreement has been reached between Vietnam and the US, avoiding the threatened tariffs on textiles.',
    type: 'RELIEF',
    severity: 5,
  },
];

export const mockCountryMetrics: { [countryCode: string]: CountryMetric[] } = {
  VN: [
    { date: '2023-01', spotRate: 23200, spotRateDelta: 0.5, exportShare: 2.5 },
    { date: '2023-02', spotRate: 23350, spotRateDelta: 0.6, exportShare: 2.6 },
    { date: '2023-03', spotRate: 23300, spotRateDelta: -0.2, exportShare: 2.5 },
    { date: '2023-04', spotRate: 23100, spotRateDelta: -0.9, exportShare: 2.7 },
  ],
  TH: [
    { date: '2023-01', spotRate: 32.5, spotRateDelta: -0.2, exportShare: 1.8 },
    { date: '2023-02', spotRate: 32.8, spotRateDelta: 0.9, exportShare: 1.9 },
    { date: '2023-03', spotRate: 33.1, spotRateDelta: 0.9, exportShare: 2.0 },
    { date: '2023-04', spotRate: 33.0, spotRateDelta: -0.3, exportShare: 1.9 },
  ],
};

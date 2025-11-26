import { CountryData, TimelineEvent } from '../types/index';

const generateMetrics = (startValue: number, volatility: number) => {
  const metrics = [];
  let currentValue = startValue;
  for (let i = 0; i < 12; i++) {
    const date = `2025-${String(i + 1).padStart(2, '0')}`;
    const change = (Math.random() - 0.5) * volatility;
    currentValue = currentValue * (1 + change);
    metrics.push({
      date,
      spotRate: currentValue,
      spotRateDelta: change * 100,
      exportShare: 5 + Math.random() * 2,
    });
  }
  return metrics;
};

export const mockEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2025-01-15',
    countryCode: 'GLOBAL',
    headline: 'Trump Inauguration Speech',
    description: 'President Trump announces "America First" trade policy review.',
    type: 'COMMENTARY',
    severity: 3,
  },
  {
    id: '2',
    date: '2025-02-10',
    countryCode: 'VN',
    headline: 'Tariff Threat on Electronics',
    description: 'Trump tweets about "unfair" trade balance with Vietnam.',
    type: 'THREAT',
    severity: 4,
  },
  {
    id: '3',
    date: '2025-03-05',
    countryCode: 'TH',
    headline: 'Auto Parts Tariff Imposed',
    description: '25% tariff imposed on Thai auto parts.',
    type: 'IMPOSITION',
    severity: 5,
  },
  {
    id: '4',
    date: '2025-04-20',
    countryCode: 'VN',
    headline: 'Trade Deal Talks',
    description: 'Vietnam delegation meets with US Trade Representative.',
    type: 'RELIEF',
    severity: 2,
  },
  {
    id: '5',
    date: '2025-05-15',
    countryCode: 'ID',
    headline: 'Nickel Export Ban Review',
    description: 'US investigates Indonesia nickel supply chain.',
    type: 'THREAT',
    severity: 3,
  },
  {
    id: '6',
    date: '2025-06-10',
    countryCode: 'MY',
    headline: 'Solar Panel Tariff',
    description: 'New tariffs on Malaysian solar exports.',
    type: 'IMPOSITION',
    severity: 4,
  },
  {
    id: '7',
    date: '2025-07-01',
    countryCode: 'PH',
    headline: 'Defense Pact Strengthened',
    description: 'US reaffirms commitment to Philippines defense.',
    type: 'RELIEF',
    severity: 1,
  },
  {
    id: '8',
    date: '2025-08-20',
    countryCode: 'SG',
    headline: 'Financial Hub Stability',
    description: 'Singapore praised for regulatory clarity.',
    type: 'COMMENTARY',
    severity: 1,
  },
];

export const mockCountries: CountryData[] = [
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    leader: 'To Lam',
    metrics: generateMetrics(25000, 0.05),
    events: mockEvents.filter((e) => e.countryCode === 'VN'),
    trumpSensitivityScore: 8.5,
    topExport: 'Electronics & Textiles',
    usTradeDeficit: 15,
    lat: 14.0583,
    lng: 108.2772,
  },
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    leader: 'Paetongtarn Shinawatra',
    metrics: generateMetrics(35, 0.03),
    events: mockEvents.filter((e) => e.countryCode === 'TH'),
    trumpSensitivityScore: 6.2,
    topExport: 'Automotive Parts',
    usTradeDeficit: 8,
    lat: 15.8700,
    lng: 100.9925,
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    leader: 'Prabowo Subianto',
    metrics: generateMetrics(16000, 0.04),
    events: mockEvents.filter((e) => e.countryCode === 'ID'),
    trumpSensitivityScore: 5.5,
    topExport: 'Coal & Palm Oil',
    usTradeDeficit: 4,
    lat: -0.7893,
    lng: 113.9213,
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    leader: 'Anwar Ibrahim',
    metrics: generateMetrics(4.5, 0.03),
    events: mockEvents.filter((e) => e.countryCode === 'MY'),
    trumpSensitivityScore: 6.8,
    topExport: 'Semiconductors',
    usTradeDeficit: 6,
    lat: 4.2105,
    lng: 101.9758,
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    leader: 'Bongbong Marcos',
    metrics: generateMetrics(56, 0.02),
    events: mockEvents.filter((e) => e.countryCode === 'PH'),
    trumpSensitivityScore: 4.2,
    topExport: 'Electronics',
    usTradeDeficit: 2,
    lat: 12.8797,
    lng: 121.7740,
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    leader: 'Lawrence Wong',
    metrics: generateMetrics(1.35, 0.01),
    events: mockEvents.filter((e) => e.countryCode === 'SG'),
    trumpSensitivityScore: 3.0,
    topExport: 'Refined Petroleum',
    usTradeDeficit: -5, // Surplus
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    code: 'BN',
    name: 'Brunei',
    flag: '🇧🇳',
    leader: 'Hassanal Bolkiah',
    metrics: generateMetrics(1.3, 0.01),
    events: [],
    trumpSensitivityScore: 2.5,
    topExport: 'Crude Petroleum',
    usTradeDeficit: 0.5,
    lat: 4.5353,
    lng: 114.7277,
  },
  {
    code: 'KH',
    name: 'Cambodia',
    flag: '🇰🇭',
    leader: 'Hun Manet',
    metrics: generateMetrics(25, 0.04),
    events: [],
    trumpSensitivityScore: 5.0,
    topExport: 'Textiles',
    usTradeDeficit: 3,
    lat: 12.5657,
    lng: 104.9910,
  },
  {
    code: 'LA',
    name: 'Laos',
    flag: '🇱🇦',
    leader: 'Thongloun Sisoulith',
    metrics: generateMetrics(18, 0.03),
    events: [],
    trumpSensitivityScore: 4.0,
    topExport: 'Electricity',
    usTradeDeficit: 0.2,
    lat: 19.8563,
    lng: 102.4955,
  },
  {
    code: 'MM',
    name: 'Myanmar',
    flag: '🇲🇲',
    leader: 'Min Aung Hlaing',
    metrics: generateMetrics(12, 0.06),
    events: [],
    trumpSensitivityScore: 7.0,
    topExport: 'Natural Gas',
    usTradeDeficit: 0.1,
    lat: 21.9162,
    lng: 95.9560,
  },
];

export const generateCountry = (code: string, name: string, lat: number, lng: number): CountryData => {
  // Check if we already have a predefined one
  const existing = mockCountries.find(c => c.code === code);
  if (existing) return existing;

  // Otherwise generate random
  const volatility = 0.01 + Math.random() * 0.05;
  const startRate = 1 + Math.random() * 100;
  
  return {
    code,
    name,
    flag: '🏳️', // Generic flag
    leader: 'Head of State',
    metrics: generateMetrics(startRate, volatility),
    events: [],
    trumpSensitivityScore: Math.floor(Math.random() * 10), // 0-9
    topExport: 'General Goods',
    usTradeDeficit: Math.floor((Math.random() * 20) - 10),
    lat,
    lng,
  };
};

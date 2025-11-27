export interface MetricData {
  date: string;
  spotRate: number | null;
  tradeBalance: number | null;
}

const spotData: Record<string, Record<string, number>> = {
  "JAN": { Brunei: 1.3624, Cambodia: 4003.72, Indonesia: 16266.39, Laos: 21648.62, Malaysia: 4.4686, Myanmar: 2100.00, Philippines: 58.398, Singapore: 1.3624, Thailand: 34.2714, Vietnam: 25309.00 },
  "FEB": { Brunei: 1.3473, Cambodia: 3928.49, Indonesia: 16313.22, Laos: 21478.45, Malaysia: 4.4404, Myanmar: 2100.00, Philippines: 58.033, Singapore: 1.3473, Thailand: 33.7631, Vietnam: 25437.00 },
  "MAR": { Brunei: 1.3369, Cambodia: 3943.84, Indonesia: 16460.04, Laos: 21365.99, Malaysia: 4.4346, Myanmar: 2100.00, Philippines: 57.432, Singapore: 1.3369, Thailand: 33.8048, Vietnam: 25549.00 },
  "APR": { Brunei: 1.3246, Cambodia: 3948.91, Indonesia: 16802.38, Laos: 21452.35, Malaysia: 4.4164, Myanmar: 2100.00, Philippines: 56.872, Singapore: 1.3246, Thailand: 33.7527, Vietnam: 25861.25 },
  "MAY": { Brunei: 1.2953, Cambodia: 3915.49, Indonesia: 16441.82, Laos: 21405.93, Malaysia: 4.2694, Myanmar: 2098.00, Philippines: 55.617, Singapore: 1.2953, Thailand: 32.9815, Vietnam: 25959.80 },
  "JUN": { Brunei: 1.2839, Cambodia: 3960.30, Indonesia: 16304.51, Laos: 21426.18, Malaysia: 4.2418, Myanmar: 2098.00, Philippines: 56.332, Singapore: 1.2839, Thailand: 32.6181, Vietnam: 26080.00 },
  "JUL": { Brunei: 1.2803, Cambodia: 3949.80, Indonesia: 16280.47, Laos: 21360.72, Malaysia: 4.2350, Myanmar: 2098.35, Philippines: 56.790, Singapore: 1.2803, Thailand: 32.4277, Vietnam: 26147.00 },
  "AUG": { Brunei: 1.2852, Cambodia: 3933.84, Indonesia: 16301.17, Laos: 21396.49, Malaysia: 4.2308, Myanmar: 2099.00, Philippines: 57.090, Singapore: 1.2852, Thailand: 32.4189, Vietnam: 26273.75 },
  "SEP": { Brunei: 1.2850, Cambodia: 3974.58, Indonesia: 16521.04, Laos: 21519.31, Malaysia: 4.2135, Myanmar: 2099.38, Philippines: 57.232, Singapore: 1.2850, Thailand: 31.9845, Vietnam: 26372.80 },
  "OCT": { Brunei: 1.2953, Cambodia: 3992.33, Indonesia: 16592.17, Laos: 21571.58, Malaysia: 4.2181, Myanmar: 2099.15, Philippines: 58.326, Singapore: 1.2953, Thailand: 32.5700, Vietnam: 26318.40 }
};

const tradeData: Record<string, Record<string, number | null>> = {
  "2024-10": { Brunei: 339231, Cambodia: -614357, Indonesia: 2483301, Laos: null, Malaysia: 2760871, Myanmar: null, Philippines: -6492913, Singapore: 3584294, Thailand: -1152267, Vietnam: null },
  "2024-11": { Brunei: 321097, Cambodia: -38707, Indonesia: 4366510, Laos: null, Malaysia: 3393770, Myanmar: null, Philippines: -5493530, Singapore: 4884797, Thailand: -596604, Vietnam: 1066000 },
  "2024-12": { Brunei: 273240, Cambodia: -287046, Indonesia: 2240147, Laos: null, Malaysia: 4290715, Myanmar: null, Philippines: -4702055, Singapore: 2968560, Thailand: -323384, Vietnam: 524000 },
  "2025-01": { Brunei: 574467, Cambodia: -360143, Indonesia: 3492368, Laos: null, Malaysia: 819471, Myanmar: null, Philippines: -5122190, Singapore: 3741428, Thailand: -2222800, Vietnam: 3024800 },
  "2025-02": { Brunei: 345866, Cambodia: -27726, Indonesia: 3095180, Laos: null, Malaysia: 2839869, Myanmar: null, Philippines: -3456620, Singapore: 5587411, Thailand: 1676247, Vietnam: -1550000 },
  "2025-03": { Brunei: 370274, Cambodia: -137867, Indonesia: 4327283, Laos: null, Malaysia: 5584885, Myanmar: null, Philippines: -4512700, Singapore: 3656807, Thailand: 442837, Vietnam: 1634500 },
  "2025-04": { Brunei: 299184, Cambodia: -507705, Indonesia: 158833, Laos: null, Malaysia: 1161898, Myanmar: null, Philippines: -3972600, Singapore: 8805236, Thailand: -3792284, Vietnam: 576700 },
  "2025-05": { Brunei: 194866, Cambodia: -441664, Indonesia: 4301501, Laos: null, Malaysia: 178206, Myanmar: null, Philippines: -3632190, Singapore: 4523129, Thailand: 682485, Vietnam: 550600 },
  "2025-06": { Brunei: null, Cambodia: -80845, Indonesia: 4103515, Laos: null, Malaysia: 1981399, Myanmar: null, Philippines: -4396280, Singapore: 6745154, Thailand: 694629, Vietnam: 2826400 },
  "2025-07": { Brunei: null, Cambodia: 114523, Indonesia: 4173447, Laos: null, Malaysia: 3447883, Myanmar: null, Philippines: -4422940, Singapore: 5546484, Thailand: -57961, Vietnam: 2267000 },
  "2025-08": { Brunei: null, Cambodia: 301744, Indonesia: 5487929, Laos: null, Malaysia: 3749658, Myanmar: null, Philippines: -3986200, Singapore: 3732575, Thailand: -2362206, Vietnam: 3717100 },
  "2025-09": { Brunei: null, Cambodia: -195591, Indonesia: null, Laos: null, Malaysia: 4714353, Myanmar: null, Philippines: null, Singapore: 4897687, Thailand: 839835, Vietnam: 2845900 },
};

const monthMap: Record<string, string> = {
  "JAN": "2025-01", "FEB": "2025-02", "MAR": "2025-03", "APR": "2025-04",
  "MAY": "2025-05", "JUN": "2025-06", "JUL": "2025-07", "AUG": "2025-08",
  "SEP": "2025-09", "OCT": "2025-10", "NOV": "2025-11", "DEC": "2025-12"
};

export const getRealMetrics = (countryName: string): MetricData[] => {
  const metrics: Map<string, MetricData> = new Map();

  // Initialize with all dates from trade data (which covers 2024-2025)
  Object.keys(tradeData).forEach(date => {
    metrics.set(date, { date, tradeBalance: tradeData[date][countryName] ?? null, spotRate: null });
  });

  // Merge spot data (2025 only)
  Object.keys(spotData).forEach(monthKey => {
    const date = monthMap[monthKey];
    if (!metrics.has(date)) {
      metrics.set(date, { date, tradeBalance: null, spotRate: null });
    }
    const current = metrics.get(date)!;
    current.spotRate = spotData[monthKey][countryName] ?? null;
  });

  // Sort by date
  return Array.from(metrics.values()).sort((a, b) => a.date.localeCompare(b.date));
};

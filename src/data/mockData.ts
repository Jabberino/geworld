import { CountryData, TimelineEvent } from '../types/index';
import { getRealMetrics } from './realMetrics';
import { analysisData } from './analysisData';

export const mockEvents: TimelineEvent[] = [
  // Vietnam (VN)
  {
    id: "eo-14257-threat",
    date: "2025-04-02",
    countryCode: "VN",
    headline: "EO 14257 Threatens 46% Tariff on Vietnam",
    description: "President Trump signs Executive Order 14257 ('Liberation Day'), designating Vietnam's trade surplus as a national emergency and setting a reciprocal tariff rate of 46% on Vietnamese imports, significantly higher than the global baseline.",
    type: "THREAT",
    severity: 5
  },
  {
    id: "eo-14266-suspension",
    date: "2025-04-09",
    countryCode: "VN",
    headline: "EO 14266 Suspends 46% Rate for Negotiations",
    description: "Following Hanoi's immediate engagement, the White House issues EO 14266, suspending the 46% tariff for 90 days to allow for bilateral negotiations, temporarily averting the immediate economic shock.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "us-vietnam-framework-deal",
    date: "2025-07-02",
    countryCode: "VN",
    headline: "Trump Announces Deal Lowering Rate to 20%",
    description: "President Trump announces a preliminary trade framework with Vietnam. The deal successfully lowers the threatened 46% tariff to a 20% reciprocal rate, provided Vietnam eliminates duties on US imports.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "eo-14316-extension",
    date: "2025-07-07",
    countryCode: "VN",
    headline: "EO 14316 Extends Negotiation Window",
    description: "Executive Order 14316 is signed, extending the tariff suspension period from July 9 to August 1, 2025, to finalize the technical details of the new 20% rate framework.",
    type: "RELIEF",
    severity: 1
  },
  {
    id: "eo-14326-implementation",
    date: "2025-07-31",
    countryCode: "VN",
    headline: "EO 14326 Codifies 20% Tariff Effective Aug 7",
    description: "The Administration issues Executive Order 14326, formally modifying the Harmonized Tariff Schedule to impose the agreed 20% reciprocal tariff on Vietnamese goods, effective August 7, 2025.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "cit-solar-ruling",
    date: "2025-08-29",
    countryCode: "VN",
    headline: "Court Reinstates Retroactive Solar Duties",
    description: "The US Court of International Trade rules in 'Auxin Solar v. Biden' that the previous administration's solar tariff pause was illegal, exposing Vietnamese solar module importers to billions in retroactive duties despite the new trade deal.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "eo-14346-exemptions",
    date: "2025-09-05",
    countryCode: "VN",
    headline: "EO 14346 Creates 'Annex III' Exemption Path",
    description: "Executive Order 14346 establishes 'Annex III', a legal mechanism allowing the USTR to grant 0% reciprocal tariff rates to specific products (ag/tech) from aligned partners, creating the pathway for Vietnam's future exemptions.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "final-reciprocal-agreement",
    date: "2025-10-26",
    countryCode: "VN",
    headline: "US-Vietnam Finalize Zero-Tariff Protocol",
    description: "The US and Vietnam finalize the Reciprocal Trade Agreement. Vietnam commits to zero tariffs on US agriculture/autos, and in exchange, specific Vietnamese exports are moved to the EO 14346 'Annex III' zero-tariff list.",
    type: "RELIEF",
    severity: 4
  },

  // Thailand (TH)
  {
    id: "solar-bridge-expiry-2024",
    date: "2024-06-06",
    countryCode: "TH",
    headline: "Solar Tariff Moratorium Expires",
    description: "The two-year waiver (Presidential Proclamation 10414) on AD/CVD duties for solar cells and modules from Thailand expired. Imports after this date became subject to retroactive duties unless utilized/installed by December 2024.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "ad-order-truck-tires-final",
    date: "2024-12-17",
    countryCode: "TH",
    headline: "Antidumping Order: Truck & Bus Tires",
    description: "US Dept of Commerce issued the formal Antidumping Duty Order (89 FR 83636) on Thai truck tires. Bridgestone was assigned a 48.39% dumping margin; other Thai exporters assigned 12.33%.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "eo-14257-announcement",
    date: "2025-04-02",
    countryCode: "TH",
    headline: "EO 14257 'Liberation Day' Tariffs",
    description: "President formally signed Executive Order 14257, declaring a national emergency under IEEPA and establishing a 'Reciprocal Tariff' framework to address trade deficits, threatening baseline tariffs on all partners including Thailand.",
    type: "THREAT",
    severity: 5
  },
  {
    id: "eo-14257-suspension",
    date: "2025-04-09",
    countryCode: "TH",
    headline: "Reciprocal Tariff Implementation Paused",
    description: "Administration suspended the immediate application of EO 14257 tariffs for 90 days to allow for bilateral negotiations. Thailand accepted the window to prepare a response.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "reciprocal-tariff-notification-th",
    date: "2025-07-07",
    countryCode: "TH",
    headline: "Notification of 36% Tariff Rate",
    description: "US Trade Representative formally notified Thailand of a calculated Reciprocal Tariff rate of 36% to be applied if negotiations failed before the August deadline.",
    type: "THREAT",
    severity: 4
  },
  {
    id: "reciprocal-tariff-modification",
    date: "2025-07-31",
    countryCode: "TH",
    headline: "Thailand Rate Negotiated to 19%",
    description: "Following successful negotiations, the White House issued the 'Further Modifying the Reciprocal Tariff Rates' order, lowering Thailand's specific rate from the threatened 36% to 19%.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "reciprocal-tariff-implementation",
    date: "2025-08-07",
    countryCode: "TH",
    headline: "19% Reciprocal Tariff Effective",
    description: "The negotiated 19% reciprocal tariff on Thai-origin goods formally went into effect at 12:01 a.m. EST, as confirmed by PwC Thailand Tax Alert 08/2025 and government gazettes.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "ag-exemptions-nov-2025",
    date: "2025-11-14",
    countryCode: "TH",
    headline: "Agricultural Product Exemptions",
    description: "President issued a new Executive Order exempting specific agricultural goods (coffee, tea, spices, bananas) from the Reciprocal Tariff regime (Annex I), effective November 13, 2025.",
    type: "RELIEF",
    severity: 3
  },

  // Philippines (PH)
  {
    id: "eo-14257-announcement-ph",
    date: "2025-04-02",
    countryCode: "PH",
    headline: "EO 14257 Threatens Reciprocal Tariffs (~20%)",
    description: "President Trump issues Executive Order 14257, establishing the legal framework for reciprocal tariffs. Initial projections estimate a 20% rate on Philippine goods to combat trade deficits.",
    type: "THREAT",
    severity: 5
  },
  {
    id: "eo-14266-suspension-ph",
    date: "2025-04-09",
    countryCode: "PH",
    headline: "EO 14266 Suspends Tariffs for 90 Days",
    description: "Executive Order 14266 formally suspends the Philippines' country-specific reciprocal tariff for 90 days, pausing the immediate economic impact to allow for emergency negotiations.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "negotiation-update-june",
    date: "2025-06-30",
    countryCode: "PH",
    headline: "Negotiators Signal Rate Drop for Industrial Concessions",
    description: "US trade negotiators publicly indicate that the threatened 20% rate could be lowered if the Philippines accepts near-zero tariffs on key US industrial exports.",
    type: "COMMENTARY",
    severity: 1
  },
  {
    id: "eo-14316-extension-ph",
    date: "2025-07-07",
    countryCode: "PH",
    headline: "EO 14316 Extends Suspension to August 1",
    description: "Executive Order 14316 is signed, extending the tariff suspension window until August 1, 2025, to provide a final buffer for concluding trade talks.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "eo-14326-implementation-ph",
    date: "2025-07-31",
    countryCode: "PH",
    headline: "EO 14326 Sets 19% Rate Effective August 7",
    description: "Executive Order 14326 formally concludes the negotiation period, setting the final Philippines reciprocal tariff rate at 19%, effective August 7, 2025.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "eo-14346-ag-exemptions",
    date: "2025-11-14",
    countryCode: "PH",
    headline: "EO 14346 Exempts Bananas and Pineapples",
    description: "Executive Order 14346 is issued, exempting specific agricultural exports (bananas, pineapples, coconut products) from the 19% reciprocal tariff, citing historical agricultural cooperation.",
    type: "RELIEF",
    severity: 3
  },

  // Cambodia (KH)
  {
    id: "ofac-sanctions-ly-yong-phat",
    date: "2024-09-12",
    countryCode: "KH",
    headline: "OFAC Sanctions Senator Ly Yong Phat and L.Y.P. Group",
    description: "US Treasury designates tycoon Ly Yong Phat and L.Y.P. Group under Global Magnitsky for human trafficking in scam centers, freezing US assets and setting a precedent for strict compliance demands in 2025 negotiations.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "eo-14257-threat-kh",
    date: "2025-04-02",
    countryCode: "KH",
    headline: "EO 14257 Proposes 49% Reciprocal Tariff on Cambodia",
    description: "President Trump issues Executive Order 14257 ('Liberation Day Tariffs'), citing a 'national emergency' in trade deficits. Cambodia is targeted with a 49% tariff rate, one of the highest globally.",
    type: "THREAT",
    severity: 5
  },
  {
    id: "eo-14266-suspension-kh",
    date: "2025-04-09",
    countryCode: "KH",
    headline: "EO 14266 Suspends Tariffs for 90-Day Negotiation",
    description: "Following market reaction, the White House issues EO 14266, suspending the country-specific 49% rate for 90 days. Cambodia temporarily reverts to a 10% baseline tariff while negotiators discuss concessions.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "solar-adcvd-final-2025",
    date: "2025-04-23",
    countryCode: "KH",
    headline: "Commerce Finalizes 3,521% Duty on Uncooperative Solar Firms",
    description: "Separate from the reciprocal tariffs, the US Commerce Department finalizes Anti-Dumping rates up to 3,521% on Cambodian solar manufacturers (e.g., Solar Long PV Tech) deemed uncooperative in the circumvention probe.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "eo-14326-implementation-kh",
    date: "2025-07-31",
    countryCode: "KH",
    headline: "EO 14326 Sets Final Reciprocal Rate at 19%",
    description: "Concluding the negotiation window, the President signs EO 14326. Cambodia's reciprocal tariff is finalized at 19% (down from 49%), effective August 7, 2025. Specific agricultural exemptions (Annex II) are granted.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "kh-tariff-elimination",
    date: "2025-08-01",
    countryCode: "KH",
    headline: "Cambodia Eliminates Tariffs on US Goods",
    description: "In response to the stabilized 19% rate, Cambodia announces the immediate elimination of duties on 100% of US industrial and agricultural exports, meeting a key US negotiation demand.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "reciprocal-trade-agreement-signed",
    date: "2025-10-26",
    countryCode: "KH",
    headline: "US and Cambodia Sign Agreement on Reciprocal Trade",
    description: "The bilateral 'Agreement on Reciprocal Trade' is formally signed. It codifies the 19% US tariff rate, the zero-tariff entry for US goods into Cambodia, and includes new commitments on digital trade and labor monitoring.",
    type: "RELIEF",
    severity: 1
  },

  // Myanmar (MM)
  {
    id: "eo-14257-reciprocal-threat-mm",
    date: "2025-04-02",
    countryCode: "MM",
    headline: "EO 14257 Announces 40% Reciprocal Tariff Threat",
    description: "President signs EO 14257 ('Liberation Day'), notifying Myanmar of a potential 40% tariff rate to rectify trade imbalances, one of the highest assigned rates in ASEAN.",
    type: "THREAT",
    severity: 4
  },
  {
    id: "eo-14266-suspension-mm",
    date: "2025-04-09",
    countryCode: "MM",
    headline: "EO 14266 Suspends Tariffs for Negotiation",
    description: "The imposition of country-specific reciprocal tariffs is suspended for 90 days to allow for bilateral negotiations. Myanmar's 40% rate is paused.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "ofac-kna-designation",
    date: "2025-05-05",
    countryCode: "MM",
    headline: "Sanctions on Karen National Army (KNA)",
    description: "OFAC designates the KNA and leader Saw Chit Thu as a Transnational Criminal Organization for facilitating cyber scams, separate from the tariff track.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "eo-14316-extension-mm",
    date: "2025-07-07",
    countryCode: "MM",
    headline: "EO 14316 Extends Tariff Suspension to August",
    description: "The suspension of reciprocal tariffs is extended until August 1, 2025, as negotiations continue without a breakthrough for Myanmar.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "eo-14326-implementation-mm",
    date: "2025-07-31",
    countryCode: "MM",
    headline: "EO 14326 Implements 40% Tariff Rate",
    description: "Negotiations fail to yield concessions. EO 14326 formally sets Myanmar's reciprocal tariff rate at 40%, effective August 7, 2025.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "ofac-scam-compound-network",
    date: "2025-09-08",
    countryCode: "MM",
    headline: "Sanctions on KK Park Scam Network",
    description: "Treasury designates 12 companies linked to the 'KK Park' scam compound. This tightens financial screws while the 40% trade tariff is in full effect.",
    type: "IMPOSITION",
    severity: 5
  },

  // Laos (LA)
  {
    id: "eo-14257-announcement-la",
    date: "2025-04-02",
    countryCode: "LA",
    headline: "EO 14257 Threatens 48% Reciprocal Tariff",
    description: "President Trump signs EO 14257 'Liberation Day', proposing a 48% reciprocal tariff on Laos based on calculated effective duty differentials. This order also establishes the framework for a separate 10% Universal Baseline Tariff.",
    type: "THREAT",
    severity: 5
  },
  {
    id: "baseline-tariff-effective",
    date: "2025-04-05",
    countryCode: "LA",
    headline: "10% Universal Baseline Tariff Takes Effect",
    description: "While reciprocal rates are debated, the 10% Universal Baseline Tariff officially enters into force for all goods from Laos. This is distinct from the reciprocal threat and is applied immediately to all HTSUS codes.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "eo-14266-suspension-la",
    date: "2025-04-09",
    countryCode: "LA",
    headline: "EO 14266 Suspends Reciprocal Tariffs 90 Days",
    description: "To allow for high-level negotiations, President Trump signs EO 14266. This order officially suspends the implementation of the country-specific reciprocal tariffs (the 48% rate for Laos) for a 90-day window, while leaving the 10% baseline in place.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "laos-rate-reduction",
    date: "2025-07-07",
    countryCode: "LA",
    headline: "Reciprocal Rate Lowered to 40%",
    description: "Following the 90-day negotiation period, the Administration announces via letter that the reciprocal tariff rate for Laos will be modified from the initial 48% calculation down to 40%, citing minor concessions but a failure to reach a full free trade agreement.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "eo-14326-formalization",
    date: "2025-07-31",
    countryCode: "LA",
    headline: "EO 14326 Finalizes 40% Tariff Rate",
    description: "Executive Order 14326 is signed, formally codifying the 40% reciprocal duty on Laos in 'Annex I'. This legalizes the rate announced earlier in the month and sets the implementation clock.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "reciprocal-tariff-effective",
    date: "2025-08-07",
    countryCode: "LA",
    headline: "40% Reciprocal Tariff Enters Force",
    description: "The suspension period expires and the new 40% reciprocal tariff officially takes effect at 12:01 AM. Combined with the existing 10% baseline, Lao imports now face a substantial cumulative tax burden.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "eo-14346-exemption-pathway",
    date: "2025-09-05",
    countryCode: "LA",
    headline: "EO 14346 Creates Annex III Pathway",
    description: "The Administration signs EO 14346, creating 'Annex III', a mechanism allowing countries to apply for zero-tariff status on specific goods if diplomatic conditions are met. While Laos is not immediately added, this opens a legal door for future relief.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "ag-exemptions-nov-2025-la",
    date: "2025-11-14",
    countryCode: "LA",
    headline: "Agricultural Product Exemptions Granted",
    description: "A USTR notice confirms that 237 agricultural classifications (including specific Lao coffee and tea exports) are granted exemption from the reciprocal tariffs to prevent domestic supply shortages in the US.",
    type: "RELIEF",
    severity: 3
  },

  // Singapore (SG)
  {
    id: "deepseek-export-control-allegations",
    date: "2025-01-20",
    countryCode: "SG",
    headline: "DeepSeek Evasion Probe Targets Singapore",
    description: "Following the launch of DeepSeek's AI model, the US House Select Committee alleges the Chinese firm bypassed export controls on Nvidia H800 chips using Singapore-based intermediaries, triggering immediate US scrutiny on Singapore's transshipment hubs.",
    type: "THREAT",
    severity: 2
  },
  {
    id: "mti-deepseek-compliance-statement",
    date: "2025-02-01",
    countryCode: "SG",
    headline: "Singapore MTI Denies DeepSeek Complicity",
    description: "Singapore's Ministry of Trade and Industry (MTI) issues a statement denying state complicity in DeepSeek's chip acquisition, pledging full cooperation with US investigations to avoid secondary sanctions.",
    type: "COMMENTARY",
    severity: 1
  },
  {
    id: "singapore-police-chip-raids",
    date: "2025-03-03",
    countryCode: "SG",
    headline: "Singapore Raids 22 Locations for Chip Diversion",
    description: "In a preemptive move to demonstrate compliance, Singapore Police raid 22 locations and arrest 9 individuals for 'customs fraud' linked to the diversion of US servers/chips to Malaysia and China.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "eo-venezuelan-oil-tariff-threat",
    date: "2025-03-24",
    countryCode: "SG",
    headline: "Threat of 25% Tariff for Venezuelan Oil",
    description: "President Trump signs an Executive Order threatening a 25% tariff on all goods from countries importing Venezuelan oil. Singapore (a minor importer) is specifically named in reports as a potential target alongside China and India.",
    type: "THREAT",
    severity: 3
  },
  {
    id: "ieepa-reciprocal-tariff-announcement",
    date: "2025-04-02",
    countryCode: "SG",
    headline: "Reciprocal Tariff EO Signed (10% Baseline)",
    description: "The US Administration invokes IEEPA to sign the 'Reciprocal Tariff to Rectify Trade Practices' order. It establishes a 10% baseline tariff for Singapore, rejecting an exemption despite the US-Singapore FTA.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "reciprocal-tariff-effective-date",
    date: "2025-04-05",
    countryCode: "SG",
    headline: "10% Baseline Tariff Takes Effect",
    description: "The 10% universal baseline tariff on imports from Singapore formally enters into force. This rate is lower than the 20-40% applied to other nations with larger trade surpluses.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "house-committee-deepseek-report",
    date: "2025-04-16",
    countryCode: "SG",
    headline: "House Report Confirms Singapore Nexus",
    description: "The US House Select Committee releases the 'DeepSeek Unmasked' report, explicitly concluding that the firm used Singaporean third parties to circumvent export controls, increasing pressure for stricter enforcement.",
    type: "THREAT",
    severity: 3
  },
  {
    id: "transshipment-penalty-effective",
    date: "2025-08-07",
    countryCode: "SG",
    headline: "40% Transshipment Penalty Enforced",
    description: "A new Executive Order provision takes effect, imposing a punitive 40% tariff on any goods from Singapore found to be 'transshipped' to evade duties or export controls, directly targeting the loopholes identified in the DeepSeek probe.",
    type: "IMPOSITION",
    severity: 5
  },
  {
    id: "supreme-court-tariff-hearing",
    date: "2025-11-05",
    countryCode: "SG",
    headline: "Supreme Court Hears Tariff Legality Case",
    description: "The US Supreme Court hears oral arguments on the legality of the IEEPA tariffs. Plaintiffs argue the administration overstepped its authority, citing the US trade surplus with partners like Singapore as evidence against a 'national emergency'.",
    type: "COMMENTARY",
    severity: 2
  },

  // Malaysia (MY)
  {
    id: "solar-moratorium-expiration-2024",
    date: "2024-06-06",
    countryCode: "MY",
    headline: "Solar Tariff Moratorium Expires",
    description: "Presidential Proclamation 10414 expires, ending duty-free access for Malaysian solar cells/modules. Imports not 'utilized' by Dec 3, 2024, become subject to retroactive duties, restarting the enforcement lifecycle.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "brightway-wro-lifted",
    date: "2024-10-11",
    countryCode: "MY",
    headline: "CBP Revokes Forced Labor WRO on Brightway",
    description: "US Customs modifies the Withhold Release Order against Brightway Group after remediation of forced labor indicators, effectively lifting the ban on their disposable gloves entering the US market.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "eo-14257-reciprocal-threat-my",
    date: "2025-04-02",
    countryCode: "MY",
    headline: "EO 14257 Threats Reciprocal Tariffs",
    description: "President signs EO 14257, establishing a 'Reciprocal Tariff' baseline. Malaysia is flagged for a potential 25% duty to rectify the trade deficit, triggering immediate bilateral consultations.",
    type: "THREAT",
    severity: 5
  },
  {
    id: "eo-14266-suspension-my",
    date: "2025-04-09",
    countryCode: "MY",
    headline: "EO 14266 Suspends Tariffs for Negotiation",
    description: "Executive Order 14266 pauses the implementation of the country-specific reciprocal tariffs (set by EO 14257) for 90 days to allow for high-level trade negotiations.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "solar-ad-cvd-affirmative-2025",
    date: "2025-04-24",
    countryCode: "MY",
    headline: "US Imposes 34.4% Solar Duties",
    description: "Following anti-circumvention probes, the US imposes a blanket 34.4% import duty on Malaysian solar panels (with some firms higher), citing benefits from Chinese subsidies.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "eo-14316-extension-my",
    date: "2025-07-07",
    countryCode: "MY",
    headline: "EO 14316 Extends Tariff Suspension",
    description: "Executive Order 14316 extends the negotiation window/suspension of tariffs until August 1, 2025, as US-Malaysia officials finalize purchase commitments.",
    type: "RELIEF",
    severity: 2
  },
  {
    id: "eo-14326-implementation-my",
    date: "2025-07-31",
    countryCode: "MY",
    headline: "EO 14326 Sets 19% Reciprocal Rate",
    description: "Executive Order 14326 formally sets Malaysia's reciprocal tariff rate at 19% (reduced from the threatened 25%), effective August 7, 2025, following initial purchase pledges.",
    type: "IMPOSITION",
    severity: 4
  },
  {
    id: "eo-14346-strategic-exemptions",
    date: "2025-09-05",
    countryCode: "MY",
    headline: "EO 14346 Exempts Strategic Goods (Annex III)",
    description: "Executive Order 14346 creates 'Annex III,' granting 0% reciprocal tariff rates to specific Malaysian exports, including semiconductors and aerospace components, pending a final deal.",
    type: "RELIEF",
    severity: 3
  },
  {
    id: "agreement-reciprocal-trade-signed",
    date: "2025-10-26",
    countryCode: "MY",
    headline: "US-Malaysia Sign Agreement on Reciprocal Trade",
    description: "The 'Agreement on Reciprocal Trade' is formally signed. Malaysia commits to $70B in US investments and waives Digital Services Taxes in exchange for the 19% tariff cap and supply chain partner status.",
    type: "AGREEMENT",
    severity: 1
  },
  {
    id: "eo-14360-ag-exemptions",
    date: "2025-11-14",
    countryCode: "MY",
    headline: "EO 14360 Exempts Agriculture & Petrochemicals",
    description: "Executive Order 14360 (sometimes cited as the Ag Exemption Order) adds agricultural products (coffee, tea, spices) and LNG/petrochemicals to the duty-free list, citing lack of US domestic production.",
    type: "RELIEF",
    severity: 3
  },

  // Indonesia (ID) - Retained from previous mock data
  {
    id: "15",
    date: "2025-05-25",
    countryCode: "ID",
    headline: "US Delegation Visits Jakarta",
    description: "Trade envoys explore cooperation on nickel supply chain.",
    type: "COMMENTARY",
    severity: 2,
  },
  {
    id: "16",
    date: "2025-06-12",
    countryCode: "ID",
    headline: "Nickel Export Duty Considered",
    description: "US signals potential tariff on processed nickel from Indonesia.",
    type: "THREAT",
    severity: 4,
  },
  {
    id: "id-nickel-dispute",
    date: "2025-07-15",
    countryCode: "ID",
    headline: "US Challenges Nickel Ban",
    description: "USTR raises concerns over Indonesia's raw nickel export ban, suggesting it violates trade agreements.",
    type: "THREAT",
    severity: 3,
  },
  {
    id: "id-trade-deal-talks",
    date: "2025-09-20",
    countryCode: "ID",
    headline: "Critical Minerals Agreement Talks",
    description: "Indonesia and US begin formal talks on a Limited Free Trade Agreement focused on critical minerals.",
    type: "RELIEF",
    severity: 2,
  },
  {
    id: "id-deal-signed",
    date: "2025-11-10",
    countryCode: "ID",
    headline: "Critical Minerals Deal Signed",
    description: "US and Indonesia sign the CMA, allowing Indonesian nickel to qualify for IRA tax credits.",
    type: "AGREEMENT",
    severity: 1,
  },

  // Brunei (BN) - Retained from previous mock data
  {
    id: "28",
    date: "2025-12-10",
    countryCode: "BN",
    headline: "Petrochemical Trade Note",
    description: "US comments positively on Brunei’s environmental monitoring progress.",
    type: "COMMENTARY",
    severity: 1,
  },
];

export const mockCountries: CountryData[] = [
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    leader: 'To Lam',
    metrics: getRealMetrics('Vietnam'),
    events: mockEvents.filter((e) => e.countryCode === 'VN'),
    topExport: 'Electronics & Textiles',
    lat: 14.0583,
    lng: 108.2772,
    analysis: analysisData['VN'],
  },
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    leader: 'Paetongtarn Shinawatra',
    metrics: getRealMetrics('Thailand'),
    events: mockEvents.filter((e) => e.countryCode === 'TH'),
    topExport: 'Automotive Parts',
    lat: 15.8700,
    lng: 100.9925,
    analysis: analysisData['TH'],
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    leader: 'Prabowo Subianto',
    metrics: getRealMetrics('Indonesia'),
    events: mockEvents.filter((e) => e.countryCode === 'ID'),
    topExport: 'Coal & Palm Oil',
    lat: -0.7893,
    lng: 113.9213,
    analysis: analysisData['ID'],
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    leader: 'Anwar Ibrahim',
    metrics: getRealMetrics('Malaysia'),
    events: mockEvents.filter((e) => e.countryCode === 'MY'),
    topExport: 'Semiconductors',
    lat: 4.2105,
    lng: 101.9758,
    analysis: analysisData['MY'],
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    leader: 'Bongbong Marcos',
    metrics: getRealMetrics('Philippines'),
    events: mockEvents.filter((e) => e.countryCode === 'PH'),
    topExport: 'Electronics',
    lat: 12.8797,
    lng: 121.7740,
    analysis: analysisData['PH'],
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    leader: 'Lawrence Wong',
    metrics: getRealMetrics('Singapore'),
    events: mockEvents.filter((e) => e.countryCode === 'SG'),
    topExport: 'Refined Petroleum',
    lat: 1.3521,
    lng: 103.8198,
    analysis: analysisData['SG'],
  },
  {
    code: 'BN',
    name: 'Brunei',
    flag: '🇧🇳',
    leader: 'Hassanal Bolkiah',
    metrics: getRealMetrics('Brunei'),
    events: [],
    topExport: 'Crude Petroleum',
    lat: 4.5353,
    lng: 114.7277,
    analysis: analysisData['BN'],
  },
  {
    code: 'KH',
    name: 'Cambodia',
    flag: '🇰🇭',
    leader: 'Hun Manet',
    metrics: getRealMetrics('Cambodia'),
    events: [],
    topExport: 'Textiles',
    lat: 12.5657,
    lng: 104.9910,
    analysis: analysisData['KH'],
  },
  {
    code: 'LA',
    name: 'Laos',
    flag: '🇱🇦',
    leader: 'Thongloun Sisoulith',
    metrics: getRealMetrics('Laos'),
    events: [],
    topExport: 'Electricity',
    lat: 19.8563,
    lng: 102.4955,
    analysis: analysisData['LA'],
  },
  {
    code: 'MM',
    name: 'Myanmar',
    flag: '🇲🇲',
    leader: 'Min Aung Hlaing',
    metrics: getRealMetrics('Myanmar'),
    events: [],
    topExport: 'Natural Gas',
    lat: 21.9162,
    lng: 95.9560,
    analysis: analysisData['MM'],
  },
];

export const generateCountry = (code: string, name: string, lat: number, lng: number): CountryData => {
  // Check if we already have a predefined one
  const existing = mockCountries.find(c => c.code === code);
  if (existing) return existing;

  // Otherwise generate random (fallback)
  return {
    code,
    name,
    flag: '🏳️', // Generic flag
    leader: 'Head of State',
    metrics: [],
    events: [],
    topExport: 'General Goods',
    lat,
    lng,
  };
};

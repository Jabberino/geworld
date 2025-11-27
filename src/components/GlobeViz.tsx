'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useStore } from '../store/useStore';
import { CountryData } from '../types/index';
import { generateCountry, mockCountries } from '../data/mockData';

interface GlobeVizProps {
  onCountryClick?: (country: CountryData) => void;
}

const GlobeViz = ({ onCountryClick }: GlobeVizProps) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const { countries, selectedCountry, setSelectedCountry, setCountries, currentDate, events } = useStore();

  const [polygonData, setPolygonData] = useState([]);

  const activeEvents = useMemo(() => {
    const current = new Date(currentDate).getTime();
    const window = 7 * 24 * 60 * 60 * 1000; // 7 days

    const filteredEvents = events.filter(e => {
      const eventDate = new Date(e.date).getTime();
      return Math.abs(current - eventDate) < window;
    });

    // Aggressive offsets for Leader Lines (Exploded View)
    // REMOVED: User requested bubbles to be on the country itself.

    // Group by country
    const clusters: { [key: string]: any } = {};

    filteredEvents.forEach(e => {
      if (!clusters[e.countryCode]) {
        const country = countries.find(c => c.code === e.countryCode);
        if (country) {
          // No offset, place directly on country
          clusters[e.countryCode] = {
            countryCode: e.countryCode,
            originLat: country.lat,
            originLng: country.lng,
            labelLat: country.lat, // Same as origin
            labelLng: country.lng, // Same as origin
            events: []
          };
        }
      }
      if (clusters[e.countryCode]) {
        clusters[e.countryCode].events.push(e);
      }
    });

    return Object.values(clusters);
  }, [currentDate, events, countries]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setPolygonData(data.features);

        // Initialize all countries from GeoJSON
        const featureCodes = new Set<string>();

        const allCountries = data.features.map((f: any) => {
          const code = f.properties.ISO_A2;
          featureCodes.add(code);
          const name = f.properties.NAME || f.properties.ADMIN;
          // Use label coordinates if available, otherwise default to 0,0 (will be updated by globe if needed)
          // Actually, for mock data purposes, we can try to use LABEL_Y/X if present, or just random
          const lat = f.properties.LABEL_Y || 0;
          const lng = f.properties.LABEL_X || 0;

          return generateCountry(code, name, lat, lng);
        });

        // Add mock countries that weren't in GeoJSON (e.g. Singapore, Brunei)
        mockCountries.forEach(mc => {
          if (!featureCodes.has(mc.code)) {
            allCountries.push(mc);
          }
        });

        setCountries(allCountries);
      });
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      // Disable auto-rotation
      globeEl.current.controls().autoRotate = false;

      // Focus on ASEAN region
      globeEl.current.pointOfView({
        lat: 13,
        lng: 105,
        altitude: 1.8,
      });

      // Restrict controls to keep focus strictly on ASEAN
      // Polar Angle (Vertical): 0 = Top, PI = Bottom. 
      // ASEAN is roughly equator. PI/2 is equator.
      // Relaxed limits to allow seeing more context
      globeEl.current.controls().minPolarAngle = Math.PI / 4; // ~45 degrees (North)
      globeEl.current.controls().maxPolarAngle = Math.PI / 1.5; // ~120 degrees (South)

      // Azimuth Angle (Horizontal):
      // It seems East might be Positive in this coordinate system.
      // ASEAN (105E) is approx 1.83 radians.
      // Let's try a positive range covering East Africa to Pacific.
      // 0.5 rad = ~28E
      // 3.0 rad = ~171E
      globeEl.current.controls().minAzimuthAngle = 0.5;
      globeEl.current.controls().maxAzimuthAngle = 3.0;

      // Zoom limits
      globeEl.current.controls().minDistance = 100; // Close up
      globeEl.current.controls().maxDistance = 300; // Don't go too far

      // Damping for that "bouncy" feel
      globeEl.current.controls().enableDamping = true;
      globeEl.current.controls().dampingFactor = 0.05;
    }
  }, []);

  useEffect(() => {
    if (selectedCountry && globeEl.current) {
      globeEl.current.controls().autoRotate = false;
      globeEl.current.pointOfView({
        lat: selectedCountry.lat,
        lng: selectedCountry.lng,
        altitude: 1.5,
      }, 600);
    }
  }, [selectedCountry]);

  const ASEAN_CODES = ['VN', 'TH', 'ID', 'MY', 'PH', 'SG', 'BN', 'KH', 'LA', 'MM'];

  const getCountryColor = (d: any) => {
    const countryCode = d.properties.ISO_A2;

    // Fog of War: Black out non-ASEAN
    if (!ASEAN_CODES.includes(countryCode)) {
      return '#020617'; // Very dark slate/black (slate-950)
    }

    const country = countries.find((c) => c.code === countryCode);

    if (country) {
      // Uniform Blue for all ASEAN members to avoid confusion
      // We can add a subtle opacity or brightness difference later if needed
      return '#3b82f6'; 
    }
    return '#1e293b'; // Default dark slate for ASEAN members without data (shouldn't happen with full mock)
  };

  const clickLock = useRef(false);

  // ... (rest of component)

  return (
    <div className="cursor-move globe-container">
      <style jsx global>{`
        .globe-container canvas {
          pointer-events: auto !important;
        }
        .globe-container .scene-tooltip,
        .globe-container .scene-nav-info,
        .globe-container [class*="label"],
        .globe-container [class*="text"] {
          pointer-events: none !important;
        }
      `}</style>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        lineHoverPrecision={0}
        onGlobeClick={() => {
          // Only deselect if we haven't just clicked a polygon
          if (clickLock.current) {
            clickLock.current = false;
            return;
          }
          setSelectedCountry(null);
          if (onCountryClick) onCountryClick(null as any); // Clear selection
        }}
        onPolygonHover={(d: any) => {
          if (!d) {
            document.body.style.cursor = 'move';
            return;
          }
          const code = d.properties.ISO_A2;
          if (ASEAN_CODES.includes(code)) {
            document.body.style.cursor = 'pointer';
          } else {
            document.body.style.cursor = 'move';
          }
        }}
        polygonsData={polygonData}
        polygonAltitude={(d: any) => d === selectedCountry ? 0.02 : 0.005} // Pop up selected
        polygonCapColor={(d: any) => {
          const countryCode = d.properties.ISO_A2;
          if (!ASEAN_CODES.includes(countryCode)) return '#020617';

          const country = countries.find((c) => c.code === countryCode);
          if (selectedCountry && selectedCountry.code === countryCode) {
            return '#f59e0b'; // Amber-500 (Gold/Orange) for distinct selection
          }

          if (country) {
            return '#3b82f6';
          }
          return '#1e293b';
        }}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => '#111'}
        onPolygonClick={(d: any) => {
          const code = d.properties.ISO_A2;

          // Disable click for non-ASEAN
          if (!ASEAN_CODES.includes(code)) return;

          const country = countries.find(c => c.code === code);
          if (country) {
            clickLock.current = true; // Lock to prevent globe click deselect
            setSelectedCountry(country);
            if (onCountryClick) onCountryClick(country);
          }
        }}
        labelsData={countries.filter(c => ASEAN_CODES.includes(c.code))}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.name}
        labelSize={(d: any) => d === selectedCountry ? 1.2 : 0.8} // Reduced size
        labelDotRadius={0}
        labelColor={(d: any) => d === selectedCountry ? '#f59e0b' : 'rgba(255,255,255,0.75)'} // Amber for selected
        labelResolution={3} // Higher resolution for sharper text
        labelAltitude={0.01}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.15}

        // HTML Elements (Event Popups)
        htmlElementsData={activeEvents}
        htmlLat={(d: any) => d.labelLat}
        htmlLng={(d: any) => d.labelLng}
        htmlAltitude={0.02} // Surface level to anchor accurately
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          const isSelected = selectedCountry && selectedCountry.code === d.countryCode;
          const activeCount = d.events.length;
          const events = d.events; // Only active events

          // Make it interactive if it has a valid country
          const isInteractive = d.countryCode && d.countryCode !== 'GLOBAL';

          // Base positioning classes
          el.className = `transform -translate-y-1/2 -translate-x-1/2 ${isInteractive ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}`;

          const flagUrl = d.countryCode && d.countryCode !== 'GLOBAL'
            ? `https://flagcdn.com/w40/${d.countryCode.toLowerCase()}.png`
            : null;

          if (isSelected) {
            // EXPANDED STATE (Simple Card for Active Events)
            // Just show the top active event + count if more
            const primaryEvent = events[0];
            
            const descriptionHtml = `<div class="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200/50 font-normal">${primaryEvent.description}</div>`;
            
            const stackBadge = activeCount > 1 
              ? `<div class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">+${activeCount - 1}</div>`
              : '';

            el.innerHTML = `
                  <div class="relative bg-white/95 backdrop-blur-md text-slate-900 px-4 py-3 rounded-xl shadow-2xl border border-amber-500 ring-4 ring-amber-500/20 flex flex-col items-start min-w-[200px] max-w-[240px] animate-in fade-in zoom-in duration-200 origin-bottom">
                      ${stackBadge}
                      <div class="flex items-center justify-between w-full mb-1.5">
                          <div class="flex items-center">
                            ${flagUrl ? `<img src="${flagUrl}" alt="${d.countryCode}" class="w-4 h-auto mr-1.5 rounded-sm shadow-sm opacity-80" />` : ''}
                            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${d.countryCode}</span>
                          </div>
                          <div class="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">${primaryEvent.date}</div>
                      </div>
                      <div class="text-sm font-bold leading-tight text-slate-800 mb-0.5">${primaryEvent.headline}</div>
                      ${descriptionHtml}
                      
                      <!-- Pointer Arrow -->
                      <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4 bg-white border-r border-b border-amber-500"></div>
                  </div>
              `;
              // Adjust z-index for selected
              el.style.zIndex = "1000";
          } else {
            // COLLAPSED STATE (Bubble)
            const countBadge = activeCount > 1
                ? `<span class="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white font-bold ring-1 ring-white">${activeCount}</span>`
                : '';
            
            el.innerHTML = `
                <div class="group relative flex items-center justify-center transition-transform duration-200 hover:scale-110">
                    <div class="relative flex items-center justify-center h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-lg border-2 border-blue-500 hover:border-amber-400 transition-colors">
                        ${flagUrl ? `<img src="${flagUrl}" class="h-4 w-auto rounded-[1px] opacity-90 grayscale group-hover:grayscale-0 transition-all" />` : '<div class="h-2 w-2 rounded-full bg-blue-500"></div>'}
                    </div>
                    ${countBadge}
                    <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        <div class="bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded shadow-lg backdrop-blur-sm mt-1">
                            ${d.events[0].headline}
                        </div>
                    </div>
                </div>
            `;
            el.style.zIndex = "10";
          }

          if (isInteractive) {
            el.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent globe click
              const country = countries.find(c => c.code === d.countryCode);
              if (country) {
                setSelectedCountry(country);
                if (onCountryClick) onCountryClick(country);
              }
            });
          }

          return el;
        }}
      />
    </div>
  );
};

export default GlobeViz;

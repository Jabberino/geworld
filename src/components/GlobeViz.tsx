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
    const window = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    return events.filter(e => {
      const eventDate = new Date(e.date).getTime();
      return Math.abs(current - eventDate) < window;
    }).map(e => {
      const country = countries.find(c => c.code === e.countryCode);
      return {
        ...e,
        lat: country ? country.lat : 0,
        lng: country ? country.lng : 0,
        // If no country found (e.g. GLOBAL), maybe put it somewhere specific or filter it out?
        // For now, let's keep it at 0,0 if not found, or maybe filter out if lat/lng is missing.
      };
    }).filter(e => e.lat !== 0 || e.lng !== 0); // Filter out events without location (like GLOBAL if not mapped)
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
      // Simple color logic based on sensitivity for now
      // High sensitivity = Red, Low = Blue
      return country.trumpSensitivityScore > 7 ? '#ef4444' : '#3b82f6';
    }
    return '#1e293b'; // Default dark slate for ASEAN members without data (shouldn't happen with full mock)
  };

  const clickLock = useRef(false);

  // ... (rest of component)

  return (
    <div className="cursor-move">
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
        onLabelClick={(d: any) => {
          const code = d.code;
          if (!ASEAN_CODES.includes(code)) return;
          const country = countries.find(c => c.code === code);
          if (country) {
            clickLock.current = true; // Lock to prevent globe click deselect
            setSelectedCountry(country);
            if (onCountryClick) onCountryClick(country);
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
            return country.trumpSensitivityScore > 7 ? '#ef4444' : '#3b82f6';
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
        labelSize={(d: any) => d === selectedCountry ? 2.0 : 1.0} // Smaller default, larger selected
        labelDotRadius={0} // Remove dot completely
        labelColor={(d: any) => d === selectedCountry ? '#f59e0b' : 'rgba(255,255,255,0.75)'} // Amber text when selected
        labelResolution={2}
        labelAltitude={0.01}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.15}

        // HTML Elements (Event Popups)
        htmlElementsData={activeEvents}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlAltitude={0.1}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          const isSelected = selectedCountry && selectedCountry.code === d.countryCode;

          // Make it interactive if it has a valid country
          const isInteractive = d.countryCode && d.countryCode !== 'GLOBAL';

          el.className = `transform -translate-y-full -translate-x-1/2 ${isInteractive ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}`;

          const flagUrl = d.countryCode && d.countryCode !== 'GLOBAL'
            ? `https://flagcdn.com/w40/${d.countryCode.toLowerCase()}.png`
            : null;

          const flagHtml = flagUrl
            ? `<img src="${flagUrl}" alt="${d.countryCode}" class="w-5 h-auto mr-2 rounded-sm shadow-sm" />`
            : '';

          // Expanded content
          const descriptionHtml = isSelected
            ? `<div class="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200/50 font-normal">${d.description}</div>`
            : '';

          el.innerHTML = `
                <div class="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-2 rounded-lg shadow-xl border ${isSelected ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-blue-500/30'} flex flex-col items-center min-w-[150px] max-w-[200px] transition-all duration-300">
                    <div class="flex items-center justify-center mb-1 w-full">
                        ${flagHtml}
                        <div class="text-xs font-bold uppercase tracking-wider text-blue-600">${d.date}</div>
                    </div>
                    <div class="text-sm font-semibold text-center leading-tight">${d.headline}</div>
                    ${descriptionHtml}
                    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white/90"></div>
                </div>
            `;

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

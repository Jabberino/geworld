'use client';

import React from 'react';
import { mockTimelineEvents, mockCountryMetrics } from '@/mockData';

// Dynamically import the Globe component to avoid SSR issues
import dynamic from 'next/dynamic';
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });


const World: React.FC = () => {
  // TODO: Replace mock data with props
  const timelineEvents = mockTimelineEvents;
  const countryMetrics = mockCountryMetrics;

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      // Add other globe props here based on specs.txt
    />
  );
};

export default World;

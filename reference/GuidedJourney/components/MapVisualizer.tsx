import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { RouteStop } from '../types';
import { MapPin, Navigation } from 'lucide-react';

interface MapVisualizerProps {
  stops: RouteStop[];
  currentStepIndex: number;
}

const MapVisualizer: React.FC<MapVisualizerProps> = ({ stops, currentStepIndex }) => {
  const width = 800;
  const height = 600;
  const padding = 60;

  // Calculate scales based on coordinates
  const { xScale, yScale } = useMemo(() => {
    if (stops.length === 0) return { xScale: () => 0, yScale: () => 0 };

    const lats = stops.map(s => s.coordinates.lat);
    const lngs = stops.map(s => s.coordinates.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Simple linear projection (Equirectangular approximation is fine for this scale/purpose)
    // We invert Y because SVG y=0 is top
    const xScale = d3.scaleLinear()
      .domain([minLng, maxLng])
      .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
      .domain([minLat, maxLat])
      .range([height - padding, padding]); // Inverted

    return { xScale, yScale };
  }, [stops]);

  // Generate path data
  const pathData = useMemo(() => {
    if (stops.length < 2) return "";
    const lineGenerator = d3.line<RouteStop>()
      .x(d => xScale(d.coordinates.lng))
      .y(d => yScale(d.coordinates.lat))
      .curve(d3.curveCatmullRom.alpha(0.5)); // Smooth curve
    
    return lineGenerator(stops) || "";
  }, [stops, xScale, yScale]);

  // Generate visited path (subset)
  const visitedPathData = useMemo(() => {
    if (currentStepIndex === 0 || stops.length < 2) return "";
    
    // We want to draw the line up to the current node
    const visitedStops = stops.slice(0, currentStepIndex + 1);
    
    const lineGenerator = d3.line<RouteStop>()
      .x(d => xScale(d.coordinates.lng))
      .y(d => yScale(d.coordinates.lat))
      .curve(d3.curveCatmullRom.alpha(0.5));

    return lineGenerator(visitedStops) || "";
  }, [stops, currentStepIndex, xScale, yScale]);

  return (
    <div className="relative w-full h-full bg-[#e8e4d9] rounded-xl overflow-hidden shadow-inner border-4 border-[#d4cebd]">
      {/* Old Paper Texture Overlay Effect (CSS) */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
      
      {/* Compass Decor */}
      <div className="absolute top-4 right-4 opacity-30 text-stone-800">
        <Navigation size={64} />
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full preserve-3d">
        {/* Definition for gradients/filters */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Full Route (Background Line) */}
        <path
          d={pathData}
          fill="none"
          stroke="#bcaaa4"
          strokeWidth="4"
          strokeDasharray="8,4"
          strokeLinecap="round"
        />

        {/* Visited Route (Solid Line) */}
        <path
          d={visitedPathData}
          fill="none"
          stroke="#795548"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Stops */}
        {stops.map((stop, index) => {
          const x = xScale(stop.coordinates.lng);
          const y = yScale(stop.coordinates.lat);
          const isVisited = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <g key={stop.id} transform={`translate(${x}, ${y})`}>
              {/* Location Name Label */}
              <text
                y={-20}
                textAnchor="middle"
                className={`text-[12px] font-bold uppercase tracking-wider fill-stone-800 ${isCurrent ? 'text-lg fill-stone-900' : 'opacity-60'}`}
                style={{ fontFamily: 'Cinzel, serif', textShadow: '0px 1px 2px rgba(255,255,255,0.8)' }}
              >
                {stop.name}
              </text>

              {/* Node Circle */}
              <circle
                r={isCurrent ? 12 : 8}
                fill={isVisited ? (isCurrent ? "#d84315" : "#5d4037") : "#d7ccc8"}
                stroke="#fff"
                strokeWidth="2"
                className={`transition-all duration-500 ${isCurrent ? 'animate-pulse' : ''}`}
                filter={isCurrent ? "url(#glow)" : ""}
              />
              
              {/* Pin Icon for Current */}
              {isCurrent && (
                <foreignObject x="-12" y="-34" width="24" height="24">
                  <div className="flex justify-center items-center text-red-700">
                     <MapPin size={24} fill="currentColor" className="drop-shadow-md"/>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Map Legend / Context */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-stone-200">
         <p className="text-xs text-stone-600 font-serif italic">
           Map projection is approximate for historical reference.
         </p>
      </div>
    </div>
  );
};

export default MapVisualizer;
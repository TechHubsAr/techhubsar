'use client';

import type React from 'react';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { useIsMobile } from '@/hooks/useIsMobile';

import { cn } from '@/lib/utils';
import type { Community } from '@/types/community';

const geoUrl = '/argentina-provinces.json';

interface ArgentinaMapProps {
  communities: Community[];
  onHoverCommunity: (communityId: string | null) => void;
}

interface TooltipPosition {
  x: number;
  y: number;
}

export default function ArgentinaMap({
  communities,
  onHoverCommunity,
}: ArgentinaMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const [tooltipContent, setTooltipContent] = useState<{
    name: string;
    location: string;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMarkerClick = useCallback(
    (communityId: string) => {
      router.push(`/community/${communityId}`);
    },
    [router]
  );

  const handleMarkerMouseEnter = useCallback(
    (event: React.MouseEvent<SVGCircleElement>, community: Community) => {
      const marker = event.currentTarget;
      const mapContainer = mapRef.current;

      if (marker && mapContainer) {
        const markerRect = marker.getBoundingClientRect();
        const mapRect = mapContainer.getBoundingClientRect();

        setTooltipPosition({
          x: markerRect.left - mapRect.left + markerRect.width / 2,
          y: markerRect.top - mapRect.top
        });

        setTooltipContent({
          name: community.name,
          location: community.province
        });

        if (!isMobile) {
          onHoverCommunity(community.slug);
        }
      }
    },
    [onHoverCommunity, isMobile]
  );

  const handleMarkerMouseLeave = useCallback(() => {
    setTooltipContent(null);
    if (!isMobile) {
      onHoverCommunity(null);
    }
  }, [onHoverCommunity, isMobile]);

  return (
    <div ref={mapRef} className='relative w-full h-full flex items-center justify-center bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 p-4'>
      <ComposableMap
        projection='geoMercator'
        projectionConfig={{
          scale: isMobile ? 400 : 600,
          center: [-65, -40] // Adjusted center coordinates
        }}
        width={isMobile ? 400 : 800}
        height={isMobile ? 300 : 600}
        className='w-full h-full'
      >
        <ZoomableGroup
          center={[-65, -40]} // Match projectionConfig center
          zoom={1}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill='hsl(var(--muted)/0.3)'
                  stroke='hsl(var(--border))'
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: 'hsl(var(--muted)/0.5)',
                      transition: 'all 250ms'
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {communities.map((community) => (
            <Marker
              key={community.slug}
              coordinates={[community.location.lng, community.location.lat]}
            >
              <circle
                r={isMobile ? 3 : 4}
                fill='hsl(var(--primary))'
                stroke='hsl(var(--background))'
                strokeWidth={1.5}
                style={{
                  cursor: 'pointer',
                  transition: 'all 200ms ease-out'
                }}
                onClick={() => handleMarkerClick(community.slug)}
                onMouseEnter={(e) => handleMarkerMouseEnter(e, community)}
                onMouseLeave={handleMarkerMouseLeave}
                className='hover:r-[6] hover:fill-accent'
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut'
            }}
            className={cn(
              'pointer-events-none absolute z-50',
              'max-w-[200px] min-w-[120px]',
              'bg-popover/90 backdrop-blur-sm',
              'border border-border/50',
              'rounded-lg shadow-xl',
              'p-3 px-4',
              'transform-gpu'
            )}
            style={{
              position: 'absolute',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className='flex flex-col gap-1'>
              <p className='font-medium text-sm text-foreground/90'>
                {tooltipContent.name}
              </p>
              <p className='text-xs text-muted-foreground flex items-center gap-1'>
                <span className='size-1.5 rounded-full bg-primary/80' />
                {tooltipContent.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

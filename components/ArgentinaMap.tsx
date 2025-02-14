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
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
  });
  const isMobile = useIsMobile();

  const handleMarkerClick = useCallback(
    (communityId: string) => {
      router.push(`/community/${communityId}`);
    },
    [router],
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
          y: markerRect.top - mapRect.top,
        });

        setTooltipContent({
          name: community.name,
          location: community.province,
        });

        onHoverCommunity(community.slug);
      }
    },
    [onHoverCommunity],
  );

  const handleMarkerMouseLeave = useCallback(() => {
    setTooltipContent(null);
    onHoverCommunity(null);
  }, [onHoverCommunity]);

  return (
    <div
      ref={mapRef}
      className={cn(
        'relative w-full h-full flex items-center justify-center',
        'dark:bg-card/30 bg-white/80',
        'rounded-xl',
        'dark:border-border/50 border-border/80',
        'p-4',
        'dark:shadow-none shadow-sm'
      )}
    >
      <ComposableMap
        projection='geoMercator'
        projectionConfig={{
          scale: isMobile ? 400 : 600,
          center: [-65, -40],
        }}
        width={isMobile ? 400 : 800}
        height={isMobile ? 300 : 600}
        className='w-full h-full'
      >
        <ZoomableGroup
          center={[-65, -40]}
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
                  className={cn(
                    'dark:fill-muted/20',
                    'fill-muted/60',
                    'dark:stroke-border',
                    'stroke-border',
                    'transition-colors duration-200'
                  )}
                  strokeWidth={0.8}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: 'hsl(var(--muted)/0.8)',
                      transition: 'all 250ms',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {communities
            .filter((community) => community.location)
            .map((community, index) => (
              <Marker
                key={community.slug}
                coordinates={[community.location.lng, community.location.lat]}
              >
                <motion.circle
                  r={isMobile ? 3 : 4}
                  className={cn(
                    'dark:fill-primary fill-primary',
                    'dark:stroke-background/80 stroke-white',
                    'hover:fill-accent dark:hover:fill-accent',
                    'cursor-pointer'
                  )}
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1
                  }}
                  onClick={() => handleMarkerClick(community.slug)}
                  onMouseEnter={(e) => handleMarkerMouseEnter(e, community)}
                  onMouseLeave={handleMarkerMouseLeave}
                />
              </Marker>
            ))
          }
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
              ease: 'easeOut',
            }}
            className={cn(
              'pointer-events-none absolute z-50',
              'max-w-[200px] min-w-[120px]',
              'dark:bg-popover/90 bg-popover/95',
              'dark:border-border/50 border-border/60',
              'rounded-lg',
              'dark:shadow-xl shadow-md',
              'p-3 px-4',
              'transform-gpu'
            )}
            style={{
              position: 'absolute',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className='flex flex-col gap-1'>
              <p className={cn(
                'font-medium text-sm',
                'dark:text-foreground/90 text-foreground',
                'tracking-tight'
              )}>
                {tooltipContent.name}
              </p>
              <p className={cn(
                'text-xs flex items-center gap-1',
                'dark:text-muted-foreground text-muted-foreground/80'
              )}>
                <span className={cn(
                  'size-1.5 rounded-full',
                  'dark:bg-primary/80 bg-primary/90'
                )} />
                {tooltipContent.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

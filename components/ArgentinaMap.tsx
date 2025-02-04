"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import type { Community } from "../types/community";
import { useIsMobile } from "../hooks/useIsMobile";
import type React from "react";

const geoUrl = "/argentina-provinces.json";

interface ArgentinaMapProps {
  communities: Community[];
  onHoverCommunity: (communityId: string | null) => void;
}

export default function ArgentinaMap({
  communities,
  onHoverCommunity,
}: ArgentinaMapProps) {
  const router = useRouter();
  const [tooltipContent, setTooltipContent] = useState<{
    name: string;
    location: string;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMarkerClick = useCallback(
    (communityId: string) => {
      router.push(`/community/${communityId}`);
    },
    [router]
  );

  const handleMarkerMouseEnter = useCallback(
    (event: React.MouseEvent, community: Community) => {
      setTooltipContent({ name: community.name, location: community.province });
      setTooltipPosition({ x: event.clientX, y: event.clientY });
      if (!isMobile) {
        onHoverCommunity(community.id);
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

    <div className="w-full h-full max-w-full max-h-full lg:h-[600px] bg-card rounded-lg shadow-lg p-4 relative overflow-hidden">

      <ComposableMap
        projection='geoMercator'
        projectionConfig={{
          scale: isMobile ? 400 : 600,
        }}
        width={isMobile ? 400 : 800}
        height={isMobile ? 300 : 600}
      >
        <ZoomableGroup
          center={[-65, -38]}
          zoom={isMobile ? 2 : 3}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill='hsl(var(--muted))'
                  stroke='#000'
                  style={{
                    default: { outline: "none" },
                    // hover: { outline: "none", fill: "hsl(var(--accent))" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {communities.map((community) => (
            <Marker
              key={community.id}
              coordinates={[community.location.lng, community.location.lat]}
            >
              <circle
                r={isMobile ? 2 : 3}
                fill='hsl(var(--accent))'
                stroke='hsl(var(--background))'
                strokeWidth={1}
                style={{ cursor: "pointer" }}
                onClick={() => handleMarkerClick(community.id)}
                onMouseEnter={(e) => handleMarkerMouseEnter(e, community)}
                onMouseLeave={handleMarkerMouseLeave}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      {tooltipContent && (
        <div
          className='absolute bg-popover text-popover-foreground p-2 rounded shadow-md z-10'
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            // transform: "translate(-50%, -100%)",
          }}
        >
          <p className='font-semibold'>{tooltipContent.name}</p>
          <p className='text-sm'>{tooltipContent.location}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import type { Community } from "../types/community";
import { useIsMobile } from "../hooks/useIsMobile";
import type React from "react";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

interface ArgentinaMapProps {
  communities: Community[];
  onHoverCommunity: (communityId: string | null) => void;
}

export default function ArgentinaMap({
  communities,
  onHoverCommunity,
}: ArgentinaMapProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleMarkerClick = useCallback(
    (communityId: string) => {
      router.push(`/community/${communityId}`);
    },
    [router]
  );

  const handleMarkerMouseEnter = useCallback(
    (community: Community) => {
      if (!isMobile) {
        onHoverCommunity(community.id);
      }
    },
    [onHoverCommunity, isMobile]
  );

  const handleMarkerMouseLeave = useCallback(() => {
    if (!isMobile) {
      onHoverCommunity(null);
    }
  }, [onHoverCommunity, isMobile]);

  return (
    <div className="w-full h-full max-w-full max-h-full lg:h-[600px] bg-card rounded-lg shadow-lg p-4 relative overflow-hidden">
      <MapContainer
        center={[-38, -65] as LatLngExpression}
        zoom={isMobile ? 3 : 4}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        zoomControl={!isMobile}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        minZoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
          bounds={[
            [-90, -180],
            [90, 180],
          ]}
        />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          iconCreateFunction={(cluster: L.MarkerCluster) => {
            const count = cluster.getChildCount();
            return new L.DivIcon({
              html: `<div class="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">${count}</div>`,
              className: "custom-marker-cluster",
              iconSize: L.point(32, 32),
            });
          }}
        >
          {communities.map((community) => (
            <CircleMarker
              key={community.id}
              center={[community.location.lat, community.location.lng]}
              radius={isMobile ? 4 : 6}
              pathOptions={{
                fillColor: "hsl(var(--accent))",
                fillOpacity: 1,
                color: "hsl(var(--background))",
                weight: 1,
              }}
              eventHandlers={{
                mouseover: () => handleMarkerMouseEnter(community),
                mouseout: handleMarkerMouseLeave,
              }}
            >
              <Popup>
                <div
                  className="font-semibold cursor-pointer hover:text-accent"
                  onClick={() => handleMarkerClick(community.id)}
                >
                  {community.name}
                </div>
                <div className="text-sm">{community.province}</div>
              </Popup>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

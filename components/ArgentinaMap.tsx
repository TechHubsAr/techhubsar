'use client';

import React, { useCallback, useRef, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { Community } from '@/types/community';

const geoUrl = '/argentina-provinces.json';

type TooltipContent =
  | { type: 'single'; community: Community }
  | { type: 'cluster'; communities: Community[] };

interface TooltipPosition {
  x: number;
  y: number;
}

interface ArgentinaMapProps {
  communities: Community[];
  onHoverCommunity: (communityId: string | null) => void;
}

const formatCommunityName = (name: string) => {
  return name
    .replace(/[^\w\s]/g, '') // Elimina caracteres no alfanuméricos ni espacios
    .replace(/\s+/g, '-') // Reemplaza los espacios por guiones
    .toLowerCase(); // Convierte todo a minúsculas (opcional)
};

export default function ArgentinaMap({ communities, onHoverCommunity }: ArgentinaMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  // Dimensiones según dispositivo
  const width = isMobile ? 400 : 800;
  const height = isMobile ? 300 : 600;

  // Proyección para convertir coordenadas geográficas a píxeles
  const projection = useMemo(
    () =>
      geoMercator()
        .scale(isMobile ? 400 : 600)
        .center([-65, -40])
        .translate([width / 2, height / 2]),
    [isMobile, width, height]
  );

  // Clusterizamos las comunidades cercanas (en píxeles)
  const clusters = useMemo(() => {
    const clusterThreshold = 20; // Ajusta este valor según necesites
    const clusters: { x: number; y: number; communities: Community[] }[] = [];

    communities.forEach((community) => {
      if (!community.location) return;
      const coords = projection([community.location.lng, community.location.lat]);
      if (!coords) return;
      let added = false;
      for (let cluster of clusters) {
        const dx = coords[0] - cluster.x;
        const dy = coords[1] - cluster.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < clusterThreshold) {
          cluster.communities.push(community);
          // Recalcula el centro (promedio)
          cluster.x = (cluster.x * (cluster.communities.length - 1) + coords[0]) / cluster.communities.length;
          cluster.y = (cluster.y * (cluster.communities.length - 1) + coords[1]) / cluster.communities.length;
          added = true;
          break;
        }
      }
      if (!added) {
        clusters.push({ x: coords[0], y: coords[1], communities: [community] });
      }
    });
    return clusters;
  }, [communities, projection]);

  // Muestra el tooltip en la posición del marcador (únicamente con clic/tap)
  const handleMarkerClick = useCallback(
    (event: React.MouseEvent<SVGElement>, content: TooltipContent) => {
      // Evitamos que el clic se propague al contenedor del mapa
      event.stopPropagation();
      const marker = event.currentTarget;
      const mapContainer = mapRef.current;
      if (marker && mapContainer) {
        const markerRect = marker.getBoundingClientRect();
        const mapRect = mapContainer.getBoundingClientRect();
        setTooltipPosition({
          x: markerRect.left - mapRect.left + markerRect.width / 2,
          y: markerRect.top - mapRect.top,
        });
        setTooltipContent(content);
        if (content.type === 'single') {
          onHoverCommunity(content.community.slug);
        } else {
          onHoverCommunity(null);
        }
      }
    },
    [onHoverCommunity]
  );

  // Cierra el tooltip
  const closeTooltip = useCallback(() => {
    setTooltipContent(null);
    onHoverCommunity(null);
  }, [onHoverCommunity]);

  // Navega a la comunidad seleccionada y cierra el tooltip
  const navigateToCommunity = useCallback(
    (communityId: string) => {
      closeTooltip();
      router.push(`/community/${communityId}`);
    },
    [closeTooltip, router]
  );

  // Si el usuario toca fuera del tooltip, se cierra
  const handleMapClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (tooltipRef.current && (event.target instanceof Node) && tooltipRef.current.contains(event.target)) {
        return;
      }
      closeTooltip();
    },
    [closeTooltip]
  );

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full flex items-center justify-center p-2 bg-white dark:bg-card/30 rounded-xl border dark:border-border/50 shadow-sm dark:shadow-none"
      onClick={handleMapClick}
      onTouchStart={handleMapClick}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: isMobile ? 400 : 600, center: [-65, -40] }}
        width={width}
        height={height}
        className="w-full h-full"
      >
        <ZoomableGroup center={[-65, -40]} zoom={1} minZoom={1} maxZoom={8}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="fill-muted/60 dark:fill-muted/20 stroke-border dark:stroke-border transition-colors duration-200"
                  strokeWidth={0.8}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: 'hsl(var(--muted)/0.8)', transition: 'all 250ms' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {clusters.map((cluster, index) => {
          // Verificamos que la función invert esté definida
          if (!projection.invert) return null;
          const geoCoords = projection.invert([cluster.x, cluster.y]);
          if (!geoCoords) return null;
          
          if (cluster.communities.length === 1) {
            const community = cluster.communities[0];
            return (
              <Marker
                key={community.slug}
                coordinates={[community.location!.lng, community.location!.lat]}
              >
                <motion.circle
                  r={isMobile ? 4 : 5}
                  className="fill-primary dark:fill-primary stroke-white dark:stroke-background/80 cursor-pointer"
                  strokeWidth={1.5}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.05 }}
                  onClick={(e) => handleMarkerClick(e, { type: 'single', community })}
                />
              </Marker>
            );
          } else {
            return (
              <Marker key={`cluster-${index}`} coordinates={geoCoords}>
                <motion.g
                  className="cursor-pointer"
                  onClick={(e) =>
                    handleMarkerClick(e, { type: 'cluster', communities: cluster.communities })
                  }
                >
                  <motion.circle
                    r={isMobile ? 8 : 10}
                    className="fill-primary dark:fill-primary stroke-white dark:stroke-background/80"
                    strokeWidth={1.5}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.05 }}
                  />
                  <text
                    textAnchor="middle"
                    y={isMobile ? 4 : 5}
                    className="font-bold text-white dark:text-white text-xs pointer-events-none"
                  >
                    {cluster.communities.length}
                  </text>
                </motion.g>
              </Marker>
            );
          }
        })}

        </ZoomableGroup>
      </ComposableMap>

      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 bg-popover/95 dark:bg-popover/90 border border-border/60 dark:border-border/50 rounded-lg shadow-md dark:shadow-xl p-3 px-4 max-w-[250px] min-w-[150px] pointer-events-auto"
            style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px`, transform: 'translate(-50%, -110%)' }}
          >
            <button
              className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
              onClick={closeTooltip}
            >
              <p>x</p>
            </button>
            {tooltipContent.type === 'single' ? (
              <div className="flex flex-col gap-2">
                <p className="font-medium text-sm dark:text-foreground text-foreground">
                  {tooltipContent.community.name}
                </p>
                <p className="text-xs flex items-center gap-1 dark:text-muted-foreground text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary" />
                  {tooltipContent.community.province}
                </p>
                <button
                  onClick={() =>
                    navigateToCommunity(formatCommunityName(tooltipContent.community.name))
                  }
                  className="mt-2 px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                >
                  Seleccionar
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {tooltipContent.communities.map((comm: Community) => (
                  <div
                    key={comm.name}
                    className="cursor-pointer hover:underline p-1 rounded hover:bg-muted/10 transition-colors"
                    onClick={() => navigateToCommunity(formatCommunityName(comm.name))}
                  >
                    <p className="font-medium text-sm dark:text-foreground text-foreground">
                      {comm.name}
                    </p>
                    <p className="text-xs dark:text-muted-foreground text-muted-foreground">
                      {comm.province}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

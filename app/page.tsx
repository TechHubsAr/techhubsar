"use client";

import { useState, useEffect } from "react";
import MapList from "../components/MapList";

import { fetchCommunities } from "../utils/fetchCommunities";
import type { Community } from "@/types/community";

export default function Home() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [hoveredCommunityId, setHoveredCommunityId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadCommunities = async () => {
      const fetchedCommunities = await fetchCommunities();
      setCommunities(fetchedCommunities);
    };
    loadCommunities();
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tech-gradient">
          Tech Communities in Argentina
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover and connect with tech enthusiasts across the country
        </p>
      </div>
      <MapList
        communities={communities}
        hoveredCommunityId={hoveredCommunityId}
        onHoverCommunity={setHoveredCommunityId}
      />
    </div>
  );
}

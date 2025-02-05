"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

import CommunityList from "../components/CommunityList";
import ArgentinaMap from "../components/ArgentinaMap";
import AddCommunityButton from "../components/AddCommunityButton";

import { fetchCommunities } from "../utils/fetchCommunities";
import type { Community } from "../types/community";

export default function Home() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [hoveredCommunityId, setHoveredCommunityId] = useState<string | null>(
    null
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadCommunities = async () => {
      const fetchedCommunities = await fetchCommunities();
      setCommunities(fetchedCommunities);
    };
    loadCommunities();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 tech-gradient">
          Tech Communities in Argentina
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover and connect with tech enthusiasts across the country
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {!isMobile && (
          <div
            className={isMobile ? "w-full" : "lg:w-2/3"}
            style={{ height: 800 }}
          >
            <ArgentinaMap
              communities={communities}
              onHoverCommunity={setHoveredCommunityId}
            />
          </div>
        )}
        <div className={isMobile ? "w-full mt-8" : "lg:w-1/3"}>
          <div className="bg-card rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Communities</h2>
              <AddCommunityButton />
            </div>
            <CommunityList
              communities={communities}
              hoveredCommunityId={hoveredCommunityId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/useIsMobile";
import ArgentinaMap from "./ArgentinaMap";
import CommunityList from "./CommunityList";
import AddCommunityButton from "./AddCommunityButton";
import type { Community } from "@/types/community";

interface MapListProps {
  communities: Community[];
  hoveredCommunityId: string | null;
  onHoverCommunity: (id: string | null) => void;
}

export default function MapList({
  communities,
  hoveredCommunityId,
  onHoverCommunity,
}: MapListProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <AddCommunityButton />
        </div>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="p-6 rounded-lg shadow-lg bg-card">
              <h2 className="mb-6 text-2xl font-semibold">Communities</h2>
              <CommunityList
                communities={communities}
                hoveredCommunityId={hoveredCommunityId}
              />
            </div>
          </TabsContent>
          <TabsContent value="map">
            <div className="w-full" style={{ height: 800 }}>
              <ArgentinaMap
                communities={communities}
                onHoverCommunity={onHoverCommunity}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <AddCommunityButton />
      </div>
      <div className="flex flex-row gap-8">
        <div className="lg:w-2/3" style={{ height: 800 }}>
          <ArgentinaMap
            communities={communities}
            onHoverCommunity={onHoverCommunity}
          />
        </div>
        <div className="lg:w-1/3">
          <div className="p-6 rounded-lg shadow-lg bg-card">
            <h2 className="mb-6 text-2xl font-semibold">Communities</h2>
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

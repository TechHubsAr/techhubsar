"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import type { Community } from "../types/community";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Twitter } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

interface CommunityListProps {
  communities: Community[];
  hoveredCommunityId: string | null;
}

export default function CommunityList({
  communities,
  hoveredCommunityId,
}: CommunityListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    if (
      !isMobile &&
      hoveredCommunityId &&
      itemRefs.current[hoveredCommunityId] &&
      listRef.current
    ) {
      itemRefs.current[hoveredCommunityId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [hoveredCommunityId, isMobile]);

  return (
    <ul
      ref={listRef}
      className='space-y-6 overflow-y-auto max-h-[500px] lg:max-h-[calc(100vh-200px)]'
    >
      {communities.map((community) => (
        <Link
          key={community.id}
          href={`/community/${community.id}`}
          className='block'
        >
          <li
            ref={(el) => {
              if (el) {
                itemRefs.current[community.id] = el;
              }
            }}
            className={`border-b border-border p-4 pb-4 transition-colors rounded-md hover:bg-gray-700 ${
              hoveredCommunityId === community.id
                ? "bg-gray-200 bg-opacity-30"
                : "bg-gray-800"
            }`}
          >
            <h3 className='text-xl font-semibold mb-2'>{community.name}</h3>
            <p
              className={`${
                hoveredCommunityId === community.id
                  ? "text-white"
                  : "text-muted-foreground"
              } mb-2`}
            >
              {community.shortDescription}
            </p>
            <div className='flex items-center justify-between'>
              <Badge variant='secondary'>{community.category}</Badge>
              <div
                className='flex space-x-2'
                onClick={(e) => e.preventDefault()}
              >
                {community.website && (
                  <a
                    href={community.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button variant='ghost' size='icon'>
                      <Globe className='h-4 w-4' />
                    </Button>
                  </a>
                )}
                {community.twitter && (
                  <a
                    href={`https://twitter.com/${community.twitter}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button variant='ghost' size='icon'>
                      <Twitter className='h-4 w-4' />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

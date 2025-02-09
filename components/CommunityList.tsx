'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Globe, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

import type { Community } from '@/types/community';
import XformerlyTwitter from './ui/x-formerly-twitter';

interface CommunityCardProps {
  community: Community;
  isHovered: boolean;
}

interface PaginatedListProps {
  communities: Community[];
  hoveredCommunityId: string | null;
  itemsPerPage?: number;
}

function CommunityInfo({ community }: { community: Community }) {
  return (
    <div className='flex items-center justify-between w-full gap-3'>
      <div className='flex flex-col space-y-2'>
        <h3 className='text-lg font-semibold tracking-tight'>
          {community.name}
        </h3>
        <p className='text-sm text-muted-foreground flex items-center gap-1'>
          <MapPin className='h-3 w-3' />
          {community.province}
        </p>
        <Badge variant='outline' className='w-fit'>
          {community.category}
        </Badge>
      </div>
    </div>
  );
}

function CommunityDescription({ community }: { community: Community }) {
  return (
    <div className='h-full bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-4 flex flex-col justify-between'>
      <p className='text-sm text-muted-foreground leading-relaxed line-clamp-3'>
        {community.shortDescription}
      </p>
      <div className='flex justify-end space-x-2 pt-2'>
        {community.website && (
          <Button
            variant='ghost'
            size='sm'
            className='hover:bg-accent/10'
            onClick={(e) => {
              e.preventDefault();
              window.open(community.website, '_blank', 'noopener,noreferrer');
            }}
          >
            <Globe className='h-4 w-4' />
          </Button>
        )}
        {community.twitter && (
          <Button
            variant='ghost'
            size='sm'
            className='hover:bg-accent/10'
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://x.com/${community.twitter}`, '_blank', 'noopener,noreferrer');
            }}
          >
            <XformerlyTwitter className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );
}

function CommunityCard({ community, isHovered }: CommunityCardProps) {
  const [localHovered, setLocalHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setLocalHovered(true)}
      onMouseLeave={() => setLocalHovered(false)}
      className={cn(
        'group w-full h-[280px] p-5 bg-background/50 backdrop-blur-sm rounded-xl flex flex-col gap-4 cursor-pointer border border-border/50 transition-all duration-300 ease-out hover:bg-accent/5',
        (localHovered || isHovered) && 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background shadow-lg'
      )}
    >
      <motion.div layout className='flex-none'>
        <CommunityInfo community={community} />
      </motion.div>
      <motion.div layout className='flex-1'>
        <CommunityDescription community={community} />
      </motion.div>
    </div>
  );
}

export default function CommunityList({
  communities,
  hoveredCommunityId,
  itemsPerPage = 6,
}: PaginatedListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(communities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCommunities = communities.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className='space-y-8'>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {currentCommunities.map((community) => (
          <motion.li
            key={community.slug}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Link href={`/community/${community.slug}`}>
              <CommunityCard
                community={community}
                isHovered={hoveredCommunityId === community.slug}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {totalPages > 1 && (
        <Pagination className='flex justify-center pt-8'>
          <PaginationContent className='bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-2'>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={cn(
                  'cursor-pointer',
                  currentPage === 1 ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
                )}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={cn(
                  'cursor-pointer',
                  currentPage === totalPages ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

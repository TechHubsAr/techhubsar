'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { Globe, MapPin, ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tabs,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import XformerlyTwitter from '@/components/ui/x-formerly-twitter';

import { fetchCommunities } from '@/utils/fetchCommunities';
import { cn } from '@/lib/utils';
import type { Community } from '@/types/community';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

function CommunityCard({ community }: { community: Community }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover='hover'
      onMouseMove={handleMouseMove}
      className='relative group rounded-xl'
    >
      <motion.div
        className='pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              hsl(var(--primary) / 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <Card className='relative flex flex-col h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <Badge
              variant='outline'
              className='bg-primary/5 hover:bg-primary/10 transition-colors'
            >
              {community.category}
            </Badge>
            <div className='flex items-center gap-1.5'>
              {community.website && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 rounded-lg hover:bg-primary/10 transition-colors'
                  asChild
                >
                  <a
                    href={community.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center'
                  >
                    <Globe className='h-4 w-4 transition-transform group-hover:scale-110' />
                  </a>
                </Button>
              )}
              {community.twitter && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 rounded-lg hover:bg-primary/10 transition-colors'
                  asChild
                >
                  <a
                    href={`https://x.com/${community.twitter}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center'
                  >
                    <XformerlyTwitter className='h-4 w-4 transition-transform group-hover:scale-110' />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className='flex-1 space-y-4'>
          <motion.div
            className='space-y-2'
            layout
          >
            <h2 className='text-xl font-semibold tracking-tight group-hover:text-primary transition-colors'>
              {community.name}
            </h2>
            <p className='text-sm text-muted-foreground flex items-center gap-1.5'>
              <MapPin className='h-3.5 w-3.5' />
              {community.province}
            </p>
          </motion.div>
          <p className='text-sm text-muted-foreground line-clamp-3 group-hover:text-muted-foreground/80 transition-colors'>
            {community.shortDescription}
          </p>
        </CardContent>

        <CardFooter className='mt-auto pt-4'>
          <Link
            href={`/community/${community.slug}`}
            className='inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors'
          >
            <span className='relative'>
              View Details
              <span className='absolute inset-x-0 -bottom-0.5 h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform' />
            </span>
            <ArrowRight className='h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300' />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function CommunitiesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [provinces, setProvinces] = useState<string[]>(['all']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        setIsLoading(true);
        const fetchedCommunities = await fetchCommunities();
        setCommunities(fetchedCommunities);
        setFilteredCommunities(fetchedCommunities);

        // Safely extract and capitalize categories
        const uniqueCategories = Array.from(
          new Set(fetchedCommunities.map((c) => c.category).filter(Boolean))
        );
        setCategories(['all', ...uniqueCategories]);

        // Safely extract and capitalize provinces
        const uniqueProvinces = Array.from(
          new Set(fetchedCommunities.map((c) => c.province).filter(Boolean))
        );
        setProvinces(['all', ...uniqueProvinces]);
      } catch (error) {
        console.error('Failed to load communities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCommunities();
  }, []);

  useEffect(() => {
    let filtered = communities;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }
    if (selectedProvince !== 'all') {
      filtered = filtered.filter((c) => c.province === selectedProvince);
    }
    setFilteredCommunities(filtered);
  }, [selectedCategory, selectedProvince, communities]);

  // Helper function to safely capitalize strings
  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <div className='container mx-auto px-4 py-12 md:py-16'>
        <div className='space-y-12'>
          <div className='relative flex flex-col items-center text-center space-y-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='space-y-4'
            >
              <h1 className='text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                Tech Communities
              </h1>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Discover and connect with tech communities across Argentina
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 md:p-6'
          >
            <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
              <Tabs
                defaultValue='all'
                className='w-full'
                onValueChange={setSelectedCategory}
              >
                <TabsList className='w-full h-full flex-wrap justify-start gap-2 bg-transparent'>
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className={cn(
                        'flex-shrink-0 px-4 py-2 rounded-lg',
                        'data-[state=active]:bg-primary/10',
                        'data-[state=active]:text-primary',
                        'transition-all duration-200',
                        'hover:bg-accent/10'
                      )}
                    >
                      {capitalize(category)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select onValueChange={setSelectedProvince} defaultValue='all'>
                <SelectTrigger className='w-full md:w-[200px]'>
                  <SelectValue placeholder='Filter by province' />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {capitalize(province)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {isLoading ? (
            <div className='flex justify-center items-center min-h-[200px]'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
            </div>
          ) : (
            <motion.div
              variants={container}
              initial='hidden'
              animate='show'
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            >
              {filteredCommunities.map((community) => (
                <CommunityCard key={community.slug} community={community} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

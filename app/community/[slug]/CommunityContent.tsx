'use client';

import { motion } from 'motion/react';
import {
  Globe,
  Github,
  Linkedin,
  MessageCircle,
  Send,
  MessageSquare,
  MapPin,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { Community } from '@/types/community';
import XformerlyTwitter from '@/components/ui/x-formerly-twitter';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface CommunityContentProps {
  community: Community;
}

export default function CommunityContent({ community }: CommunityContentProps) {
  // Create a sorted copy of the members by name (alphabetical order)
  const sortedMembers = community.members
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className='container mx-auto px-4 py-8 md:py-12 space-y-12'
    >
      <motion.header variants={item} className='space-y-6'>
        <div className='flex flex-col md:flex-row items-start md:items-end gap-4'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
            {community.name}
          </h1>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <span>{community.province}</span>
          </div>
        </div>

        <Badge variant='outline' className='text-sm px-3 py-1'>
          {community.category}
        </Badge>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold tracking-tight'>
              Description
            </h2>
            <p className='text-base text-muted-foreground leading-relaxed'>
              {community.fullDescription}
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-semibold tracking-tight'>Connect</h2>
            <div className='grid grid-cols-2 gap-3'>
              {community.website && (
                <Button
                  asChild
                  variant='outline'
                  className='w-full group hover:border-primary/50 transition-all'
                >
                  <a
                    href={community.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Globe className='mr-2 h-4 w-4 group-hover:text-primary transition-colors' />
                    Website
                  </a>
                </Button>
              )}
              {community.twitter && (
                <Button
                  asChild
                  variant='outline'
                  className='w-full group hover:border-primary/50 transition-all'
                >
                  <a
                    href={`https://twitter.com/${community.twitter}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <XformerlyTwitter className='mr-2 h-4 w-4 group-hover:text-primary transition-colors' />
                    X (Twitter)
                  </a>
                </Button>
              )}
              {community.whatsapp && (
                <Button
                  asChild
                  variant='outline'
                  className='w-full group hover:border-primary/50 transition-all'
                >
                  <a
                    href={community.whatsapp}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <MessageCircle className='mr-2 h-4 w-4 group-hover:text-primary transition-colors' />
                    Whatsapp
                  </a>
                </Button>
              )}
              {community.telegram && (
                <Button
                  asChild
                  variant='outline'
                  className='w-full group hover:border-primary/50 transition-all'
                >
                  <a
                    href={community.telegram}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Send className='mr-2 h-4 w-4 group-hover:text-primary transition-colors' />
                    Telegram
                  </a>
                </Button>
              )}
              {community.discord && (
                <Button
                  asChild
                  variant='outline'
                  className='w-full group hover:border-primary/50 transition-all'
                >
                  <a
                    href={community.discord}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <MessageSquare className='mr-2 h-4 w-4 group-hover:text-primary transition-colors' />
                    Discord
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <motion.section variants={item} className='space-y-6'>
        <h2 className='text-2xl font-semibold tracking-tight'>Members</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className='group bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50'>
                <CardHeader>
                  <CardTitle className='text-lg font-medium'>
                    {member.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex gap-2'>
                  {member.github && (
                    <Button
                      asChild
                      variant='ghost'
                      size='icon'
                      className='hover:bg-primary/10 hover:text-primary transition-colors'
                    >
                      <a
                        href={`https://github.com/${member.github}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                  {member.twitter && (
                    <Button
                      asChild
                      variant='ghost'
                      size='icon'
                      className='hover:bg-primary/10 hover:text-primary transition-colors'
                    >
                      <a
                        href={`https://x.com/${member.twitter}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <XformerlyTwitter className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                  {member.linkedin && (
                    <Button
                      asChild
                      variant='ghost'
                      size='icon'
                      className='hover:bg-primary/10 hover:text-primary transition-colors'
                    >
                      <a
                        href={`https://www.linkedin.com/in/${member.linkedin}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Linkedin className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

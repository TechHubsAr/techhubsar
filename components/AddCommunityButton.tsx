'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function AddCommunityButton() {
  return (
    <Link href='/add-community'>
      <button
        className={cn(
          'group relative overflow-hidden rounded-xl mt-8',
          'dark:bg-background bg-white', // Added light mode background
          'p-px transition-transform',
          'active:scale-95 hover:scale-[1.02]',
          'shadow-sm dark:shadow-none' // Added light mode shadow
        )}
      >
        <motion.span
          animate={{
            top: ['50%', '0%', '50%', '100%', '50%'],
            left: ['0%', '50%', '100%', '50%', '0%'],
          }}
          className={cn(
            '-translate-x-1/2 -translate-y-1/2 absolute z-10 size-8',
            'transform-gpu blur-sm transition-transform duration-300',
            'group-hover:scale-[3]',
            'dark:opacity-100 opacity-80' // Reduced opacity for light mode
          )}
          transition={{
            duration: 3,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <motion.span
            animate={{
              rotate: ['0deg', '360deg'],
            }}
            className='block size-full transform-gpu rounded-full'
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
            }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
            }}
          />
        </motion.span>

        <span className={cn(
          'relative z-10 flex items-center gap-2 rounded-xl',
          'dark:bg-background/95 bg-white/95',
          'px-6 py-3 text-sm font-medium',
          'dark:border-none border border-border/20'
        )}>
          <motion.span
            animate={{
              backgroundImage: [
                'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
                'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))',
              ],
            }}
            className={cn(
              'flex items-center gap-2 bg-clip-text',
              'dark:text-primary text-primary/90',
              'transition-colors duration-500',
              'group-hover:text-transparent font-mono'
            )}
            transition={{
              duration: 2,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <Plus className={cn(
              'w-4 h-4',
              'dark:text-primary text-primary/90'
            )} />
            Add new community
          </motion.span>
        </span>
      </button>
    </Link>
  );
}

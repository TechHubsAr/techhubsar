'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const ThemeSwitch = ({
  className,
}: {
  className?: string;
}) => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSwitchTheme = () => {
    if (resolvedTheme === 'dark') setTheme('light');
    if (resolvedTheme === 'light') setTheme('dark');
  };

  if (!isMounted) return null;

  return (
    <div className={cn('relative group', className)}>
      <button
        type='button'
        onClick={handleSwitchTheme}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
        aria-pressed={resolvedTheme === 'dark'}
        className={cn(
          'group peer relative w-14 h-10 overflow-hidden transition',
          'rounded-full bg-neutral-50 dark:bg-black/40',
          'p-2 border border-neutral-500/20',
          'hover:scale-110 transform-gpu transition duration-150',
        )}
      >
        <span className='sr-only'>
          {resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        </span>
        <SunIcon
          aria-hidden='true'
          className={cn(
            'size-5 text-neutral-600 transition-all dark:text-neutral-300',
            'z-50 duration-300 absolute top-1/2 -translate-y-1/2 left-2',
            'transform-gpu',
            resolvedTheme === 'light'
              ? 'opacity-100 translate-x-0 scale-100 group-hover:scale-75 group-hover:opacity-90'
              : 'opacity-0 -translate-x-8 scale-90 group-hover:-translate-x-3',
          )}
        />
        <MoonIcon
          aria-hidden='true'
          className={cn(
            'size-5 text-neutral-600 transition-all dark:text-neutral-300',
            'z-50 duration-300 absolute top-1/2 -translate-y-1/2 right-2',
            'transform-gpu',
            resolvedTheme === 'dark'
              ? 'opacity-100 translate-x-0 scale-100 group-hover:scale-75 group-hover:opacity-90'
              : 'opacity-0 translate-x-8 scale-75 group-hover:translate-x-3',
          )}
        />
      </button>

      <button
        type='button'
        onClick={() => setTheme('system')}
        aria-label='Use system theme'
        className={cn(
          'peer group absolute top-12 size-10',
          'overflow-hidden transition rounded-full',
          'bg-neutral-50 dark:bg-neutral-900',
          'left-1/2 -translate-x-1/2',
          'p-2 border border-neutral-500/20',
          'peer-hover:scale-110 transform-gpu transition duration-300',
          'inline-flex items-center justify-center',
          'opacity-0 group-hover:opacity-100',
          '-translate-y-4 group-hover:translate-y-0',
          'scale-0 group-hover:scale-100',
        )}
      >
        <span className='sr-only'>Use system theme settings</span>
        <SunMoonIcon
          aria-hidden='true'
          className={cn(
            'size-5 text-neutral-600 transition-all dark:text-neutral-300',
            'z-50 duration-300 transform-gpu',
            theme === 'system'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-50 scale-75',
          )}
        />
      </button>
    </div>
  );
};

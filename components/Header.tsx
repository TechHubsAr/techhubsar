'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { cn } from '@/lib/utils';

const dataButtons = [
  { label: 'Home', href: '/' },
  { label: 'Communities', href: '/communities' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [elementFocused, setElementFocused] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const activeIndex = dataButtons.findIndex(button => button.href === pathname);
    setElementFocused(activeIndex);
  }, [pathname]);

  return (
    <header className={cn(
      'sticky top-0 w-full z-50',
      'backdrop-blur-xl border-b border-border/50',
      'dark:bg-background/5 bg-white/70'
    )}>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between gap-8'>
          {/* Left side with navigation */}
          <div className='flex items-center gap-8'>
            {/* Mobile Navigation */}
            <div className='md:hidden'>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Menu className='h-5 w-5' />
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-[240px] sm:w-[300px]'>
                  <SheetHeader>
                    <SheetTitle>
                    <Link
                      href='/'
                      className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'
                    >
                      TechHubsAr
                    </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className='flex flex-col gap-2 mt-4'>
                    {dataButtons.map((button, index) => (
                      <Link
                        key={button.label}
                        href={button.href}
                        onClick={() => {
                          setElementFocused(index);
                          setIsOpen(false);
                        }}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                          ${elementFocused === index
                            ? 'bg-accent/10 text-foreground'
                            : 'text-foreground/80 hover:text-foreground hover:bg-accent/5'
                          }`}
                      >
                        {button.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center gap-8'>
              <Link
                href='/'
                className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'
              >
                TechHubsAr
              </Link>
              {dataButtons.map((button, index) => (
                <Link
                  key={button.label}
                  href={button.href}
                  className='relative px-3 py-2'
                  onClick={() => setElementFocused(index)}
                >
                  <span className='relative z-10 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground'>
                    {button.label}
                  </span>
                  <AnimatePresence>
                    {elementFocused === index && (
                      <motion.div
                        layoutId='navbar-indicator'
                        className='absolute inset-0 rounded-md bg-accent/10'
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side with theme switch */}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
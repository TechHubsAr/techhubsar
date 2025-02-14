import Link from 'next/link';
import { Github } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className={cn(
      'border-t border-border/50',
      'dark:bg-background/50 bg-white/60 backdrop-blur-sm',
      'mt-auto w-full'
    )}>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12'>
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold tracking-tight'>About TechHubsAr</h3>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              TechHubsAr is a community-driven project showcasing tech
              communities across Argentina.
            </p>
          </div>

          <div className='space-y-3'>
            <h3 className='text-lg font-semibold tracking-tight'>Important Links</h3>
            <ul className='space-y-2'>
              {[
                { href: '/add-community', label: 'Add New Community' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'text-sm text-muted-foreground',
                      'hover:text-primary transition-colors duration-200',
                      'flex items-center gap-2'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='space-y-3'>
            <h3 className='text-lg font-semibold tracking-tight'>Connect</h3>
            <a
              href='https://github.com/TechHubsAr/techhubsar'
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'group flex items-center gap-2',
                'text-sm text-muted-foreground',
                'hover:text-primary transition-colors duration-200'
              )}
            >
              <Github className='h-4 w-4 transition-transform group-hover:scale-110' />
              GitHub Repository
            </a>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t border-border/50'>
          <p className='text-center text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} TechHubsAr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
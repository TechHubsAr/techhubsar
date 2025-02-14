import type React from 'react';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

import './globals.css';

export const metadata = {
  title: 'TechHubsAr',
  description: 'Tech Communities in Argentina',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className='min-h-screen scroll-smooth font-sans antialiased'
      lang='en'
    >
      <body className={cn(
        'min-h-screen antialiased',
        'dark:bg-black/[0.96] bg-zinc-100',
        GeistSans.className
      )}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex flex-col min-h-screen text-foreground'>
            <Header />
            <main className='flex-1 w-full'>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics/>
      </body>
    </html>
  )
};

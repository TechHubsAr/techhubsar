import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddCommunity() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
        Add a New Tech Community
      </h1>
      <div className='bg-background/50 backdrop-blur-sm border border-border/50 shadow-xl rounded-xl p-8'>
        <p className='text-lg text-muted-foreground mb-6'>
          To add a new tech community to our list, please follow these steps:
        </p>
        <ol className='list-decimal list-inside space-y-4 mb-8'>
          {[
            "Fork the TechHubsAr repository on GitHub.",
            "Clone your forked repository to your local machine.",
            "Create a new branch for your changes.",
            "Add the new community information to the /data/communities.json JSON file.",
            "Commit your changes and push to your forked repository.",
            "Create a Pull Request (PR) from your fork to the main TechHubsAr repository.",
          ].map((step, index) => (
            <li key={index} className='flex items-start gap-4 pl-2'>
              <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold'>
                {index + 1}
              </span>
              <span className='flex-1 pt-1'>{step}</span>
            </li>
          ))}
        </ol>
        <p className='text-lg text-muted-foreground mb-6'>
          For more detailed instructions and to access the repository, please
          visit our GitHub page:
        </p>
        <a
          href='https://github.com/TechHubsAr/techhubsar'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group'
        >
          <svg
            className='w-5 h-5 group-hover:scale-110 transition-transform'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
          </svg>
          TechHubsAr GitHub Repository
        </a>
        <div className='flex justify-center'>
          <Link href='/'>
            <Button
              variant='secondary'
              className='hover:scale-105 transition-transform active:scale-95'
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

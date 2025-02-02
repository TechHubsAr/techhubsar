import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

export default function AboutPage() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
        About TechHubsAr
      </h1>
      <div className='bg-background/50 backdrop-blur-sm border border-border/50 shadow-xl rounded-xl p-8'>
        <div className='space-y-6'>
          <p className='text-lg text-muted-foreground'>
            TechHubsAr is a community-driven project aimed at showcasing and
            connecting tech communities across Argentina. Our mission is to
            foster collaboration, knowledge sharing, and growth within the
            Argentine tech ecosystem.
          </p>
          <p className='text-lg text-muted-foreground'>
            We believe in the power of local tech communities to drive
            innovation, create opportunities, and shape the future of technology
            in Argentina. By providing a platform to discover and connect with
            these communities, we hope to contribute to the growth and success
            of the Argentine tech industry.
          </p>

          <div className='mt-10'>
            <h2 className='text-2xl font-semibold mb-4'>Our Goals</h2>
            <ul className='list-none space-y-3'>
              {[
                "Showcase diverse tech communities across Argentina",
                "Facilitate connections between tech enthusiasts, professionals, and communities",
                "Promote knowledge sharing and collaboration within the tech ecosystem",
                "Support the growth and development of local tech initiatives",
              ].map((goal, index) => (
                <li key={index} className='flex items-start gap-4'>
                  <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold'>
                    {index + 1}
                  </span>
                  <span className='flex-1 pt-1'>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-10'>
            <h2 className='text-2xl font-semibold mb-4'>Get Involved</h2>
            <p className='text-lg text-muted-foreground mb-6'>
              TechHubsAr is an open-source project, and we welcome contributions
              from the community. Whether you want to add your tech community,
              improve our platform, or share your ideas, we'd love to hear from
              you!
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button asChild className='bg-tech-gradient text-white font-bold'>
                <Link href='/add-community'>Add Your Community</Link>
              </Button>
              <Button asChild variant='outline'>
                <a
                  href='https://github.com/TechHubsAr/techhubsar'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2'
                >
                  <Github className='h-4 w-4' />
                  Contribute on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

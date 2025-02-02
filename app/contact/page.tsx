export default function ContactPage() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
        Contact Us
      </h1>
      <div className='bg-background/50 backdrop-blur-sm border border-border/50 shadow-xl rounded-xl p-8'>
        <p className='text-lg text-muted-foreground mb-6'>
          Have questions, suggestions, or just want to get in touch? We'd love
          to hear from you!
        </p>
        <div className='mt-8 space-y-4'>
          <h2 className='text-2xl font-semibold mb-6'>Ways to Connect</h2>
          <div className='space-y-4'>
            <a
              href='mailto:contact@techhubs.ar'
              className='flex items-center gap-2 p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors'
            >
              <div className='flex-1'>
                <h3 className='font-medium'>Email</h3>
                <p className='text-muted-foreground'>contact@techhubs.ar</p>
              </div>
            </a>
            <a
              href='https://twitter.com/techhubsar'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors'
            >
              <div className='flex-1'>
                <h3 className='font-medium'>Twitter</h3>
                <p className='text-muted-foreground'>@techhubsar</p>
              </div>
            </a>
            <a
              href='https://github.com/TechHubsAr/techhubsar'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors'
            >
              <div className='flex-1'>
                <h3 className='font-medium'>GitHub</h3>
                <p className='text-muted-foreground'>TechHubsAr Repository</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

# TechHubsAr

TechHubsAr is a web application that showcases tech communities across Argentina. It provides an interactive map and a list of communities, allowing users to explore and connect with tech enthusiasts throughout the country.

## Features

- Interactive map of Argentina showing tech community locations
- Detailed list of tech communities with quick access to their information
- Individual community pages with full details and member information
- Responsive design for both desktop and mobile devices
- Integration with popular communication platforms (Twitter, WhatsApp, Telegram, and Discord)
- SEO-friendly URLs using community name slugs
- Optimized data loading with pre-generated JSON file
- Automatic contributor recognition on the About page
- Custom favicon and app icons for various devices and platforms

...

## Customization

### Icons and Images

TechHubsAr uses custom-generated icons and images for favicon, apple touch icon, Open Graph image, and Twitter card image. These are dynamically generated using Next.js 13's built-in support for icon and image generation. You can find and modify these in the following files:

- `public/favicon.ico`: Favicon
- `public/apple-touch-icon.png`: Apple touch icon
- `app/opengraph-image.tsx`: Open Graph image
- `app/twitter-image.tsx`: Twitter card image

To customize these icons and images, you can modify the respective files to change colors, text, or add your own designs.

## Getting Started

### Prerequisites

- Node.js (v20)
- npm


## Adding a community

- Fork the repo
- Fork the TechHubsAr repository on GitHub.
- Clone your forked repository to your local machine.
- Create a new branch for your changes.
- Take the template from "community.example.json", duplicate it and add your communtiy information taking into account:
    - The ID could be any number (not being used right now and will be deprecated)
    - The Slug should be the community name separated with `-` and withouth special characters
    - The file name should be the same as the slug
- Place your community json on `/public/data/communities`.
- Commit your changes and push to your forked repository.
- Create a Pull Request (PR) from your fork to the main TechHubsAr repository.
# NumFOCUS Website

A modern Astro-based website for NumFOCUS, the nonprofit organization promoting open practices in research, data, and scientific computing.

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7d2f8a6-7a2c-460f-adc9-8674cdf3d5af/deploy-status)](https://app.netlify.com/projects/numfocus-dev/deploys)

## Technology Stack

- **Framework**: [Astro](https://astro.build) v5.7.10 with [React](https://react.dev) v19.0.0 integration
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4.0.6 with custom components
- **Content Management**: [Directus](https://directus.io) CMS integration via [@directus/sdk](https://www.npmjs.com/package/@directus/sdk) v19.0.1
- **Deployment**: [Netlify](https://netlify.com) via [@astrojs/netlify](https://www.npmjs.com/package/@astrojs/netlify) v6.3.2
- **Code Quality**: [Biome](https://biomejs.dev) v1.9.4 for linting, [Prettier](https://prettier.io) v3.5.1 for formatting

## Site Structure

- **Projects**: Filterable grid of sponsored and affiliated projects with search functionality
- **People**: Directory of team members and board members
- **Sponsors**: Display of organizational sponsors and supporters
- **Articles**: News and blog content managed through CMS
- **Pages**: Static and dynamic pages with flexible content blocks

## Development

### Prerequisites

- Node.js (latest stable version)
- npm or equivalent package manager

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── content/        # Content-specific components
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── people/         # People directory components
│   ├── projects/       # Project showcase components
│   ├── sponsors/       # Sponsor-related components
│   └── ui/            # Base UI components
├── data/               # Static data files
│   └── projects/      # Project metadata and images (YAML + PNG)
├── layouts/            # Astro layout templates
├── pages/              # Page routes
├── styles/             # Global CSS and Tailwind config
└── utils/              # Utility functions and helpers
```

## Content Management

The site uses Directus as a headless CMS for managing:

- Page content and metadata
- News articles and events
- People profiles
- Dynamic content blocks

Content is fetched from `cms.numfocus.draftlab.dev` during build time.

### Project Data Synchronization

Project data is managed through a hybrid approach:

- **Local source**: Project metadata stored in YAML files at `src/data/projects/`
- **Automated sync**: GitHub Action `sync-projects-to-cms.yml` triggers project sync to Directus CMS on commits that include changes to files in `src/data/projects`
- **CMS-only fields**: Features like `isFeatured` and `donateLink` managed exclusively in CMS

The sync process:

- Triggers via GitHub Action on repository commits
- Runs `scripts/syncProjectsToCms.ts` to update Directus CMS with latest project data
- Preserves CMS-only fields during updates
- Removes projects from CMS that no longer exist locally

## Deployment

The site is deployed on Netlify with automatic builds triggered by repository updates. The production site is available at the configured domain in `astro.config.mjs`.

## Useful Links

- **Production Site**: https://numfocus.org
- **Development Site**: https://numfocus-dev.netlify.app
- **Figma Designs**: https://www.figma.com/design/L7q8mcPySBVKxpLdWWAzPb/NumFOCUS?node-id=0-1&p=f&t=BAxfWIrWjAuFvvXU-0
- **Current Sitemap**: https://public-otont8yqvjp.octopus.do

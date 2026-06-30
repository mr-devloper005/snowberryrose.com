import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Discover, save, and explore curated content',
      description: 'A premium resource discovery platform for bookmarks, articles, visuals, and curated content — all in one place.',
      openGraphTitle: 'Discover, save, and explore curated content',
      openGraphDescription: 'Save resources, discover content, and build your personal library through a premium reading experience.',
      keywords: ['bookmarks', 'resource discovery', 'curated content', 'articles', 'reading platform'],
    },
    hero: {
      badge: 'DISCOVER · SAVE · EXPLORE',
      title: ['Your curated corner', 'of the web.'],
      description: 'Save resources, discover content, and build your personal library — all through a premium, distraction-free experience.',
      primaryCta: { label: 'Start exploring', href: '/sbm' },
      secondaryCta: { label: 'Browse articles', href: '/article' },
      searchPlaceholder: 'Search bookmarks, articles, visuals, and more…',
      focusLabel: 'Discover',
      featureCardBadge: 'latest discoveries',
      featureCardTitle: 'Curated content shapes the experience.',
      featureCardDescription: 'Recent saves and discoveries stay at the center of the experience.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for readers, collectors, and curious minds.',
      paragraphs: [
        'This platform brings together bookmarks, article reading, visual browsing, and downloadable resources so you can move naturally between different content types.',
        'Instead of scattering your saves and discoveries across disconnected apps, everything lives here — connected, searchable, and beautifully presented.',
        'Whether you start with a saved link, an article, an image post, or a PDF, you can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Premium reading experience with distraction-free layouts.',
        'Connected sections for bookmarks, articles, visuals, and documents.',
        'Clean browsing rhythm designed to make discovery feel effortless.',
        'Lightweight interactions that keep everything fast and readable.',
      ],
      primaryLink: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryLink: { label: 'Read articles', href: '/article' },
    },
    cta: {
      badge: 'Join the platform',
      title: 'Discover, save, and share what matters most.',
      description: 'Move between bookmarks, articles, visual posts, and documents through one cohesive and beautifully designed platform.',
      primaryCta: { label: 'Get Started', href: '/signup' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A better way to discover and save what matters.',
    description: `${slot4BrandConfig.siteName} is built to make bookmarking, long-form reading, visual discovery, and curated resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected apps and tabs, the platform keeps related content easy to move through, easy to understand, and beautiful to look at.',
      'Whether someone starts with a saved link, an article, an image post, or a resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Discovery-first experience',
        description: 'We prioritize clarity, curation, and structure so people can read, browse, and discover without noise or distraction.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Bookmarks, articles, visual posts, documents, and listings stay connected so discovery feels natural across every section.',
      },
      {
        title: 'Premium and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful, high-quality content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A direct line — not a generic support bucket.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right channel instead of making you navigate a maze of forms.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search bookmarks, articles, topics, categories, and content across the platform.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find anything, instantly.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the platform.',
      placeholder: 'Search by keyword, topic, category, or title…',
    },
    resultsTitle: 'Latest content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the platform.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this platform.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to your account.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Login to continue browsing, managing your collection, and creating new content from your account.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Join the platform',
      title: 'Start your collection.',
      description: 'Create an account to access the publishing workspace, save content, and submit resources through the platform.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More content',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const

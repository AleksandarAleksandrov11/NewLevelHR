import type { Widen } from '../types';
/** Namespace "blog" — listing and article UI strings. Post content lives in src/content/blog. */
export const blog = {
  meta: {
    title: 'Blog – Notes From the People Side of Growth',
    description: 'Articles on hiring, onboarding, leadership, culture and compliance for founders and leadership teams of startups and SMEs, written by NewLevelHR.',
  },
  hero: {
    eyebrow: 'Blog',
    title: 'Notes from the people side of growth.',
    text: 'Short, practical and occasionally funny pieces on hiring, onboarding, managers, culture and the rules that are changing around pay.',
  },
  categories: {
    culture: 'Culture',
    recruiting: 'Recruiting',
    leadership: 'Leadership',
    compliance: 'Compliance',
    onboarding: 'Onboarding',
  },
  all: 'All',
  filterLabel: 'Filter by topic',
  count: '{count} of {total} articles',
  empty: 'No articles in this topic yet. Check back soon, or pick another topic.',
  featured: 'Latest',
  post: {
    toc: 'On this page',
    share: 'Share',
    shareLinkedIn: 'Share on LinkedIn',
    shareX: 'Share on X',
    shareEmail: 'Share by email',
    copyLink: 'Copy link',
    copied: 'Link copied',
    related: 'Related articles',
    backToBlog: 'Back to the blog',
    writtenBy: 'Written by',
    publishedOn: 'Published on',
    updatedOn: 'Updated on',
    ctaTitle: 'Recognise your own team in this?',
    ctaText: 'A free 30-minute call is the fastest way to find out what would help. No pitch deck, no pressure.',
    ctaButton: 'Book a free call',
    tags: 'Topics',
    minutes: '{minutes} min read',
  },
  comingSoon: {
    eyebrow: 'Coming soon',
    title: 'In the works',
    text: 'Three longer pieces we are writing next.',
    items: [
      { title: 'The EU Pay Transparency Directive: What You Need to Know', text: 'How the new directive affects your hiring, pay structures, and what to prepare for now.' },
      { title: 'Why Your First Manager Hire is Your Most Important', text: 'The hidden cost of promoting great engineers without leadership training.' },
      { title: 'The 90-Day Bridge: How to Stop Losing New Hires', text: 'A case study on reducing early turnover with structured onboarding support.' },
    ],
  },
} as const;
export type BlogDict = Widen<typeof blog>;

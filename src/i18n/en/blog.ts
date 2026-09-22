import type { Widen } from '../types';
/**
 * Namespace "blog": the article list and the article page.
 * English is the type reference for de/ and bg/.
 */
export const blog = {
  meta: {
    title: 'Blog: practical HR for startups and SMEs | NewLevelHR',
    description: 'Short, practical pieces on hiring, structure, managers and compliance, written for founders and leadership teams of startups and SMEs in Europe.',
  },
  hero: {
    eyebrow: 'Blog',
    title: 'Practical notes on the people side of growth.',
    text: 'What we see in the companies we work with: hiring that sticks, managers who grow into the job, and the paperwork nobody enjoys but everybody needs.',
    imageAlt: 'Someone writing at a laptop in warm natural light',
  },
  list: {
    allTags: 'All topics',
    filterLabel: 'Filter by topic',
    empty: 'No articles on this topic yet.',
    emptyAll: 'The first article is on its way. In the meantime, the free 30-minute call is the fastest way to get an answer.',
    count: '{count} of {total} articles',
    latest: 'Latest',
  },
  post: {
    published: 'Published {date}',
    updated: 'Updated {date}',
    readingTime: '{minutes} min read',
    back: 'All articles',
    share: 'Share this article',
    shareLinkedIn: 'Share on LinkedIn',
    shareX: 'Share on X',
    shareEmail: 'Share by email',
    author: 'Mariyana Velkova',
    authorRole: 'Founder, NewLevelHR',
    more: 'Keep reading',
  },
} as const;

export type BlogDict = Widen<typeof blog>;

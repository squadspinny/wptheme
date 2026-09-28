import { Article, Category, PopularPost } from '../types';
import { articles, defaultArticle, findArticleBySlug } from '../articles';

export { articles, defaultArticle, findArticleBySlug };

export const CATEGORIES: Category[] = [
  {
    id: 'bsod-stop-codes',
    name: 'BSOD Stop Codes',
    slug: 'bsod-stop-codes',
    count: 3,
    description: 'Detailed fixes for Windows Blue Screen of Death stop codes and BugChecks.',
  },
  {
    id: 'device-drivers',
    name: 'Device Drivers & I/O',
    slug: 'device-drivers',
    count: 2,
    description: 'Troubleshoot graphics, network, chipset, and peripheral driver conflicts.',
  },
  {
    id: 'memory-hardware',
    name: 'Memory & Hardware',
    slug: 'memory-hardware',
    count: 2,
    description: 'Diagnose RAM defects, SSD SMART failures, and motherboard instability.',
  },
  {
    id: 'windows-updates',
    name: 'Windows Update Errors',
    slug: 'windows-updates',
    count: 1,
    description: 'Resolutions for failed Windows 11 and 10 update patches and 0x800 error codes.',
  },
];

export const POPULAR_POSTS: PopularPost[] = articles.map((art, index) => ({
  id: art.slug,
  title: art.title,
  stopCode: art.stopCode,
  views: art.views ? `${(art.views / 1000).toFixed(1)}k views` : '10.5k views',
  category: art.category,
  badge: index === 0 ? 'Popular' : undefined,
  isMainPost: index === 0,
}));


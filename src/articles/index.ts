import { Article } from '../types';
import { article as driverOverranStackBuffer } from './driver-overran-stack-buffer';
import { article as criticalProcessDied } from './critical-process-died';
import { article as dpcWatchdogViolation } from './dpc-watchdog-violation';

export const articles: Article[] = [
  driverOverranStackBuffer,
  criticalProcessDied,
  dpcWatchdogViolation,
];

export const defaultArticle: Article = driverOverranStackBuffer;

/**
 * Finds an article matching a slug, id, or stop code.
 */
export function findArticleBySlug(slugOrId: string): Article | undefined {
  if (!slugOrId) return undefined;
  const clean = slugOrId
    .toLowerCase()
    .trim()
    .replace(/^#?\/?(article|blog)\//, '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');

  return articles.find(
    (a) =>
      a.slug.toLowerCase() === clean ||
      a.id?.toLowerCase() === clean ||
      a.stopCode?.toLowerCase() === clean ||
      a.slug.toLowerCase() === clean.replace(/-/g, ' ') ||
      clean === a.slug.toLowerCase()
  );
}

export {
  driverOverranStackBuffer,
  criticalProcessDied,
  dpcWatchdogViolation,
};

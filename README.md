# Errorease – Tech Troubleshooting & BSOD Guides

Clear, step-by-step guides for fixing Windows stop codes, Blue Screen (BSOD) crashes, driver conflicts, and system bugs.

## Adding a New Article

Every article is self-contained in its own file under `src/articles/`.

To add a new article:

1. **Copy an existing article file**:
   ```bash
   cp src/articles/driver-overran-stack-buffer.ts src/articles/your-new-article.ts
   ```

2. **Edit `src/articles/your-new-article.ts`**:
   - Change `slug`, `title`, `description`, `publishedAt`, `updatedAt`, `category`, `tags`, and `seo`.
   - Customize `sections`:
     - `heading` (`level: 2 | 3 | 4`)
     - `paragraph`
     - `list` (ordered or unordered, with optional terminal commands)
     - `code` (copyable terminal command block)
     - `table` (custom headers and rows)
     - `callout` (tips, warnings, notes)
     - `label` (sub-step headers)
   - Add FAQs in `faq: [{ question, answer }]`.

3. **Register the article** in `src/articles/index.ts`:
   ```ts
   import { article as yourNewArticle } from './your-new-article';

   export const articles: Article[] = [
     driverOverranStackBuffer,
     criticalProcessDied,
     dpcWatchdogViolation,
     yourNewArticle,
   ];
   ```

The article will automatically render with all styles, live search indexing, SEO meta tags, and responsive layouts!

## Run Locally

```bash
npm install
npm run dev
```

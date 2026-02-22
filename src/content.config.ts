import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const compatValue = z.enum(['full', 'partial', 'none', 'untested']);

const servers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servers' }),
  schema: z.object({
    // === IDENTITY ===
    name: z.string(),
    description: z.string(),
    verdict: z.enum(['recommended', 'conditional', 'skip']),
    verdict_note: z.string(),

    // === TECHNICAL ===
    language: z.string(),
    transport: z.array(z.string()),
    license: z.string(),
    github_url: z.string().url(),
    npm_package: z.string().nullable().optional(),
    pypi_package: z.string().nullable().optional(),
    stars: z.number(),
    last_updated: z.coerce.date(),

    // === SETUP ===
    setup_difficulty: z.number().min(1).max(3),

    // === COMPATIBILITY ===
    compatibility: z.object({
      claude_desktop: compatValue,
      cursor: compatValue,
      vscode: compatValue,
      claude_code: compatValue,
      windsurf: compatValue,
      cline: compatValue,
    }),

    // === INSTALL ===
    install: z.object({
      command: z.string(),
      config_json: z.record(z.any()),
      env_vars: z.array(z.object({
        name: z.string(),
        description: z.string(),
        required: z.boolean(),
      })).optional().default([]),
      prerequisites: z.array(z.string()).optional().default([]),
    }),

    // === TAXONOMY ===
    category: z.array(z.string()),
    related_slugs: z.array(z.string()).optional().default([]),
    affiliate_links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).optional().default([]),

    // === META ===
    metadata: z.object({
      date_added: z.coerce.date(),
      date_reviewed: z.coerce.date(),
      reviewer: z.string(),
    }),
  }),
});

export const collections = { servers };

/* ═══════════════════════════════════════════════════════════
   App Config — Environment and feature flags
   ═══════════════════════════════════════════════════════════ */

export const config = {
  /** Application name */
  appName: 'algo-journey',

  /** Application version */
  version: '0.1.0',

  /** Default theme */
  defaultTheme: 'dark' as 'dark' | 'light',

  /** Storage keys */
  storageKeys: {
    theme: 'aj-theme',
    progress: 'aj-progress',
    drafts: 'aj-drafts',
    recentProblems: 'aj-recent',
  },

  /** IndexedDB config */
  db: {
    name: 'algo-journey-db',
    version: 1,
    stores: {
      progress: 'progress',
      drafts: 'drafts',
    },
  },

  /** Execution limits */
  limits: {
    defaultTimeoutMs: 5000,
    defaultOutputLimitBytes: 65536,
    maxConcurrentWorkers: 2,
  },

  /** Content paths */
  content: {
    catalogPath: '/src/content/catalog.json',
    exercisesBasePath: '/src/content/exercises',
  },
} as const;

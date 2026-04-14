/* ═══════════════════════════════════════════════════════════
   Main Entry — Application bootstrap
   ═══════════════════════════════════════════════════════════ */

import { createAppShell } from './ui/app-shell';
import { renderCatalogPage } from './ui/pages/catalog-page';
import { renderProblemPage, disposeProblemPage } from './ui/pages/problem-page';
import { exerciseLoader } from './exercise-engine/exercise-loader';
import { progressStore } from './progress/progress-store';
import { router } from './app/router';
import type { Route } from './app/router';

async function main(): Promise<void> {
  // Initialize data layers
  exerciseLoader.init();
  await progressStore.init();

  // Build app shell
  const { container, contentArea } = createAppShell();
  const app = document.getElementById('app');
  if (!app) return;
  app.appendChild(container);

  // Route handler
  const handleRoute = async (route: Route) => {
    // Clean up previous page
    disposeProblemPage();

    if (route.page === 'problem' && route.slug) {
      await renderProblemPage(contentArea, route.slug);
    } else {
      await renderCatalogPage(contentArea);
    }
  };

  // Initialize router
  router.onChange(handleRoute);
  router.init();
}

// Boot
main().catch(console.error);

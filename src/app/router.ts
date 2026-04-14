/* ═══════════════════════════════════════════════════════════
   Router — Simple hash-based routing
   ═══════════════════════════════════════════════════════════ */

export interface Route {
  page: 'catalog' | 'problem';
  slug?: string;
}

export type RouteChangeHandler = (route: Route) => void;

class Router {
  private handlers: RouteChangeHandler[] = [];

  init(): void {
    window.addEventListener('hashchange', () => this.handleChange());
    // Handle initial route
    this.handleChange();
  }

  onChange(handler: RouteChangeHandler): () => void {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter(h => h !== handler);
    };
  }

  navigate(route: Route): void {
    if (route.page === 'problem' && route.slug) {
      window.location.hash = `#/problem/${route.slug}`;
    } else {
      window.location.hash = '#/';
    }
  }

  getCurrentRoute(): Route {
    return this.parseHash(window.location.hash);
  }

  private parseHash(hash: string): Route {
    const path = hash.replace('#', '').replace(/^\//, '');

    if (path.startsWith('problem/')) {
      const slug = path.replace('problem/', '');
      return { page: 'problem', slug };
    }

    return { page: 'catalog' };
  }

  private handleChange(): void {
    const route = this.getCurrentRoute();
    for (const handler of this.handlers) {
      handler(route);
    }
  }
}

export const router = new Router();

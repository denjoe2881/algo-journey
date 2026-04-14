/* ═══════════════════════════════════════════════════════════
   Progress Store — IndexedDB persistence for problem progress
   ═══════════════════════════════════════════════════════════ */

import { config } from '../app/config';
import type { ProblemProgress, Draft, ProgressStatus } from '../shared/types';

class ProgressStore {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(config.db.name, config.db.version);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(config.db.stores.progress)) {
          db.createObjectStore(config.db.stores.progress, { keyPath: 'problemId' });
        }
        if (!db.objectStoreNames.contains(config.db.stores.drafts)) {
          db.createObjectStore(config.db.stores.drafts, { keyPath: 'problemId' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  // ── Progress ──

  async getProgress(problemId: string): Promise<ProblemProgress | null> {
    return this.get<ProblemProgress>(config.db.stores.progress, problemId);
  }

  async getAllProgress(): Promise<ProblemProgress[]> {
    return this.getAll<ProblemProgress>(config.db.stores.progress);
  }

  async saveProgress(progress: ProblemProgress): Promise<void> {
    return this.put(config.db.stores.progress, progress);
  }

  async getProgressStatus(problemId: string): Promise<ProgressStatus> {
    const progress = await this.getProgress(problemId);
    return progress?.status ?? 'not_started';
  }

  // ── Drafts ──

  async getDraft(problemId: string): Promise<Draft | null> {
    return this.get<Draft>(config.db.stores.drafts, problemId);
  }

  async saveDraft(draft: Draft): Promise<void> {
    return this.put(config.db.stores.drafts, draft);
  }

  // ── Recent Problems ──

  getRecentProblems(): string[] {
    const raw = localStorage.getItem(config.storageKeys.recentProblems);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  }

  addRecentProblem(slug: string): void {
    const recent = this.getRecentProblems().filter(s => s !== slug);
    recent.unshift(slug);
    const trimmed = recent.slice(0, 20); // Keep last 20
    localStorage.setItem(config.storageKeys.recentProblems, JSON.stringify(trimmed));
  }

  // ── Generic DB helpers ──

  private get<T>(storeName: string, key: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) { resolve(null); return; }
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  private getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) { resolve([]); return; }
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private put(storeName: string, value: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) { resolve(); return; }
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put(value);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const progressStore = new ProgressStore();

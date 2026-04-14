/* ═══════════════════════════════════════════════════════════
   Runtime Events — Event stream type definitions
   ═══════════════════════════════════════════════════════════ */

import type { CompileDiagnostic, RunResult } from './types';

// ── Event Types ──
export type RuntimeEventType =
  | 'run:start'
  | 'parse:start'
  | 'parse:complete'
  | 'parse:error'
  | 'compile:start'
  | 'compile:complete'
  | 'compile:error'
  | 'execute:start'
  | 'execute:complete'
  | 'execute:timeout'
  | 'execute:error'
  | 'result:ready'
  | 'run:cancel';

// ── Event Payloads ──
export interface RuntimeEvent {
  type: RuntimeEventType;
  timestamp: number;
  payload?: RuntimeEventPayload;
}

export type RuntimeEventPayload =
  | RunStartPayload
  | ParseCompletePayload
  | ParseErrorPayload
  | CompileCompletePayload
  | CompileErrorPayload
  | ExecuteCompletePayload
  | ExecuteTimeoutPayload
  | ExecuteErrorPayload
  | ResultReadyPayload;

export interface RunStartPayload {
  problemId: string;
  source: string;
}

export interface ParseCompletePayload {
  valid: boolean;
  warnings?: string[];
}

export interface ParseErrorPayload {
  errors: string[];
}

export interface CompileCompletePayload {
  artifactId: string;
  elapsedMs: number;
}

export interface CompileErrorPayload {
  diagnostics: CompileDiagnostic[];
}

export interface ExecuteCompletePayload {
  stdout: string;
  elapsedMs: number;
}

export interface ExecuteTimeoutPayload {
  limitMs: number;
  elapsedMs: number;
}

export interface ExecuteErrorPayload {
  message: string;
  stack?: string;
}

export interface ResultReadyPayload {
  result: RunResult;
}

// ── Event Bus ──
export type RuntimeEventHandler = (event: RuntimeEvent) => void;

export class EventBus {
  private handlers: RuntimeEventHandler[] = [];

  on(handler: RuntimeEventHandler): () => void {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter(h => h !== handler);
    };
  }

  emit(event: RuntimeEvent): void {
    for (const handler of this.handlers) {
      handler(event);
    }
  }

  createEvent(type: RuntimeEventType, payload?: RuntimeEventPayload): RuntimeEvent {
    return {
      type,
      timestamp: Date.now(),
      payload,
    };
  }
}

// ── Singleton ──
export const eventBus = new EventBus();

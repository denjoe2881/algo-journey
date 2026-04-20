/* ═══════════════════════════════════════════════════════════
   Output Parser
   Parses structured TEST| / ERROR| lines from Runner.java stdout.
   Protocol:
     TEST|<name>|<pass>|<actual>|<expected>
     ERROR|<name>|<exception>
     === DONE ===
   ═══════════════════════════════════════════════════════════ */

import type { TestCase, TestResult } from '../shared/types';

export interface ParsedResult {
  tests: Omit<TestResult, 'visibility'>[];
  runtimeError?: string;
  done: boolean;
}



/**
 * Parse stdout lines from Runner.java into structured TestResults.
 * Supports both legacy AJ| format and new TEST|/ERROR| format.
 */
export function parseRunnerOutput(
  stdout: string,
  allTests: TestCase[],
): ParsedResult {
  const lines = stdout.split('\n').map(l => l.trim()).filter(Boolean);

  const resultMap = new Map<string, Omit<TestResult, 'visibility'>>();
  let runtimeError: string | undefined;
  let done = false;

  for (const line of lines) {
    // New format sentinel
    if (line === '=== DONE ===' || line === '__AJ_DONE__') {
      done = true;
      continue;
    }

    // ── New format: ERROR|<name>|<exception> ─────────────────────
    if (line.startsWith('ERROR|')) {
      const parts = line.split('|');
      if (parts.length >= 3) {
        const name   = parts[1];
        const errMsg = parts.slice(2).join('|');
        resultMap.set(name, { name, status: 'error' as const, message: errMsg });
      }
      continue;
    }

    // ── New format: TEST|<name>|<pass>|<actual>|<expected> ───────
    if (line.startsWith('TEST|')) {
      const parts = line.split('|');
      if (parts.length < 5) continue;
      const [, name, passStr, actual, ...rest] = parts;
      const expected = rest.join('|');
      if (!name) continue;

      const passed = passStr === 'true';
      resultMap.set(name, {
        name,
        status: passed ? 'passed' : 'failed',
        actualPreview:   actual?.slice(0, 300),
        expectedPreview: expected?.slice(0, 300),
      });
      continue;
    }

    // ── Legacy format: AJ_ERROR|testname: exception ───────────────
    if (line.startsWith('AJ_ERROR|')) {
      const body = line.slice('AJ_ERROR|'.length);
      const colonIdx = body.indexOf(': ');
      if (colonIdx > 0) {
        const testName = body.slice(0, colonIdx);
        const errMsg   = body.slice(colonIdx + 2);
        resultMap.set(testName, { name: testName, status: 'error' as const, message: errMsg });
      } else {
        runtimeError = body;
      }
      continue;
    }

    // ── Legacy format: AJ|<name>|<pass>|<actual>|<expected> ──────
    if (line.startsWith('AJ|')) {
      const parts = line.split('|');
      if (parts.length < 5) continue;
      const [, name, passStr, actual, expected] = parts;
      if (!name) continue;

      const passed = passStr === 'true';
      resultMap.set(name, {
        name,
        status: passed ? 'passed' : 'failed',
        actualPreview:   actual?.slice(0, 300),
        expectedPreview: expected?.slice(0, 300),
      });
      continue;
    }
  }

  // Build ordered results aligned with allTests
  const tests: Omit<TestResult, 'visibility'>[] = allTests.map(tc => {
    const parsed = resultMap.get(tc.name);
    if (parsed) return parsed;
    return {
      name: tc.name,
      status: 'error' as const,
      message: runtimeError ? `Runtime error before this test` : 'No output — test may not have run',
    };
  });

  // Append dynamically generated tests (stress tests from javaGenerator)
  for (const [name, parsed] of resultMap.entries()) {
    if (!allTests.some(tc => tc.name === name)) {
      tests.push(parsed);
    }
  }

  return { tests, runtimeError, done };
}

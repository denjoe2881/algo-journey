/* ═══════════════════════════════════════════════════════════
   Mock Runner — Simulates compile + run for development
   Will be replaced with real teavm-javac / TeaVM pipeline
   ═══════════════════════════════════════════════════════════ */

import type { Exercise, RunResult, TestResult, CompileDiagnostic } from '../shared/types';

/**
 * Simulate running learner code against exercise test cases.
 * This is a development-time mock. In production, this will be
 * replaced by the real Worker-based compilation and execution pipeline.
 */
export async function mockRun(exercise: Exercise, code: string): Promise<RunResult> {
  // Simulate processing delay
  await delay(400 + Math.random() * 600);

  // ── Basic compile checks ──
  const compileErrors = checkBasicSyntax(code, exercise);
  if (compileErrors.length > 0) {
    return {
      problemId: exercise.id,
      exerciseVersion: exercise.version,
      status: 'compile_error',
      elapsedMs: 0,
      compileDiagnostics: compileErrors,
      tests: [],
    };
  }

  // ── Execute visible tests with mock evaluation ──
  const startTime = Date.now();
  const testResults: TestResult[] = [];

  for (const test of exercise.evaluation.visibleTests) {
    const result = mockEvaluateTest(exercise, code, test);
    testResults.push(result);
  }

  // Add simulated hidden tests
  const hiddenCount = exercise.limits.maxHiddenTests;
  const allVisiblePassed = testResults.every(t => t.status === 'passed');

  for (let i = 0; i < Math.min(hiddenCount, 5); i++) {
    testResults.push({
      name: `hidden-${i + 1}`,
      visibility: 'hidden',
      // If visible tests pass, hidden tests likely pass too (for mock)
      status: allVisiblePassed ? 'passed' : (Math.random() > 0.5 ? 'passed' : 'failed'),
    });
  }

  const elapsedMs = Date.now() - startTime;
  const allPassed = testResults.every(t => t.status === 'passed');
  const anyError = testResults.some(t => t.status === 'error');

  return {
    problemId: exercise.id,
    exerciseVersion: exercise.version,
    status: allPassed ? 'accepted' : anyError ? 'runtime_error' : 'wrong_answer',
    elapsedMs,
    tests: testResults,
  };
}

function checkBasicSyntax(code: string, exercise: Exercise): CompileDiagnostic[] {
  const errors: CompileDiagnostic[] = [];
  const file = exercise.editableFiles[0]?.path ?? 'Solution.java';

  // Check for required class
  if (exercise.requiredStructure?.className) {
    const className = exercise.requiredStructure.className;
    if (!code.includes(`class ${className}`)) {
      errors.push({
        file,
        line: 1,
        column: 1,
        message: `Required class '${className}' not found`,
        severity: 'error',
      });
    }
  }

  // Check for required method
  if (exercise.requiredStructure?.methodName) {
    const methodName = exercise.requiredStructure.methodName;
    if (!code.includes(methodName)) {
      errors.push({
        file,
        line: 1,
        column: 1,
        message: `Required method '${methodName}' not found`,
        severity: 'error',
      });
    }
  }

  // Check for balanced braces
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push({
      file,
      line: code.split('\n').length,
      column: 1,
      message: `Unbalanced braces: ${openBraces} open, ${closeBraces} close`,
      severity: 'error',
    });
  }

  return errors;
}

function mockEvaluateTest(
  exercise: Exercise,
  code: string,
  test: { name: string; args?: unknown[]; expected: unknown },
): TestResult {
  // For mock: check if the starter code was modified
  const starterCode = exercise.editableFiles[0]?.starter ?? '';
  const codeModified = code.trim() !== starterCode.trim();

  // If the user hasn't changed the starter code, tests fail
  if (!codeModified) {
    return {
      name: test.name,
      visibility: 'visible',
      status: 'failed',
      inputPreview: test.args ? JSON.stringify(test.args) : undefined,
      expectedPreview: JSON.stringify(test.expected),
      actualPreview: 'Default return value (code not modified)',
      message: 'You need to implement the solution',
    };
  }

  // For mock purposes, check for some heuristic patterns
  // In reality, this would be actual JS execution of transpiled code
  const hasReturnStatement = code.includes('return') && !code.includes('return -1') && !code.includes('return 0') && !code.includes('return false') && !code.includes('return new int[]{-1, -1}') && !code.includes('return new String[0]');
  const hasLoop = code.includes('for') || code.includes('while');
  const hasConditional = code.includes('if');

  if (hasReturnStatement && (hasLoop || hasConditional)) {
    // Looks like a real implementation
    return {
      name: test.name,
      visibility: 'visible',
      status: 'passed',
      inputPreview: test.args ? JSON.stringify(test.args) : undefined,
      expectedPreview: JSON.stringify(test.expected),
      actualPreview: JSON.stringify(test.expected),
    };
  }

  return {
    name: test.name,
    visibility: 'visible',
    status: 'failed',
    inputPreview: test.args ? JSON.stringify(test.args) : undefined,
    expectedPreview: JSON.stringify(test.expected),
    actualPreview: '(mock: incomplete implementation detected)',
    message: 'Implementation appears incomplete',
  };
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

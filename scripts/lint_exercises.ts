/**
 * lint_exercises.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Kiểm tra tự động các lỗi cú pháp phổ biến trong các file .exercise.ts và
 * .gen.ts trước khi chúng gây crash ở browser.
 *
 * Các lỗi được phát hiện:
 *  1. Double-escape trước single-quote (\\'  bên trong single-quoted strings)
 *  2. Unescaped template interpolation (${…} bên trong backtick strings) mà
 *     không có biến tương ứng (dấu hiệu: `${` không đi kèm với \`\${`)
 *  3. File .gen.ts dùng sai format (export const genMap thay vì export default
 *     defineTests)
 *
 * Chạy:
 *   npx tsx scripts/lint_exercises.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROBLEMS_DIR = path.join(ROOT, 'src', 'content', 'problems');

// ── Helpers ──────────────────────────────────────────────────────────────────

function walk(dir: string, ext: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full, ext));
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

interface LintError {
  file: string;
  line: number;
  message: string;
  snippet: string;
}

const errors: LintError[] = [];

function report(file: string, lineIdx: number, message: string, snippet: string) {
  errors.push({ file, line: lineIdx + 1, message, snippet: snippet.trim() });
}

// ── Rule 1: Double-escape before single-quote in single-quoted strings ────────
// Pattern: \\'  appearing in source.  In a legitimate single-quoted string this
// means the backslash is escaped (prints a literal \) and the quote ENDS the
// string — causing "Expected ']' but found …" errors at runtime.
function checkDoubleEscape(file: string, lines: string[]) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    // Looking for \\'  (two real backslashes in source = \\\\ in a JS string)
    if (/\\\\'/.test(line)) {
      report(file, i, "Double-escape before apostrophe (\\\\'). Use \\' instead.", line);
    }
  }
}

// ── Rule 2: Unescaped ${...} inside a template literal ───────────────────────
// We look for lines that contain `${` that is NOT preceded by a backslash.
// We exclude lines where `${` is used for a legitimate imported TS variable
// (i.e. where the surrounding context is a .gen.ts with imports or the string
// is a `code` / `genMethodBody` literal meant as Java source — those are fine).
// Heuristic: if the file has `statement:` template literals and contains `${`
// without an explicit `\${`, flag it.
function checkUnescapedInterpolation(file: string, lines: string[]) {
  // Only relevant for .exercise.ts files (statement field is backtick string)
  if (!file.endsWith('.exercise.ts')) return;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    // Match ${identifier} NOT preceded by backslash
    // We skip lines that are inside genMethodBody (they are Java source — fine)
    // Simple heuristic: if the line has 'genMethodBody' it's Java literal
    if (line.includes('genMethodBody') || line.includes('code:')) continue;

    const unescaped = /(?<!\\)\$\{[^}]+\}/.exec(line);
    if (unescaped) {
      report(
        file,
        i,
        `Unescaped template interpolation: "${unescaped[0]}". Use \\${unescaped[0]} to print literally.`,
        line,
      );
    }
  }
}

// ── Rule 3: .gen.ts using wrong export format ─────────────────────────────────
function checkGenFormat(file: string, content: string) {
  if (!file.endsWith('.gen.ts')) return;

  const hasDefineTests = content.includes('defineTests');
  const hasExportDefault = content.includes('export default');
  const hasGenMap = content.includes('export const genMap');

  if (hasGenMap) {
    errors.push({
      file,
      line: 1,
      message:
        '`export const genMap` is the wrong format. Use `export default defineTests(id, (t) => {...})` instead.',
      snippet: 'export const genMap = {...}',
    });
  } else if (!hasDefineTests || !hasExportDefault) {
    errors.push({
      file,
      line: 1,
      message:
        'Missing `export default defineTests(...)`. The loader expects a default export of type TestSuite.',
      snippet: content.slice(0, 120),
    });
  }
}

// ── Run all checks ────────────────────────────────────────────────────────────

const exerciseFiles = walk(PROBLEMS_DIR, '.exercise.ts');
const genFiles = walk(PROBLEMS_DIR, '.gen.ts');
const allFiles = [...exerciseFiles, ...genFiles];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  checkDoubleEscape(file, lines);
  checkUnescapedInterpolation(file, lines);
  checkGenFormat(file, content);
}

// ── Report ────────────────────────────────────────────────────────────────────

const rel = (f: string) => path.relative(ROOT, f).replace(/\\/g, '/');

if (errors.length === 0) {
  console.log('✅  No issues found across all exercise and gen files.');
  process.exit(0);
} else {
  console.error(`\n❌  Found ${errors.length} issue(s):\n`);
  for (const e of errors) {
    console.error(`  ${rel(e.file)}:${e.line}`);
    console.error(`  → ${e.message}`);
    console.error(`  ╰─ ${e.snippet.slice(0, 120)}`);
    console.error();
  }
  process.exit(1);
}

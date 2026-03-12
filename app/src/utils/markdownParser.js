import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import yaml from 'yaml';

// Configure marked with KaTeX
const marked = new Marked();
marked.use(markedKatex({
  throwOnError: false,
  nonStandard: true,
  output: 'html',
}));

/**
 * Render markdown string (with LaTeX) to HTML.
 */
export function renderMath(text) {
  if (!text) return '';
  return marked.parse(text);
}

/**
 * Parse a raw markdown level file into structured LevelData.
 */
export function parseLevel(raw) {
  // 1. Extract YAML front matter
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  const meta = fmMatch ? yaml.parse(fmMatch[1]) : {};
  const body = fmMatch ? raw.slice(fmMatch[0].length) : raw;

  // 2. Split into sections: Reading, Key Results, Exercises
  const sections = splitSections(body);

  // 3. Parse each section
  const readingHtml = renderMath(sections.reading || '');
  const keyResults = parseKeyResults(sections.keyResults || '');
  const exercises = parseExercises(sections.exercises || '');

  return {
    meta: {
      level: meta.level,
      title: meta.title || `Level ${meta.level}`,
      notes: meta.notes,
      prerequisites: meta.prerequisites || [],
      status: meta.status || null,
    },
    readingHtml,
    keyResults,
    exercises,
  };
}

function splitSections(body) {
  const result = { reading: '', keyResults: '', exercises: '' };

  // Find section positions
  const readingMatch = body.match(/^## Reading/m);
  const keyResultsMatch = body.match(/^## Key Results/m);
  const exercisesMatch = body.match(/^## Exercises/m);

  const readingStart = readingMatch ? body.indexOf(readingMatch[0]) + readingMatch[0].length : -1;
  const keyResultsStart = keyResultsMatch ? body.indexOf(keyResultsMatch[0]) + keyResultsMatch[0].length : -1;
  const exercisesStart = exercisesMatch ? body.indexOf(exercisesMatch[0]) + exercisesMatch[0].length : -1;

  // Collect section boundaries in order
  const boundaries = [];
  if (readingStart >= 0) boundaries.push({ name: 'reading', start: readingStart });
  if (keyResultsStart >= 0) boundaries.push({ name: 'keyResults', start: keyResultsStart });
  if (exercisesStart >= 0) boundaries.push({ name: 'exercises', start: exercisesStart });
  boundaries.sort((a, b) => a.start - b.start);

  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i].start;
    const end = i + 1 < boundaries.length
      ? body.lastIndexOf('## ', boundaries[i + 1].start)
      : body.length;
    result[boundaries[i].name] = body.slice(start, end).trim();
  }

  return result;
}

function parseKeyResults(text) {
  if (!text) return [];

  // Split on ### headers for definitions/theorems/results
  const parts = text.split(/^### (?=definition:|theorem:|result:)/mi);
  const results = [];

  for (const part of parts) {
    const headerMatch = part.match(/^(definition|theorem|result):\s*(.+)$/mi);
    if (!headerMatch) continue;

    const type = headerMatch[1].toLowerCase();
    const name = headerMatch[2].trim();
    const content = part.slice(headerMatch[0].length);

    results.push({
      type,
      name,
      number: extractField(content, 'Number'),
      plainEnglishHtml: renderMath(extractField(content, 'Plain English')),
      formalHtml: renderMath(extractField(content, 'Formal')),
      proofHtml: renderMath(extractField(content, 'Proof')),
      proofSketchHtml: renderMath(extractField(content, 'Proof sketch')),
      keyTechniqueHtml: renderMath(extractField(content, 'Key technique')),
      dependsOnHtml: renderMath(extractField(content, 'Depends on')),
      usedByHtml: renderMath(extractField(content, 'Used by')),
      loadBearing: extractField(content, 'Load-bearing') === 'yes',
    });
  }

  return results;
}

function parseExercises(text) {
  if (!text) return [];

  const parts = text.split(/^### (?=exercise:)/mi);
  const exercises = [];

  for (const part of parts) {
    const headerMatch = part.match(/^exercise:\s*(.+)$/mi);
    if (!headerMatch) continue;

    const name = headerMatch[1].trim();
    const content = part.slice(headerMatch[0].length);

    const number = extractField(content, 'Number');
    const difficulty = extractField(content, 'Difficulty') || 'standard';
    const tagsStr = extractField(content, 'Tags');
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : [];

    const question = extractField(content, 'Question');
    const solution = extractField(content, 'Solution');

    // Extract all hints
    const hints = [];
    for (let i = 1; i <= 5; i++) {
      const hint = extractField(content, `Hint ${i}`);
      if (hint) hints.push(renderMath(hint));
      else break;
    }

    exercises.push({
      name,
      number,
      difficulty,
      tags,
      questionHtml: renderMath(question),
      hints,
      solutionHtml: renderMath(solution),
    });
  }

  return exercises;
}

/**
 * Extract a **FieldName:** value from markdown text.
 * Captures everything until the next **KnownField:** or end of text.
 */
function extractField(text, fieldName) {
  const knownFields = [
    'Number', 'Plain English', 'Formal', 'Proof', 'Proof sketch', 'Key technique',
    'Depends on', 'Used by', 'Load-bearing', 'Difficulty', 'Tags',
    'Question', 'Hint 1', 'Hint 2', 'Hint 3', 'Hint 4', 'Hint 5',
    'Solution',
  ];

  // Build regex to find this field
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const fieldRegex = new RegExp(`\\*\\*${escaped}:\\*\\*\\s*`, 'm');
  const match = text.match(fieldRegex);
  if (!match) return null;

  const startIdx = match.index + match[0].length;

  // Find the next known field marker after this one
  let endIdx = text.length;
  for (const other of knownFields) {
    if (other === fieldName) continue;
    const otherEscaped = other.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const otherRegex = new RegExp(`\\*\\*${otherEscaped}:\\*\\*`, 'm');
    const otherMatch = text.slice(startIdx).match(otherRegex);
    if (otherMatch) {
      const pos = startIdx + otherMatch.index;
      if (pos < endIdx) endIdx = pos;
    }
  }

  return text.slice(startIdx, endIdx).trim();
}

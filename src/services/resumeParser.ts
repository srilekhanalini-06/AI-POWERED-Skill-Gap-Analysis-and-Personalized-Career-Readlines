import { SKILL_DICTIONARY } from '../data/skillDictionary';
import { ExtractedSkill } from '../types';

/**
 * Extracts plain text from an uploaded file (supports .txt, .pdf, .docx, .json).
 * Uses robust in-browser stream decoding.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'txt' || extension === 'json' || file.type.includes('text')) {
    return await file.text();
  }

  // Array buffer extraction for binary files (PDF, DOCX)
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  if (extension === 'pdf') {
    return extractTextFromPdfBuffer(bytes);
  } else if (extension === 'docx') {
    return extractTextFromDocxBuffer(bytes);
  }

  // Fallback: decode text characters from binary stream
  const decoder = new TextDecoder('utf-8', { fatal: false });
  return cleanExtractedText(decoder.decode(bytes));
}

/**
 * Extracts printable text strings from PDF binary stream.
 */
function extractTextFromPdfBuffer(bytes: Uint8Array): string {
  const decoder = new TextDecoder('latin1');
  const raw = decoder.decode(bytes);

  // Extract content between BT (Begin Text) and ET (End Text) or paren literals: (text) Tj
  const matches = raw.match(/\(([^()]{2,100})\)\s*Tj/g);
  if (matches && matches.length > 5) {
    return matches
      .map((m) => m.replace(/^\(/, '').replace(/\)\s*Tj$/, ''))
      .filter((s) => /[a-zA-Z]{2,}/.test(s))
      .join(' ');
  }

  // Fallback: extract long ASCII word sequences
  const asciiMatches = raw.match(/[A-Za-z0-9+#./\-_,;:() ]{4,120}/g) || [];
  return cleanExtractedText(asciiMatches.join(' '));
}

/**
 * Extracts XML text strings from DOCX binary stream (word/document.xml content).
 */
function extractTextFromDocxBuffer(bytes: Uint8Array): string {
  const decoder = new TextDecoder('utf-8', { fatal: false });
  const raw = decoder.decode(bytes);

  // Match <w:t>...</w:t> tags commonly present in DOCX
  const textMatches = raw.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
  if (textMatches && textMatches.length > 0) {
    return textMatches
      .map((t) => t.replace(/<[^>]+>/g, ''))
      .join(' ');
  }

  // Fallback to ASCII tokens
  const asciiMatches = raw.match(/[A-Za-z0-9+#./\-_,;:() ]{4,120}/g) || [];
  return cleanExtractedText(asciiMatches.join(' '));
}

function cleanExtractedText(text: string): string {
  return text
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Analyzes resume text against the curated SKILL_DICTIONARY.
 * Identifies matches, scores confidence, extracts surrounding context,
 * and sets default confirmed status.
 */
export function analyzeResumeSkills(resumeText: string): ExtractedSkill[] {
  if (!resumeText || resumeText.trim().length === 0) {
    return [];
  }

  const normalizedText = ` ${resumeText.toLowerCase()} `;
  const sentences = resumeText.split(/(?<=[.?!])\s+|\n+/);
  const foundSkills: ExtractedSkill[] = [];

  for (const skill of SKILL_DICTIONARY) {
    let matchedAlias: string | null = null;
    let matchCount = 0;
    let bestContext = '';

    for (const alias of skill.aliases) {
      // Escape regex special characters
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Require word boundary or punctuation boundary
      const regex = new RegExp(`(?:^|[^a-zA-Z0-9_+#])${escaped}(?:$|[^a-zA-Z0-9_+#])`, 'gi');
      const matches = normalizedText.match(regex);

      if (matches && matches.length > 0) {
        matchedAlias = alias;
        matchCount += matches.length;

        // Find context sentence
        if (!bestContext) {
          const matchingSentence = sentences.find((s) => {
            const sRegex = new RegExp(`(?:^|[^a-zA-Z0-9_+#])${escaped}(?:$|[^a-zA-Z0-9_+#])`, 'i');
            return sRegex.test(s);
          });
          if (matchingSentence) {
            bestContext = matchingSentence.trim().slice(0, 140);
          }
        }
      }
    }

    if (matchedAlias) {
      // Calculate realistic confidence based on mentions and presence
      let confidence = 75;
      if (matchCount >= 2) confidence += 15;
      if (matchCount >= 4) confidence = 98;
      if (confidence > 100) confidence = 100;

      foundSkills.push({
        name: skill.name,
        category: skill.category,
        confirmed: true, // Default confirmed upon extraction
        confidence,
        extractedFromResume: true,
        sourceContext: bestContext || `Found as '${matchedAlias}' in resume text`,
      });
    }
  }

  return foundSkills;
}

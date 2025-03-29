import { LyricsSection } from '@src/components/common/enums';

export const insertAtCursor = (
  text: string,
  selection: { start: number; end: number } | null = null,
  prefix: string,
  suffix: string = '',
): string => {
  // If no selection provided, assume cursor is at start position
  const { start, end } = selection;

  // Handle wrapping selected text or inserting at cursor
  if (start !== end) {
    // Wrap the selected text
    const newText = `${text.slice(0, start)}**${text.slice(start, end)}**${text.slice(end)}`;

    console.log('new text:', newText);

    return newText;
  } else {
    // Insert at cursor position
    return text.slice(0, start) + prefix + suffix + text.slice(start);
  }
};

export const insertSectionAtCursor = (
  text: string,
  start: number,
  section: LyricsSection,
): string => {
  const lines = text.split('\n');
  let currentLineIndex = 0;
  let charCount = 0;

  for (let i = 0; i < lines.length; i++) {
    if (charCount + lines[i].length >= start) {
      currentLineIndex = i;
      break;
    }
    charCount += lines[i].length + 1;
  }

  const currentLine = lines[currentLineIndex];

  if (currentLine.trim().length > 0) {
    lines.splice(currentLineIndex, 0, section);
  }
  // Case 2: Current line is empty → replace it
  else {
    lines[currentLineIndex] = section;
  }

  return lines.join('\n');
};

export const insertChord = (
  text: string,
  chord: string,
  selection: { start: number; end: number } | null = null,
): string => {
  if (!selection) return text;

  const { start } = selection;

  // Find the current line
  const lines = text.split('\n');
  let currentLineIndex = 0;
  let charCount = 0;

  console.log('lines:', lines);
  console.log('start:', start);
  for (let i = 0; i < lines.length; i++) {
    if (charCount + lines[i].length >= start) {
      currentLineIndex = i;
      break;
    }
    charCount += lines[i].length + 1;
  }

  const currentLine = lines[currentLineIndex];
  const positionInLine = start - charCount;

  // Check if there's already a chord line above
  if (
    currentLineIndex > 0 &&
    lines[currentLineIndex - 1].trim().startsWith('[')
  ) {
    // Modify existing chord line
    const chordLine = lines[currentLineIndex - 1];
    const newChordLine = insertChordIntoLine(chordLine, chord, positionInLine);
    lines[currentLineIndex - 1] = newChordLine;
  } else {
    // Insert new chord line
    const newChordLine = createChordLine(
      chord,
      positionInLine,
      currentLine.length,
    );
    lines.splice(currentLineIndex, 0, newChordLine);
  }

  return lines.join('\n');
};

const insertChordIntoLine = (
  chordLine: string,
  chord: string,
  position: number,
): string => {
  // Convert chord line to array for easier manipulation
  const chordChars = [...chordLine];

  // Find the appropriate position to insert the chord
  let spaceCount = 0;
  let i = 0;

  while (i < chordChars.length && spaceCount < position) {
    if (chordChars[i] === ' ') {
      spaceCount++;
    } else if (chordChars[i] === '[') {
      // Skip existing chords
      const chordEnd = chordChars.indexOf(']', i);
      if (chordEnd === -1) break;
      i = chordEnd;
    }
    i++;
  }

  // Insert the new chord
  if (i < chordChars.length) {
    chordChars.splice(i, 0, `[${chord}]`);
  } else {
    chordChars.push(`[${chord}]`);
  }

  return chordChars.join('');
};

const createChordLine = (
  chord: string,
  position: number,
  lineLength: number,
): string => {
  // Create a line with spaces and the chord at the right position
  const spacesBefore = ' '.repeat(position);
  const spacesAfter = ' '.repeat(
    Math.max(0, lineLength - position - chord.length),
  );
  return `${spacesBefore}[${chord}]${spacesAfter}`;
};

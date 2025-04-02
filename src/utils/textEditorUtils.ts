import { LyricsSection } from '@src/components/common/enums';

export const insertAtCursor = (
  text: string,
  selection: { start: number; end: number },
  prefix: string,
  suffix: string = '',
  wrapCurrentWord: boolean = false,
): string => {
  const { start, end } = selection;

  if (start !== end || !wrapCurrentWord) {
    return (
      text.slice(0, start) +
      prefix +
      text.slice(start, end) +
      suffix +
      text.slice(end)
    );
  }

  const wordStart = findWordStart(text, start);
  const wordEnd = findWordEnd(text, start);

  if (wordStart === wordEnd) {
    return text.slice(0, start) + prefix + suffix + text.slice(start);
  }

  return (
    text.slice(0, wordStart) +
    prefix +
    text.slice(wordStart, wordEnd) +
    suffix +
    text.slice(wordEnd)
  );
};

export const insertSectionAtCursor = (
  text: string,
  start: number,
  section: LyricsSection,
): { text: string; cursorPosition: number } => {
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
  const positionInLine = start - charCount;
  const isAtEndOfLine =
    currentLine.length && positionInLine >= currentLine.length;
  const hasEmptyLineBefore =
    currentLineIndex > 0 && lines[currentLineIndex - 1].trim() === '';
  const shouldSkipExtraLine = hasEmptyLineBefore;

  let sectionLineIndex = currentLineIndex;
  let cursorPosition = start;

  if (isAtEndOfLine) {
    if (shouldSkipExtraLine) {
      lines.splice(currentLineIndex + 1, 0, section);
      sectionLineIndex = currentLineIndex + 1;
      cursorPosition = charCount + currentLine.length + 1 + section.length + 1;
    } else {
      lines.splice(currentLineIndex + 1, 0, '', section);
      sectionLineIndex = currentLineIndex + 2;
      cursorPosition =
        charCount + currentLine.length + 1 + 1 + section.length + 1;
    }
  } else if (currentLine.trim().length > 0) {
    lines.splice(currentLineIndex, 0, section);
    sectionLineIndex = currentLineIndex;
    cursorPosition = charCount + section.length + 1;
  } else {
    lines[currentLineIndex] = section;
    sectionLineIndex = currentLineIndex;
    cursorPosition = charCount + section.length + 1;
  }

  const isLastLine = sectionLineIndex === lines.length - 1;
  if (isLastLine) {
    lines.push('');
    cursorPosition += section.length + 1;
  }

  return {
    text: lines.join('\n'),
    cursorPosition: cursorPosition,
  };
};

export const insertChord = (
  text: string,
  chord: string,
  selection: { start: number; end: number },
): string => {
  const { start } = selection;
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
  const positionInLine = start - charCount;

  const isEmpty = currentLine.trim().length === 0;
  const isChordOnly = isChordLine(currentLine) && !hasLyrics(currentLine);

  if (isEmpty || isChordOnly) {
    lines[currentLineIndex] = insertIntoChordLine(
      currentLine,
      chord,
      positionInLine,
    );

    return lines.join('\n');
  }

  const insertionPoint = findWordStart(currentLine, positionInLine);

  if (currentLineIndex > 0 && isChordLine(lines[currentLineIndex - 1])) {
    lines[currentLineIndex - 1] = updateChordLine(
      lines[currentLineIndex - 1],
      chord,
      insertionPoint,
    );
  } else {
    lines.splice(currentLineIndex, 0, createChordLine(chord, insertionPoint));
  }

  return lines.join('\n');
};

const hasLyrics = (line: string): boolean => {
  return /[a-zA-Z]/.test(line.replace(/\{.*?\}/g, ''));
};

const insertIntoChordLine = (
  line: string,
  chord: string,
  position: number,
): string => {
  const chordText = `{${chord}}`;
  const newLine = [...line];

  while (newLine.length <= position + chordText.length - 1) {
    newLine.push(' ');
  }

  newLine.splice(position, chordText.length, ...chordText.split(''));
  return newLine.join('');
};

const updateChordLine = (
  chordLine: string,
  newChord: string,
  position: number,
): string => {
  const chordText = `{${newChord}}`;

  const chordPositions: { start: number; end: number }[] = [];
  const chordRegex = /\{[^}]*\}/g;
  let match;

  while ((match = chordRegex.exec(chordLine)) !== null) {
    chordPositions.push({
      start: match.index,
      end: match.index + match[0].length - 1,
    });
  }

  let adjustedPosition = position;
  for (const chord of chordPositions) {
    if (position >= chord.start && position <= chord.end + 1) {
      adjustedPosition = chord.end + 1;
      break;
    }
  }

  const chordLineChars = [...chordLine];

  while (chordLineChars.length <= adjustedPosition + chordText.length - 1) {
    chordLineChars.push(' ');
  }

  let availableSpace = 0;
  for (let i = adjustedPosition; i < chordLineChars.length; i++) {
    if (chordLineChars[i] !== ' ') break;
    availableSpace++;
  }

  const whitespaceToRemove = Math.min(chordText.length, availableSpace);
  chordLineChars.splice(
    adjustedPosition,
    whitespaceToRemove,
    ...chordText.split(''),
  );

  return chordLineChars.join('');
};

export const isChordLine = (line: string): boolean =>
  line.trim().startsWith('{');

const createChordLine = (chord: string, position: number): string => {
  return ' '.repeat(position) + `{${chord}}`;
};

export const convertGerundToIn = (
  text: string,
  cursorPosition: number,
): { text: string; newCursorPosition: number } => {
  const wordStart = findWordStart(text, cursorPosition);
  const wordEnd = findWordEnd(text, cursorPosition);
  const word = text.slice(wordStart, wordEnd);

  if (!word.toLowerCase().endsWith('ing')) {
    return { text, newCursorPosition: cursorPosition };
  }

  const newWord = word.slice(0, -3) + "in'";
  const newText = text.slice(0, wordStart) + newWord + text.slice(wordEnd);

  return {
    text: newText,
    newCursorPosition: wordStart + newWord.length,
  };
};

const findWordStart = (text: string, pos: number): number => {
  if (pos <= 0) return 0;

  let start = pos - 1;
  while (start >= 0 && !/[\s-]/.test(text[start])) {
    start--;
  }
  return start + 1;
};

const findWordEnd = (text: string, pos: number): number => {
  if (pos >= text.length) return text.length;

  let end = pos;
  while (end < text.length && !/[\s-]/.test(text[end])) {
    end++;
  }
  return end;
};

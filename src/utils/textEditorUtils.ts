import { LyricsSection } from '@src/components/common/enums';

export const insertAtCursor = (
  text: string,
  selection: { start: number; end: number } | null = null,
  prefix: string,
  suffix: string = '',
): string => {
  const { start, end } = selection;

  if (start !== end) {
    return (
      text.slice(0, start) +
      prefix +
      text.slice(start, end) +
      suffix +
      text.slice(end)
    );
  } else {
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
    lines.splice(currentLineIndex, 0, `${section}`);
  } else {
    lines[currentLineIndex] = `${section}`;
  }

  return lines.join('\n');
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

  const insertionPoint = getChordInsertPosition(currentLine, positionInLine);

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

const getChordInsertPosition = (line: string, position: number): number => {
  if (position <= 0 || position >= line.length) return position;

  if (isWordBoundary(line, position)) {
    return position;
  }

  let wordStart = position;
  while (wordStart > 0 && !isWordBoundary(line, wordStart)) {
    wordStart--;
  }
  return wordStart;
};

const updateChordLine = (
  chordLine: string,
  newChord: string,
  position: number,
): string => {
  const chordText = `{${newChord}}`;
  const chordLength = chordText.length;
  const chordLineChars = [...chordLine];

  while (chordLineChars.length <= position + chordLength - 1) {
    chordLineChars.push(' ');
  }

  let availableSpace = 0;
  for (let i = position; i < chordLineChars.length; i++) {
    if (chordLineChars[i] !== ' ') break;
    availableSpace++;
  }

  const whitespaceToRemove = Math.min(chordLength, availableSpace);
  chordLineChars.splice(position, whitespaceToRemove, ...chordText.split(''));

  return chordLineChars.join('');
};

export const isChordLine = (line: string): boolean =>
  line.trim().startsWith('{');

const createChordLine = (chord: string, position: number): string => {
  return ' '.repeat(position) + `{${chord}}`;
};

const isWordBoundary = (text: string, pos: number): boolean => {
  if (pos === 0 || pos === text.length) return true;
  if (text[pos] === '-' || text[pos - 1] === '-') return true;

  const prevIsWord = /[\w']/.test(text[pos - 1]);
  const currentIsWord = /[\w']/.test(text[pos]);

  return prevIsWord !== currentIsWord;
};

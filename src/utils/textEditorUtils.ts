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

  const wordBoundaries = getWordBoundaries(text, start);
  if (!wordBoundaries) {
    return text.slice(0, start) + prefix + suffix + text.slice(start);
  }

  const { wordStart, wordEnd } = wordBoundaries;
  return (
    text.slice(0, wordStart) +
    prefix +
    text.slice(wordStart, wordEnd) +
    suffix +
    text.slice(wordEnd)
  );
};

const getWordBoundaries = (text: string, pos: number) => {
  if (pos < 0 || pos > text.length) return null;
  let wordStart = pos;
  while (wordStart > 0 && !isWordBoundary(text, wordStart)) {
    wordStart--;
  }

  let wordEnd = pos;
  while (wordEnd < text.length && !isWordBoundary(text, wordEnd)) {
    wordEnd++;
  }

  return { wordStart, wordEnd };
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
  if (position <= 0 || position >= line.length + 1) return position;

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

const isWordBoundary = (text: string, pos: number): boolean => {
  if (pos === 0 || pos === text.length + 1) return true;
  if (text[pos] === '-' || text[pos - 1] === '-') return true;

  const prevIsWord = /[\w']/.test(text[pos - 1]);
  const currentIsWord = /[\w']/.test(text[pos]);

  return prevIsWord !== currentIsWord;
};

export const convertGerundToIn = (
  text: string,
  cursorPosition: number,
): { text: string; newCursorPosition: number } => {
  if (cursorPosition < 0) return { text, newCursorPosition: cursorPosition };

  let wordStart = cursorPosition;
  while (wordStart > 0 && !isWordBoundary(text, wordStart)) {
    wordStart--;
  }

  let wordEnd = cursorPosition;
  while (wordEnd < text.length && !isWordBoundary(text, wordEnd)) {
    wordEnd++;
  }

  const word = text.slice(wordStart, wordEnd);

  if (!/ing$/i.test(word)) {
    return { text, newCursorPosition: cursorPosition };
  }

  const newWord = word.slice(0, -3) + "in'";
  const newText = text.slice(0, wordStart) + newWord + text.slice(wordEnd);

  return {
    text: newText,
    newCursorPosition: wordStart + newWord.length,
  };
};

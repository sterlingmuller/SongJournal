import { isChordLine } from './textEditorUtils';

export const convertToHtml = (markdownText: string): string => {
  if (!markdownText) return '';

  const lines = markdownText.split('\n');
  let htmlOutput = '';
  let isFirstLine = true;

  for (const line of lines) {
    if (!line.trim()) {
      htmlOutput += '<div class="gap-line">&nbsp;</div>';
      isFirstLine = false;
      continue;
    }

    if (/^\[.*\]$/.test(line.trim())) {
      const sectionClass = isFirstLine ? 'first-section' : 'section';
      htmlOutput += `<div class="${sectionClass}"><strong>${line}</strong></div>`;
      isFirstLine = false;
      continue;
    }

    if (isChordLine(line)) {
      let chordHtml = '';
      let lastIndex = 0;

      const chordRegex = /\{(.*?)\}/g;
      let match;

      while ((match = chordRegex.exec(line)) !== null) {
        chordHtml += line.slice(lastIndex, match.index);

        const chordLength = match[0].length;
        const replacementLength = match[1].length;

        const nextChar = line.charAt(match.index + match[0].length);
        const isAdjacentToNextChord = nextChar === '{';

        const spacesNeeded = isAdjacentToNextChord
          ? 1
          : chordLength - replacementLength;

        chordHtml += `<span class="chord">${match[1]}</span>${' '.repeat(spacesNeeded)}`;

        lastIndex = match.index + match[0].length;
      }

      chordHtml += line.slice(lastIndex);

      htmlOutput += `<span class="chord-line">${chordHtml}</span>`;
      isFirstLine = false;

      continue;
    }
    const formattedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');

    htmlOutput += `<div class="lyric-line">${formattedLine}</div>`;
  }

  return htmlOutput;
};

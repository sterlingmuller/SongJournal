import { isChordLine } from './textEditorUtils';

export const convertToHtml = (markdownText: string): string => {
  if (!markdownText) return '';

  const lines = markdownText.split('\n');
  let htmlOutput = '';

  for (const line of lines) {
    if (!line.trim()) {
      htmlOutput += '<p>&nbsp;</p>';
      continue;
    }

    if (/^\[.*\]$/.test(line.trim())) {
      htmlOutput += `<div class="section"><strong>${line}</strong></div>`;
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

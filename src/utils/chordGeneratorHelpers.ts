export const getSelectionPosition = (text: string, start: number) => {
  let i = 0;
  let textPosition = 0;
  let currentLine = 0;
  let lastPTagIndex = -1;

  while (i < start && textPosition < text.length) {
    if (
      text.startsWith('<p>', textPosition) ||
      text.startsWith('</p>', textPosition)
    ) {
      i++;
      if (text.startsWith('<p>', textPosition)) {
        currentLine++;
        lastPTagIndex = textPosition;
      }
      textPosition += text.startsWith('<p>', textPosition) ? 3 : 4;
    } else if (text[textPosition] === '<') {
      const tagEnd = text.indexOf('>', textPosition);
      textPosition = tagEnd + 1;
    } else {
      i++;
      textPosition++;
    }
  }

  let charIndex = 0;
  if (lastPTagIndex !== -1) {
    for (let i = lastPTagIndex + 3; i < textPosition; i++) {
      if (text[i] === '<') {
        const tagEnd = text.indexOf('>', i);
        i = tagEnd;
      } else {
        charIndex++;
      }
    }
  }
  // console.log('currentLine:', currentLine - 1);
  // console.log('charIndex:', charIndex);
  return {
    currentLine: currentLine - 1,
    charIndex,
  };
};

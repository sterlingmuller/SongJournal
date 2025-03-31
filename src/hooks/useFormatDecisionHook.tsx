import { useState, useEffect } from 'react';

export const useFormatDetection = (
  text: string,
  selection: { start: number; end: number },
) => {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    if (selection.start !== selection.end) {
      const selectedText = text.substring(selection.start, selection.end);
      setActiveFormats({
        bold: selectedText.startsWith('**') && selectedText.endsWith('**'),
        italic: selectedText.startsWith('*') && selectedText.endsWith('*'),
        underline:
          selectedText.startsWith('<u>') && selectedText.endsWith('</u>'),
      });
    }
  }, [selection, text]);

  return activeFormats;
};

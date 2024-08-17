import { CHORD_EXTENSIONS, ROOT_NOTES } from '@src/components/common/constants';
import { SelectEntry } from '@src/components/common/types';

const separateChordValue = (chord: string) => {
  if (!chord) {
    return { rootNote: '', chordExtension: '' };
  }

  const sortedRootNotes = ROOT_NOTES.slice(1).sort(
    (a: SelectEntry, b: SelectEntry) => b.value.length - a.value.length,
  );

  const matchedRoot = sortedRootNotes.find((root: SelectEntry) =>
    chord.startsWith(root.value),
  );

  if (!matchedRoot) {
    return { rootNote: '', chordExtension: '' };
  }

  const rootNote = matchedRoot.value;
  const remainingValue = chord.slice(rootNote.length);

  const matchedExtension = CHORD_EXTENSIONS.find(
    (ext: SelectEntry) => remainingValue === ext.value,
  );

  return {
    rootNote,
    chordExtension: matchedExtension ? matchedExtension.value : '',
  };
};

export default separateChordValue;

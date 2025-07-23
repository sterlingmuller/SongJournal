const normalizeName = (name: string): string => {
  return name.replace(/^The\s+/i, '');
};

export const compareArtistNames = (a: string, b: string): number => {
  const nameA = normalizeName(a);
  const nameB = normalizeName(b);
  return nameA.localeCompare(nameB);
};

export const isTextEmpty = (text: string): boolean => {
  if (!text) return true;

  const strippedContent = text.replace(/<[^>]*>/g, '').trim();

  return !strippedContent.length;
};

export const convertToSnakeCase = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '_');
};

export const sanitizeInput = (userInput: string) => {
  let sanitizedInput = userInput.trim();
  sanitizedInput = sanitizedInput.replace(/\s+/g, ' ');

  return sanitizedInput;
};

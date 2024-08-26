export const getColorWithOpacity = (color: string, opacity: number) => {
  const alpha = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${color}${alpha}`;
};

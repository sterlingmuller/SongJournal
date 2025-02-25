const formatDuration = (seconds: number | null) => {
  if (seconds === null) return '-- : --';
  const totalSeconds = Math.round(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes.toString().padStart(1, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default formatDuration;

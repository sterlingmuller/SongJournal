const formatDuration = (seconds: number) => {
  if (seconds === null) return '-- : --';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes.toString().padStart(1, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default formatDuration;

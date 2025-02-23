const formatDuration = (seconds: number | null) => {
  if (seconds === null) return '-- : --';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  console.log('remainingSeconds:', remainingSeconds);

  return `${minutes.toString().padStart(1, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default formatDuration;

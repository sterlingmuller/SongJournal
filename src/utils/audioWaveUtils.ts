import {
  WAVE_BAR_TOTAL_WIDTH,
  WAVE_CONTAINER_WIDTH,
} from '@src/components/common/constants';

export const downsampleWaveData = (
  waveData: number[],
  targetLength: number,
): number[] => {
  if (waveData.length <= targetLength) {
    return waveData;
  }

  const result: number[] = [];
  const ratio = waveData.length / targetLength;

  for (let i = 0; i < targetLength; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.floor((i + 1) * ratio);
    const slice = waveData.slice(start, end);
    const avg = slice.reduce((sum, val) => sum + val, 0) / slice.length;
    result.push(avg);
  }

  return result;
};

export const getVisibleRange = (
  panX: number,
  waveformWidth: number,
): { start: number; end: number } => {
  'worklet';
  //   containerWidth: number = WAVE_CONTAINER_WIDTH,
  // barWidth: number = WAVE_BAR_TOTAL_WIDTH,

  const visibleStart = Math.max(0, Math.floor(-panX / WAVE_BAR_TOTAL_WIDTH));
  const visibleEnd = Math.min(
    Math.ceil(waveformWidth / WAVE_BAR_TOTAL_WIDTH),
    Math.floor((-panX + WAVE_CONTAINER_WIDTH) / WAVE_BAR_TOTAL_WIDTH),
  );
  return { start: visibleStart, end: visibleEnd };
};

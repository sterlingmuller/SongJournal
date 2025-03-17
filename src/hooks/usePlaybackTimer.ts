import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

const usePlaybackTimer = (
  soundRef: React.MutableRefObject<Audio.Sound | null>,
  isPlaying: boolean,
  onUpdate?: (currentTime: number) => void,
): number | null => {
  const [time, setTime] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateTime = async () => {
      try {
        if (soundRef.current) {
          const status = await soundRef.current.getStatusAsync();
          if (status.isLoaded) {
            const currentTime = status.positionMillis / 1000;
            if (onUpdate) {
              onUpdate(currentTime);
            } else {
              setTime(currentTime);
            }
          }
        }
      } catch (error) {
        console.error('Error getting sound status:', error);
      }
    };

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (soundRef.current) {
      updateTime();
    }

    if (isPlaying && soundRef.current) {
      intervalRef.current = setInterval(updateTime, 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [soundRef, isPlaying, onUpdate]);

  useEffect(() => {
    if (!soundRef.current) {
      if (onUpdate) {
        onUpdate(0);
      } else {
        setTime(null);
      }
    }
  }, [soundRef.current, onUpdate]);

  return onUpdate ? null : time;
};

export default usePlaybackTimer;

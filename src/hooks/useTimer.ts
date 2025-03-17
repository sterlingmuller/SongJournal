import { useState, useRef, useCallback, useEffect } from 'react';

interface TimerHookReturn {
  duration: number;
  startTimer: () => void;
  resetTimer: () => void;
}

const useTimer = (): TimerHookReturn => {
  const [duration, setDuration] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDuration((prev: number) => {
        return prev + 1;
      });
    }, 1000);
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDuration(0);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    duration,
    startTimer,
    resetTimer,
  };
};

export default useTimer;

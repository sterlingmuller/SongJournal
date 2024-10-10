import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerOptions {
  startTime?: number;
  maxTime?: number;
}

export function useTimer({
  startTime = 0,
  maxTime = Infinity,
}: TimerOptions = {}) {
  const [time, setTime] = useState(startTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);
  const requestRef = useRef<number>();

  const startTimer = useCallback((setCurrentTime?: (time: number) => void) => {
    setIsTimerRunning(true);
    startTimeRef.current = Date.now() - pausedTimeRef.current * 1000;
    if (setCurrentTime) setCurrentTime(pausedTimeRef.current);
  }, []);

  const pauseTimer = useCallback(
    (setCurrentTime?: (time: number) => void) => {
      setIsTimerRunning(false);
      pausedTimeRef.current = Math.min(
        (Date.now() - startTimeRef.current) / 1000,
        maxTime,
      );
      if (setCurrentTime) setCurrentTime(pausedTimeRef.current);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
    },
    [maxTime],
  );

  const clearTimer = useCallback(
    (setCurrentTime?: (time: number) => void) => {
      setIsTimerRunning(false);
      setTime(startTime);
      pausedTimeRef.current = startTime;
      if (setCurrentTime) setCurrentTime(startTime);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
    },
    [startTime],
  );

  const setCurrentTime = useCallback(
    (newTime: number, setContextCurrentTime?: (time: number) => void) => {
      const clampedTime = Math.min(Math.max(newTime, 0), maxTime);
      setTime(clampedTime);
      pausedTimeRef.current = clampedTime;
      if (setContextCurrentTime) setContextCurrentTime(clampedTime);
      if (isTimerRunning) {
        startTimeRef.current = Date.now() - clampedTime * 1000;
      }
    },
    [isTimerRunning, maxTime],
  );

  useEffect(() => {
    if (!isTimerRunning) return;

    const updateTimer = () => {
      const now = Date.now();
      const newTime = Math.min((now - startTimeRef.current) / 1000, maxTime);
      setTime(newTime);

      if (newTime < maxTime) {
        requestRef.current = requestAnimationFrame(updateTimer);
      } else {
        setIsTimerRunning(false);
      }
    };

    requestRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isTimerRunning, maxTime]);

  return {
    time,
    isTimerRunning,
    startTimer,
    pauseTimer,
    clearTimer,
    setCurrentTime,
  };
}

import { useRef, useCallback, useEffect } from 'react';

const useDebounce = <T extends unknown[]>(
  callbackFn: (...args: T) => void,
  delay: number = 300
) => {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        callbackFn(...args);
      }, delay);
    },
    [callbackFn, delay]
  );

  useEffect(() => {
    return () => clearTimeout(debounceTimerRef.current);
  }, []);

  return debouncedCallback;
};

export default useDebounce;

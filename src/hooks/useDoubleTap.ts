import { useState } from 'react';

const useDoubleTap = (callback: () => void, delay: number = 400) => {
  const [lastTap, setLastTap] = useState<number>(0);

  const handleDoubleTap = () => {
    const now: number = Date.now();
    if (lastTap && now - lastTap < delay) {
      callback();
    }
    setLastTap(now);
  };

  return handleDoubleTap;
};

export default useDoubleTap;

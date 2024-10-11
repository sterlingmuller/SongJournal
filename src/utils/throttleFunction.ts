const throttleFunction = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number = 100,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default throttleFunction;

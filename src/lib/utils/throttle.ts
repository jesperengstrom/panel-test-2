export function throttle(callback: Function, limit: number) {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any;

  return function (...args: any[]) {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      callback(...args);
    } else {
      clearTimeout(timeout!);
      lastArgs = args;
      timeout = setTimeout(() => {
        lastCall = Date.now();
        callback(...lastArgs);
      }, limit - (now - lastCall));
    }
  };
};
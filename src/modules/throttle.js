
export default function throttle(func, delay) {
  let lastCall = 0;

  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  }
}
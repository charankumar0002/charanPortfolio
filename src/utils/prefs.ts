// Utility helpers for environment and user preference checks

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const hasFinePointer = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(pointer: fine)').matches;
};

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    (navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 0)
  );
};

export const isMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const shouldDisableHeavyEffects = (): boolean => {
  return isReducedMotion() || isTouchDevice() || isMobileViewport();
};

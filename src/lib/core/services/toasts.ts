import { toast, type SvelteToastOptions } from '@zerodevx/svelte-toast';

const DEFAULT_DURATION = 3000;
const IS_DISMISSABLE = true;
const IS_PAUSABLE = true;

export const info = (message: string, options?: SvelteToastOptions) =>
  toast.push(message, {
    duration: DEFAULT_DURATION,
    pausable: IS_PAUSABLE,
    dismissable: IS_DISMISSABLE,

    ...options
  });

export const success = (message: string, options?: SvelteToastOptions) =>
  toast.push(message, {
    theme: {
      '--toastBackground': '#16a34a',
      '--toastColor': 'white',
      '--toastBarBackground': '#14532d'
    },
    duration: DEFAULT_DURATION,
    pausable: IS_PAUSABLE,
    dismissable: IS_DISMISSABLE,
    ...options
  });

export const warning = (message: string, options?: SvelteToastOptions) =>
  toast.push(message, {
    theme: {
      '--toastBackground': '#f97316',
      '--toastColor': 'white',
      '--toastBarBackground': '#7c2d12'
    },
    duration: DEFAULT_DURATION,
    pausable: IS_PAUSABLE,
    dismissable: IS_DISMISSABLE,
    ...options
  });

export const failure = (message: string, options?: SvelteToastOptions) =>
  toast.push(message, {
    theme: {
      '--toastBackground': '#e11d48',
      '--toastColor': 'white',
      '--toastBarBackground': '#881337'
    },
    duration: DEFAULT_DURATION,
    pausable: IS_PAUSABLE,
    dismissable: IS_DISMISSABLE,
    ...options
  });

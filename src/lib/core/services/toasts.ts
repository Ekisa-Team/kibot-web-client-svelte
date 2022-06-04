import { toast, type SvelteToastOptions } from '@zerodevx/svelte-toast';

export const info = (message: string, options?: SvelteToastOptions) => toast.push(message, options);

export const success = (message: string, options?: SvelteToastOptions) =>
  toast.push(message, {
    theme: {
      '--toastBackground': '#16a34a',
      '--toastColor': 'white',
      '--toastBarBackground': '#14532d'
    },
    ...options
  });

export const warning = (message: string, options?: SvelteToastOptions) =>
  toast.push(message, {
    theme: {
      '--toastBackground': '#f97316',
      '--toastColor': 'white',
      '--toastBarBackground': '#7c2d12'
    },
    ...options
  });

export const failure = (message: string, options?: SvelteToastOptions) =>
  toast.push(message, {
    theme: {
      '--toastBackground': '#e11d48',
      '--toastColor': 'white',
      '--toastBarBackground': '#881337'
    },
    ...options
  });

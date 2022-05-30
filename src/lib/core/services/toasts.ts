import { toast } from '@zerodevx/svelte-toast';

export const info = (message: string) => toast.push(message);

export const success = (message: string) =>
  toast.push(message, {
    theme: {
      '--toastBackground': 'green',
      '--toastColor': 'white',
      '--toastBarBackground': 'olive'
    }
  });

export const warning = (message: string) =>
  toast.push(message, {
    theme: {
      '--toastBackground': 'green',
      '--toastColor': 'white',
      '--toastBarBackground': 'olive'
    }
  });

export const failure = (message: string) =>
  toast.push(message, {
    theme: {
      '--toastBackground': 'green',
      '--toastColor': 'white',
      '--toastBarBackground': 'olive'
    }
  });

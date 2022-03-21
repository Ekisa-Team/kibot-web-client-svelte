import { browser } from '$app/env';
import { Theme } from '$lib/enums/theme';
import { getTheme } from '$lib/services/theme';
import { writable } from 'svelte/store';

const initialValue = (browser && getTheme()) || Theme.System;

const appTheme = writable(initialValue);

export { appTheme };

import { browser } from '$app/env';
import { getTheme } from '$lib/core/services/theme';
import { Theme } from '$lib/enums/theme';
import { writable } from 'svelte/store';

const initialValue = (browser && getTheme()) || Theme.System;

const appTheme = writable(initialValue);

export { appTheme };

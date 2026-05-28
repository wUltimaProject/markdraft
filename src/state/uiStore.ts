import { createStore } from 'solid-js/store';
import type { Theme } from '../lib/themeService';

interface UiState {
  theme: Theme;
  splitPosition: number;
}

const SPLIT_STORAGE_KEY = 'md_viewer_split';
const DEFAULT_SPLIT = 50;

function clampSplit(value: number): number {
  return Math.max(20, Math.min(80, value));
}

const storedSplit = localStorage.getItem(SPLIT_STORAGE_KEY);
const initialSplit = storedSplit ? clampSplit(Number(storedSplit)) : DEFAULT_SPLIT;

const [state, setState] = createStore<UiState>({
  theme: 'dark',
  splitPosition: initialSplit,
});

export const uiStore = {
  get theme() { return state.theme; },
  get splitPosition() { return state.splitPosition; },

  setTheme(theme: Theme) {
    setState({ theme });
  },

  setSplitPosition(position: number) {
    const clamped = clampSplit(position);
    setState({ splitPosition: clamped });
    localStorage.setItem(SPLIT_STORAGE_KEY, String(clamped));
  },
};

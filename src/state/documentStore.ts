import { createStore } from 'solid-js/store';

interface DocumentState {
  content: string;
  filePath: string | null;
  isDirty: boolean;
}

const [state, setState] = createStore<DocumentState>({
  content: '',
  filePath: null,
  isDirty: false,
});

export const documentStore = {
  get content() { return state.content; },
  get filePath() { return state.filePath; },
  get isDirty() { return state.isDirty; },

  setContent(value: string) {
    setState({ content: value, isDirty: true });
  },

  setFilePath(path: string) {
    setState({ filePath: path });
  },

  markClean() {
    setState({ isDirty: false });
  },

  reset() {
    setState({ content: '', filePath: null, isDirty: false });
  },
};

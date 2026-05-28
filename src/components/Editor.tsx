import { type Component, onMount, onCleanup, createEffect } from 'solid-js';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, drawSelection, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { editorService } from '../lib/editorService';

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

function buildTheme(isDark: boolean) {
  return isDark ? oneDark : EditorView.theme({
    '&': { background: '#eff1f5', color: '#4c4f69' },
    '.cm-content': { caretColor: '#1e66f5' },
    '.cm-cursor': { borderLeftColor: '#1e66f5' },
    '.cm-activeLine': { backgroundColor: '#e6e9ef' },
    '.cm-gutters': { background: '#eff1f5', borderRight: '1px solid #ccd0da', color: '#8c8fa1' },
    '.cm-selectionBackground, ::selection': { background: '#acb0be !important' },
  });
}

export const Editor: Component<EditorProps> = props => {
  let containerRef: HTMLDivElement | undefined;
  let view: EditorView | undefined;
  let ignoreNextChange = false;

  onMount(() => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    const updateListener = EditorView.updateListener.of(update => {
      if (update.docChanged && !ignoreNextChange) {
        props.onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: props.content,
      extensions: [
        history(),
        drawSelection(),
        highlightActiveLine(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        buildTheme(isDark),
        EditorView.lineWrapping,
        updateListener,
        EditorView.theme({
          '&': { height: '100%', fontSize: '14px', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
          '.cm-scroller': { overflow: 'auto', lineHeight: '1.7' },
          '.cm-content': { padding: '1.5rem', minHeight: '100%' },
        }),
      ],
    });

    view = new EditorView({ state, parent: containerRef! });
    editorService.setView(view);

    onCleanup(() => {
      editorService.setView(null);
      view?.destroy();
      view = undefined;
    });
  });

  // Sync external content changes (file open, new file) without triggering onChange
  createEffect(() => {
    const content = props.content;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== content) {
      ignoreNextChange = true;
      view.dispatch({
        changes: { from: 0, to: current.length, insert: content },
      });
      ignoreNextChange = false;
    }
  });

  return (
    <div class="editor-pane">
      <div ref={containerRef} class="editor-codemirror" />
    </div>
  );
};

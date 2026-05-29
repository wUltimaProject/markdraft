import type { EditorView } from '@codemirror/view';
import { EditorSelection } from '@codemirror/state';

let view: EditorView | null = null;

export const editorService = {
  setView(v: EditorView | null) { view = v; },

  wrapSelection(before: string, after: string) {
    if (!view) return;
    view.focus();
    const { state } = view;
    const changes = state.changeByRange(range => {
      if (range.empty) {
        const placeholder = 'text';
        const from = range.from;
        return {
          changes: { from, insert: before + placeholder + after },
          range: EditorSelection.range(from + before.length, from + before.length + placeholder.length),
        };
      }
      const selected = state.sliceDoc(range.from, range.to);
      if (selected.startsWith(before) && selected.endsWith(after)) {
        const inner = selected.slice(before.length, selected.length - after.length);
        return {
          changes: { from: range.from, to: range.to, insert: inner },
          range: EditorSelection.range(range.from, range.from + inner.length),
        };
      }
      return {
        changes: { from: range.from, to: range.to, insert: before + selected + after },
        range: EditorSelection.range(range.from, range.from + before.length + selected.length + after.length),
      };
    });
    view.dispatch(view.state.update(changes, { scrollIntoView: true, userEvent: 'input' }));
  },

  toggleLinePrefix(prefix: string) {
    if (!view) return;
    view.focus();
    const { state } = view;
    const changes = state.changeByRange(range => {
      const line = state.doc.lineAt(range.from);
      if (line.text.startsWith(prefix)) {
        const delta = -prefix.length;
        return {
          changes: { from: line.from, to: line.from + prefix.length, insert: '' },
          range: EditorSelection.range(
            Math.max(line.from, range.from + delta),
            Math.max(line.from, range.to + delta),
          ),
        };
      }
      return {
        changes: { from: line.from, insert: prefix },
        range: EditorSelection.range(range.from + prefix.length, range.to + prefix.length),
      };
    });
    view.dispatch(view.state.update(changes, { scrollIntoView: true, userEvent: 'input' }));
  },

  toggleHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    if (!view) return;
    view.focus();
    const prefix = '#'.repeat(level) + ' ';
    const { state } = view;
    const changes = state.changeByRange(range => {
      const line = state.doc.lineAt(range.from);
      const stripped = line.text.replace(/^#{1,6} /, '');
      const alreadyThis = line.text === prefix + stripped;
      const newText = alreadyThis ? stripped : prefix + stripped;
      const delta = newText.length - line.text.length;
      return {
        changes: { from: line.from, to: line.to, insert: newText },
        range: EditorSelection.range(range.from + delta, range.to + delta),
      };
    });
    view.dispatch(view.state.update(changes, { scrollIntoView: true, userEvent: 'input' }));
  },

  insertLink() {
    if (!view) return;
    view.focus();
    const { state } = view;
    const range = state.selection.main;
    const selected = state.sliceDoc(range.from, range.to);
    const text = selected || 'link text';
    const insert = `[${text}](url)`;
    const urlStart = range.from + text.length + 3;
    view.dispatch(state.update({
      changes: { from: range.from, to: range.to, insert },
      selection: EditorSelection.range(urlStart, urlStart + 3),
      scrollIntoView: true,
      userEvent: 'input',
    }));
  },

  insertCodeBlock() {
    if (!view) return;
    view.focus();
    const { state } = view;
    const range = state.selection.main;
    const selected = state.sliceDoc(range.from, range.to);
    const insert = '```\n' + (selected || '') + '\n```';
    view.dispatch(state.update({
      changes: { from: range.from, to: range.to, insert },
      selection: EditorSelection.range(range.from + 4, range.from + 4 + (selected || '').length),
      scrollIntoView: true,
      userEvent: 'input',
    }));
  },
};

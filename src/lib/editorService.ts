import type { EditorView } from '@codemirror/view';

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
        return {
          changes: { from: range.from, insert: before + placeholder + after },
          range: { anchor: range.from + before.length, head: range.from + before.length + placeholder.length },
        };
      }
      const selected = state.sliceDoc(range.from, range.to);
      // toggle: if already wrapped, unwrap
      if (selected.startsWith(before) && selected.endsWith(after)) {
        const inner = selected.slice(before.length, selected.length - after.length);
        return {
          changes: { from: range.from, to: range.to, insert: inner },
          range: { anchor: range.from, head: range.from + inner.length },
        };
      }
      return {
        changes: { from: range.from, to: range.to, insert: before + selected + after },
        range: { anchor: range.from, head: range.from + before.length + selected.length + after.length },
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
        // remove prefix
        return {
          changes: { from: line.from, to: line.from + prefix.length, insert: '' },
          range: { anchor: Math.max(line.from, range.from - prefix.length), head: Math.max(line.from, range.to - prefix.length) },
        };
      }
      return {
        changes: { from: line.from, insert: prefix },
        range: { anchor: range.from + prefix.length, head: range.to + prefix.length },
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
      // strip any existing heading prefix
      const stripped = line.text.replace(/^#{1,6} /, '');
      const alreadyThis = line.text === prefix + stripped;
      const newText = alreadyThis ? stripped : prefix + stripped;
      const delta = newText.length - line.text.length;
      return {
        changes: { from: line.from, to: line.to, insert: newText },
        range: { anchor: range.from + delta, head: range.to + delta },
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
    const urlStart = range.from + text.length + 3; // position of 'url'
    view.dispatch(state.update({
      changes: { from: range.from, to: range.to, insert },
      selection: { anchor: urlStart, head: urlStart + 3 },
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
      selection: { anchor: range.from + 4, head: range.from + 4 + (selected || '').length },
      scrollIntoView: true,
      userEvent: 'input',
    }));
  },
};

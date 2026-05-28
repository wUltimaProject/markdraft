type ShortcutHandler = () => void;

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  handler: ShortcutHandler;
}

const shortcuts: Shortcut[] = [];

export function registerShortcut(shortcut: Shortcut): () => void {
  shortcuts.push(shortcut);
  return () => {
    const idx = shortcuts.indexOf(shortcut);
    if (idx !== -1) shortcuts.splice(idx, 1);
  };
}

export function initShortcuts(): () => void {
  const handler = (e: KeyboardEvent) => {
    const ctrl = e.ctrlKey || e.metaKey;
    for (const sc of shortcuts) {
      const ctrlMatch = sc.ctrl === undefined ? true : sc.ctrl === ctrl;
      const shiftMatch = sc.shift === undefined ? true : sc.shift === e.shiftKey;
      if (ctrlMatch && shiftMatch && e.key.toLowerCase() === sc.key.toLowerCase()) {
        e.preventDefault();
        sc.handler();
        return;
      }
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}

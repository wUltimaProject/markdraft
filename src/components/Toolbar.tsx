import { type Component, createSignal } from 'solid-js';
import { fileHandlers } from '../lib/fileHandlers';
import { editorService } from '../lib/editorService';
import { themeService } from '../lib/themeService';

const e = editorService;

const [isDark, setIsDark] = createSignal(true);

export const Toolbar: Component = () => {
  const toggleTheme = () => {
    const next = themeService.toggle();
    setIsDark(next === 'dark');
  };

  return (
  <div class="toolbar">
    <div class="toolbar-group">
      <button class="toolbar-btn" onClick={() => void fileHandlers.newFile()} title="New (Ctrl+N)">New</button>
      <button class="toolbar-btn" onClick={() => void fileHandlers.openFile()} title="Open (Ctrl+O)">Open</button>
      <button class="toolbar-btn" onClick={() => void fileHandlers.saveFile()} title="Save (Ctrl+S)">Save</button>
      <button class="toolbar-btn" onClick={() => void fileHandlers.saveFileAs()} title="Save As (Ctrl+Shift+S)">Save As</button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group">
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.wrapSelection('**', '**')} title="Bold (Ctrl+B)"><b>B</b></button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.wrapSelection('_', '_')} title="Italic (Ctrl+I)"><i>I</i></button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.wrapSelection('~~', '~~')} title="Strikethrough">S̶</button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.wrapSelection('`', '`')} title="Inline code"><code>`c`</code></button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group">
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.toggleHeading(1)} title="Heading 1">H1</button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.toggleHeading(2)} title="Heading 2">H2</button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.toggleHeading(3)} title="Heading 3">H3</button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group">
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.toggleLinePrefix('- ')} title="Bullet list">• List</button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.toggleLinePrefix('1. ')} title="Numbered list">1. List</button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.toggleLinePrefix('- [ ] ')} title="Task list">☐ Task</button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.toggleLinePrefix('> ')} title="Blockquote">❝ Quote</button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group">
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.insertLink()} title="Insert link">Link</button>
      <button class="toolbar-btn toolbar-btn--fmt" onClick={() => e.insertCodeBlock()} title="Code block">```</button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group" style={{ 'margin-left': 'auto' }}>
      <button class="toolbar-btn" onClick={toggleTheme} title="Toggle theme">
        {isDark() ? '☀ Light' : '☾ Dark'}
      </button>
    </div>
  </div>
  );
};

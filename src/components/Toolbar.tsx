import { type Component } from 'solid-js';
import { fileHandlers } from '../lib/fileHandlers';

export const Toolbar: Component = () => {
  return (
    <div class="toolbar">
      <div class="toolbar-group toolbar-group--file">
        <button class="toolbar-btn" onClick={() => void fileHandlers.newFile()} title="New (Ctrl+N)">New</button>
        <button class="toolbar-btn" onClick={() => void fileHandlers.openFile()} title="Open (Ctrl+O)">Open</button>
        <button class="toolbar-btn" onClick={() => void fileHandlers.saveFile()} title="Save (Ctrl+S)">Save</button>
        <button class="toolbar-btn" onClick={() => void fileHandlers.saveFileAs()} title="Save As (Ctrl+Shift+S)">Save As</button>
      </div>
    </div>
  );
};

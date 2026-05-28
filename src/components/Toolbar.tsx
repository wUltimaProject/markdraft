import { type Component } from 'solid-js';
import { fileService } from '../lib/fileService';
import { documentStore } from '../state/documentStore';

export const Toolbar: Component = () => {
  const handleNew = async () => {
    if (documentStore.isDirty) {
      const confirmed = confirm('Unsaved changes will be lost. Continue?');
      if (!confirmed) return;
    }
    documentStore.reset();
  };

  const handleOpen = async () => {
    if (documentStore.isDirty) {
      const confirmed = confirm('Unsaved changes will be lost. Continue?');
      if (!confirmed) return;
    }
    const result = await fileService.openFile();
    if (result) {
      documentStore.setContent(result.content);
      documentStore.setFilePath(result.path);
      documentStore.markClean();
    }
  };

  const handleSave = async () => {
    if (documentStore.filePath) {
      await fileService.writeFile(documentStore.filePath, documentStore.content);
      documentStore.markClean();
    } else {
      await handleSaveAs();
    }
  };

  const handleSaveAs = async () => {
    const path = await fileService.saveFileAs();
    if (path) {
      await fileService.writeFile(path, documentStore.content);
      documentStore.setFilePath(path);
      documentStore.markClean();
    }
  };

  return (
    <div class="toolbar">
      <div class="toolbar-group toolbar-group--file">
        <button class="toolbar-btn" onClick={handleNew} title="New (Ctrl+N)">New</button>
        <button class="toolbar-btn" onClick={handleOpen} title="Open (Ctrl+O)">Open</button>
        <button class="toolbar-btn" onClick={handleSave} title="Save (Ctrl+S)">Save</button>
        <button class="toolbar-btn" onClick={handleSaveAs} title="Save As (Ctrl+Shift+S)">Save As</button>
      </div>
    </div>
  );
};

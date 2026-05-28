import { documentStore } from '../state/documentStore';
import { fileService } from './fileService';

export const fileHandlers = {
  async newFile() {
    if (documentStore.isDirty && !confirm('Unsaved changes will be lost. Continue?')) return;
    documentStore.reset();
  },

  async openFile() {
    if (documentStore.isDirty && !confirm('Unsaved changes will be lost. Continue?')) return;
    const result = await fileService.openFile();
    if (result) {
      documentStore.setContent(result.content);
      documentStore.setFilePath(result.path);
      documentStore.markClean();
    }
  },

  async saveFile() {
    if (documentStore.filePath) {
      await fileService.writeFile(documentStore.filePath, documentStore.content);
      documentStore.markClean();
    } else {
      await fileHandlers.saveFileAs();
    }
  },

  async saveFileAs() {
    const path = await fileService.saveFileAs();
    if (path) {
      await fileService.writeFile(path, documentStore.content);
      documentStore.setFilePath(path);
      documentStore.markClean();
    }
  },
};

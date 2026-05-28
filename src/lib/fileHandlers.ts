import { documentStore } from '../state/documentStore';
import { fileService } from './fileService';
import { showUnsavedDialog } from '../components/UnsavedDialog';

async function confirmDiscardIfDirty(): Promise<boolean> {
  if (!documentStore.isDirty) return true;
  const choice = await showUnsavedDialog();
  if (choice === 'cancel') return false;
  if (choice === 'save') await fileHandlers.saveFile();
  return true;
}

export const fileHandlers = {
  async newFile() {
    if (!(await confirmDiscardIfDirty())) return;
    documentStore.reset();
  },

  async openFile() {
    if (!(await confirmDiscardIfDirty())) return;
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

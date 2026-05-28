import { ipc, type FileReadResult } from './ipc';

export const fileService = {
  async openFile(): Promise<FileReadResult | null> {
    const path = await ipc.openFileDialog();
    if (!path) return null;
    const content = await ipc.readFile(path);
    return { path, content };
  },

  async readFile(path: string): Promise<string> {
    return ipc.readFile(path);
  },

  async writeFile(path: string, content: string): Promise<void> {
    return ipc.writeFile(path, content);
  },

  async saveFileAs(suggestedName?: string): Promise<string | null> {
    return ipc.saveFileDialog(suggestedName);
  },
};

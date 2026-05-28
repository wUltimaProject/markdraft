import { invoke } from '@tauri-apps/api/core';

export interface FileReadResult {
  path: string;
  content: string;
}

export const ipc = {
  readFile: (path: string): Promise<string> => invoke('read_file', { path }),
  writeFile: (path: string, content: string): Promise<void> => invoke('write_file', { path, content }),
  openFileDialog: (): Promise<string | null> => invoke('open_file_dialog'),
  saveFileDialog: (suggestedName?: string): Promise<string | null> =>
    invoke('save_file_dialog', { suggestedName }),
};

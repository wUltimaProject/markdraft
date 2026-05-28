import { type Component, onMount, onCleanup } from 'solid-js';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { SplitPane } from './components/SplitPane';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import { UnsavedDialogRoot, showUnsavedDialog } from './components/UnsavedDialog';
import { documentStore } from './state/documentStore';
import { fileHandlers } from './lib/fileHandlers';
import { editorService } from './lib/editorService';
import { registerShortcut, initShortcuts } from './lib/shortcuts';
import { themeService } from './lib/themeService';

const closeApp = () => invoke('force_close');

const App: Component = () => {
  onMount(() => {
    themeService.init();

    registerShortcut({ key: 'n', ctrl: true, shift: false, handler: () => void fileHandlers.newFile() });
    registerShortcut({ key: 'o', ctrl: true, shift: false, handler: () => void fileHandlers.openFile() });
    registerShortcut({ key: 's', ctrl: true, shift: false, handler: () => void fileHandlers.saveFile() });
    registerShortcut({ key: 's', ctrl: true, shift: true,  handler: () => void fileHandlers.saveFileAs() });
    registerShortcut({ key: 'b', ctrl: true, shift: false, handler: () => editorService.wrapSelection('**', '**') });
    registerShortcut({ key: 'i', ctrl: true, shift: false, handler: () => editorService.wrapSelection('_', '_') });

    const cleanupShortcuts = initShortcuts();

    let unlistenClose: (() => void) | undefined;
    void listen<void>('close-requested', async () => {
      if (!documentStore.isDirty) {
        await closeApp();
        return;
      }
      const choice = await showUnsavedDialog();
      if (choice === 'cancel') return;
      if (choice === 'save') await fileHandlers.saveFile();
      await closeApp();
    }).then(fn => { unlistenClose = fn; });

    onCleanup(() => {
      cleanupShortcuts();
      unlistenClose?.();
    });
  });

  return (
    <div class="app">
      <Toolbar />
      <SplitPane
        left={<Editor content={documentStore.content} onChange={documentStore.setContent} />}
        right={<Preview content={documentStore.content} />}
      />
      <StatusBar
        filePath={documentStore.filePath}
        isDirty={documentStore.isDirty}
      />
      <UnsavedDialogRoot />
    </div>
  );
};

export default App;

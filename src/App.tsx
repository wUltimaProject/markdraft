import { type Component, onMount, onCleanup } from 'solid-js';
import { SplitPane } from './components/SplitPane';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import { documentStore } from './state/documentStore';
import { fileHandlers } from './lib/fileHandlers';
import { registerShortcut, initShortcuts } from './lib/shortcuts';
import { themeService } from './lib/themeService';

const App: Component = () => {
  onMount(() => {
    themeService.init();

    registerShortcut({ key: 'n', ctrl: true, shift: false, handler: () => void fileHandlers.newFile() });
    registerShortcut({ key: 'o', ctrl: true, shift: false, handler: () => void fileHandlers.openFile() });
    registerShortcut({ key: 's', ctrl: true, shift: false, handler: () => void fileHandlers.saveFile() });
    registerShortcut({ key: 's', ctrl: true, shift: true, handler: () => void fileHandlers.saveFileAs() });

    const cleanupShortcuts = initShortcuts();
    onCleanup(cleanupShortcuts);
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
    </div>
  );
};

export default App;

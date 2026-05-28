import { type Component } from 'solid-js';
import { SplitPane } from './components/SplitPane';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import { documentStore } from './state/documentStore';

const App: Component = () => {
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

import { render } from 'solid-js/web';
import App from './App';
import './styles/global.css';
import './styles/editor.css';
import './styles/preview.css';
import './styles/themes.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

render(() => <App />, root);

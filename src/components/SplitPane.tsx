import { type Component, type JSX, createSignal, onCleanup } from 'solid-js';

interface SplitPaneProps {
  left: JSX.Element;
  right: JSX.Element;
}

const STORAGE_KEY = 'md_viewer_split';
const DEFAULT = 50;
const MIN = 20;
const MAX = 80;

function clamp(v: number) { return Math.max(MIN, Math.min(MAX, v)); }

export const SplitPane: Component<SplitPaneProps> = props => {
  const stored = parseFloat(localStorage.getItem(STORAGE_KEY) ?? '');
  const [split, setSplit] = createSignal(isNaN(stored) ? DEFAULT : clamp(stored));
  let containerRef: HTMLDivElement | undefined;
  let dragging = false;

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    dragging = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging || !containerRef) return;
    const rect = containerRef.getBoundingClientRect();
    const pct = clamp(((e.clientX - rect.left) / rect.width) * 100);
    setSplit(pct);
  };

  const onMouseUp = () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    localStorage.setItem(STORAGE_KEY, String(split()));
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  onCleanup(() => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  });

  return (
    <div class="split-pane" ref={containerRef}>
      <div class="split-pane__left" style={{ width: `${split()}%` }}>{props.left}</div>
      <div class="split-pane__divider" onMouseDown={onMouseDown} />
      <div class="split-pane__right" style={{ width: `${100 - split()}%` }}>{props.right}</div>
    </div>
  );
};

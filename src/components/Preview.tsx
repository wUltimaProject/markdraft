import { type Component, createSignal, createMemo, createEffect, onCleanup } from 'solid-js';
import { renderMarkdown } from '../lib/markdown';

const DEBOUNCE_MS = 300;

interface PreviewProps {
  content: string;
}

export const Preview: Component<PreviewProps> = props => {
  const [debouncedContent, setDebouncedContent] = createSignal(props.content);

  createEffect(() => {
    const value = props.content;
    const timer = setTimeout(() => setDebouncedContent(value), DEBOUNCE_MS);
    onCleanup(() => clearTimeout(timer));
  });

  const html = createMemo(() => renderMarkdown(debouncedContent()));

  return (
    <div class="preview-pane">
      <div class="preview-content markdown-body" innerHTML={html()} />
    </div>
  );
};

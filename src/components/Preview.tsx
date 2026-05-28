import { type Component, createMemo } from 'solid-js';
import { renderMarkdown } from '../lib/markdown';

interface PreviewProps {
  content: string;
}

export const Preview: Component<PreviewProps> = props => {
  const html = createMemo(() => renderMarkdown(props.content));

  return (
    <div class="preview-pane">
      <div class="preview-content markdown-body" innerHTML={html()} />
    </div>
  );
};

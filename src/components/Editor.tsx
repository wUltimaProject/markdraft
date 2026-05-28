import { type Component, onMount, onCleanup } from 'solid-js';

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const Editor: Component<EditorProps> = props => {
  let textareaRef: HTMLTextAreaElement | undefined;

  const handleInput = (e: Event) => {
    props.onChange((e.target as HTMLTextAreaElement).value);
  };

  onMount(() => {
    if (textareaRef) textareaRef.value = props.content;
  });

  onCleanup(() => {
    textareaRef = undefined;
  });

  return (
    <div class="editor-pane">
      <textarea
        ref={textareaRef}
        class="editor-textarea"
        spellcheck={false}
        autocomplete="off"
        onInput={handleInput}
        placeholder="Start writing Markdown..."
      />
    </div>
  );
};

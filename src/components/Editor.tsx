import { type Component, createEffect, onCleanup } from 'solid-js';

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const Editor: Component<EditorProps> = props => {
  let textareaRef: HTMLTextAreaElement | undefined;

  const handleInput = (e: Event) => {
    props.onChange((e.target as HTMLTextAreaElement).value);
  };

  // Sync external content changes (e.g. file open, new file) to textarea
  createEffect(() => {
    if (textareaRef && textareaRef.value !== props.content) {
      textareaRef.value = props.content;
    }
  });

  onCleanup(() => {
    textareaRef = undefined;
  });

  return (
    <div class="editor-pane">
      <textarea
        ref={el => { textareaRef = el; }}
        class="editor-textarea"
        spellcheck={false}
        autocomplete="off"
        onInput={handleInput}
        placeholder="Start writing Markdown..."
      />
    </div>
  );
};

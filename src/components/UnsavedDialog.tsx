import { type Component, createSignal, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

export type UnsavedChoice = 'save' | 'discard' | 'cancel';

interface UnsavedDialogProps {
  onChoice: (choice: UnsavedChoice) => void;
}

const UnsavedDialog: Component<UnsavedDialogProps> = props => (
  <Portal>
    <div class="dialog-backdrop">
      <div class="dialog-box" role="dialog" aria-modal="true">
        <p class="dialog-title">Unsaved changes</p>
        <p class="dialog-body">Do you want to save your changes before closing?</p>
        <div class="dialog-actions">
          <button class="dialog-btn dialog-btn--cancel" onClick={() => props.onChoice('cancel')}>
            Cancel
          </button>
          <button class="dialog-btn dialog-btn--discard" onClick={() => props.onChoice('discard')}>
            Don't Save
          </button>
          <button class="dialog-btn dialog-btn--save" onClick={() => props.onChoice('save')} autofocus>
            Save
          </button>
        </div>
      </div>
    </div>
  </Portal>
);

// Module-level signal — readable reactively from anywhere
const [resolver, setResolver] = createSignal<((c: UnsavedChoice) => void) | null>(null);

export function showUnsavedDialog(): Promise<UnsavedChoice> {
  return new Promise(resolve => {
    setResolver(() => resolve);
  });
}

export const UnsavedDialogRoot: Component = () => (
  // resolver() accessed reactively inside Show — re-evaluates on signal change
  <Show when={resolver() !== null}>
    <UnsavedDialog
      onChoice={choice => {
        const fn = resolver();
        fn?.(choice);      // resolve promise first
        setResolver(null); // then hide dialog
      }}
    />
  </Show>
);

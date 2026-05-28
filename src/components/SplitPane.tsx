import { type Component, type JSX } from 'solid-js';

interface SplitPaneProps {
  left: JSX.Element;
  right: JSX.Element;
}

export const SplitPane: Component<SplitPaneProps> = props => {
  return (
    <div class="split-pane">
      <div class="split-pane__left">{props.left}</div>
      <div class="split-pane__divider" />
      <div class="split-pane__right">{props.right}</div>
    </div>
  );
};

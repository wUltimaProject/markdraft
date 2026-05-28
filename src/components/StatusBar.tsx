import { type Component } from 'solid-js';

interface StatusBarProps {
  filePath: string | null;
  isDirty: boolean;
}

export const StatusBar: Component<StatusBarProps> = props => {
  const displayName = () => {
    if (!props.filePath) return 'Untitled';
    return props.filePath.split(/[\\/]/).pop() ?? props.filePath;
  };

  return (
    <div class="status-bar">
      <span class="status-bar__filename">
        {props.isDirty && <span class="status-bar__dirty">●</span>}
        {displayName()}
      </span>
      {props.filePath && (
        <span class="status-bar__path" title={props.filePath}>
          {props.filePath}
        </span>
      )}
    </div>
  );
};

declare module 'markdown-it-task-lists' {
  import type MarkdownIt from 'markdown-it';
  function markdownItTaskLists(md: MarkdownIt, options?: { enabled?: boolean; label?: boolean; labelAfter?: boolean }): void;
  export = markdownItTaskLists;
}

import MarkdownIt from 'markdown-it';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItAnchor from 'markdown-it-anchor';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(code, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`;
  },
})
  .use(markdownItTaskLists, { enabled: true })
  .use(markdownItAnchor);

const DOMPURIFY_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [
    'h1','h2','h3','h4','h5','h6',
    'p','br','hr',
    'ul','ol','li',
    'blockquote','pre','code',
    'strong','em','del','s',
    'a','img',
    'table','thead','tbody','tr','th','td',
    'input',
    'span','div',
  ],
  ALLOWED_ATTR: ['href','src','alt','title','class','id','type','checked','disabled','target','rel'],
  ALLOW_DATA_ATTR: false,
};

export function renderMarkdown(content: string): string {
  const rawHtml = md.render(content);
  return DOMPurify.sanitize(rawHtml, DOMPURIFY_CONFIG) as string;
}

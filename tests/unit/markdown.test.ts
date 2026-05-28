import { describe, it, expect } from 'vitest';
import { renderMarkdown } from '../../src/lib/markdown';

describe('renderMarkdown', () => {
  it('renders heading', () => {
    const html = renderMarkdown('# Hello');
    expect(html).toContain('<h1');
    expect(html).toContain('Hello');
  });

  it('renders bold', () => {
    const html = renderMarkdown('**bold**');
    expect(html).toContain('<strong>bold</strong>');
  });

  it('renders inline code', () => {
    const html = renderMarkdown('`code`');
    expect(html).toContain('<code>code</code>');
  });

  it('does not render script tags as executable (XSS)', () => {
    const html = renderMarkdown('<script>alert(1)</script>');
    // markdown-it html:false escapes raw HTML to entities — no actual <script> element
    expect(html).not.toContain('<script>');
  });

  it('does not render onclick as executable (XSS)', () => {
    const html = renderMarkdown('<a onclick="evil()">link</a>');
    // raw HTML escaped by markdown-it, not passed through as attribute
    expect(html).not.toMatch(/<a[^>]+onclick/);
  });

  it('renders task list', () => {
    const html = renderMarkdown('- [x] done\n- [ ] todo');
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('checked');
  });

  it('renders fenced code block with highlight', () => {
    const html = renderMarkdown('```js\nconsole.log("hi")\n```');
    expect(html).toContain('<pre');
    expect(html).toContain('hljs');
  });

  it('renders GFM table', () => {
    const html = renderMarkdown('| A | B |\n|---|---|\n| 1 | 2 |');
    expect(html).toContain('<table');
    expect(html).toContain('<th');
  });

  it('returns empty string for empty input', () => {
    const html = renderMarkdown('');
    expect(html.trim()).toBe('');
  });
});

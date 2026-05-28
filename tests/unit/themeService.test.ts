import { describe, it, expect, beforeEach, vi } from 'vitest';
import { themeService } from '../../src/lib/themeService';

describe('themeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('applyTheme sets data-theme attribute', () => {
    themeService.applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('applyTheme persists to localStorage', () => {
    themeService.applyTheme('light');
    expect(localStorage.getItem('md_viewer_theme')).toBe('light');
  });

  it('getCurrentTheme reads from localStorage', () => {
    localStorage.setItem('md_viewer_theme', 'light');
    expect(themeService.getCurrentTheme()).toBe('light');
  });

  it('toggle switches dark→light', () => {
    localStorage.setItem('md_viewer_theme', 'dark');
    const next = themeService.toggle();
    expect(next).toBe('light');
  });

  it('toggle switches light→dark', () => {
    localStorage.setItem('md_viewer_theme', 'light');
    const next = themeService.toggle();
    expect(next).toBe('dark');
  });
});

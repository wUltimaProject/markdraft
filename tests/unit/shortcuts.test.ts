import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerShortcut, initShortcuts } from '../../src/lib/shortcuts';

describe('shortcuts', () => {
  beforeEach(() => {
    // Reset listeners by re-initializing
  });

  it('registerShortcut returns unregister fn', () => {
    const handler = vi.fn();
    const unregister = registerShortcut({ key: 'z', ctrl: true, handler });
    expect(typeof unregister).toBe('function');
    unregister();
  });

  it('fires handler on matching keydown', () => {
    const handler = vi.fn();
    registerShortcut({ key: 's', ctrl: true, handler });
    const cleanup = initShortcuts();

    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true, bubbles: true });
    window.dispatchEvent(event);

    expect(handler).toHaveBeenCalledOnce();
    cleanup();
  });

  it('does not fire on non-matching key', () => {
    const handler = vi.fn();
    registerShortcut({ key: 's', ctrl: true, handler });
    const cleanup = initShortcuts();

    const event = new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true });
    window.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    cleanup();
  });

  it('unregistered shortcut does not fire', () => {
    const handler = vi.fn();
    const unregister = registerShortcut({ key: 'n', ctrl: true, handler });
    const cleanup = initShortcuts();
    unregister();

    const event = new KeyboardEvent('keydown', { key: 'n', ctrlKey: true, bubbles: true });
    window.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    cleanup();
  });
});

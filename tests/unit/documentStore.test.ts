import { describe, it, expect, beforeEach } from 'vitest';
import { documentStore } from '../../src/state/documentStore';

describe('documentStore', () => {
  beforeEach(() => {
    documentStore.reset();
  });

  it('initial state is empty + clean', () => {
    expect(documentStore.content).toBe('');
    expect(documentStore.filePath).toBeNull();
    expect(documentStore.isDirty).toBe(false);
  });

  it('setContent marks dirty', () => {
    documentStore.setContent('hello');
    expect(documentStore.content).toBe('hello');
    expect(documentStore.isDirty).toBe(true);
  });

  it('setFilePath sets path', () => {
    documentStore.setFilePath('/tmp/test.md');
    expect(documentStore.filePath).toBe('/tmp/test.md');
  });

  it('markClean clears dirty flag', () => {
    documentStore.setContent('hello');
    documentStore.markClean();
    expect(documentStore.isDirty).toBe(false);
  });

  it('reset clears all state', () => {
    documentStore.setContent('hello');
    documentStore.setFilePath('/tmp/test.md');
    documentStore.reset();
    expect(documentStore.content).toBe('');
    expect(documentStore.filePath).toBeNull();
    expect(documentStore.isDirty).toBe(false);
  });
});

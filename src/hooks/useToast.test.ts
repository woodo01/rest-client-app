import { renderHook, act } from '@testing-library/react';
import { useToast, toast as globalToast } from './useToast';

describe('useToast', () => {
  it('should add a toast successfully', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test toast',
      });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
    expect(result.current.toasts[0].description).toBe('This is a test toast');
    expect(result.current.toasts[0].open).toBe(true);
    expect(result.current.toasts[0].id).toBeDefined();

    act(() => {
      result.current.dismiss();
    });
  });

  it('should respect TOAST_LIMIT when adding toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'First Toast' });
      result.current.toast({ title: 'Second Toast' });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Second Toast');

    act(() => {
      result.current.dismiss();
    });
  });

  it('should update toast correctly', () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;

    act(() => {
      const response = result.current.toast({ title: 'Original Title' });
      toastId = response.id;
    });

    expect(result.current.toasts[0].title).toBe('Original Title');

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('should dismiss specific toast by id', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast 1' });
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      globalToast({ title: 'Clean up toast' });
      result.current.dismiss();
    });
  });

  it('should dismiss all toasts when no id is provided', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast 1' });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].open).toBe(false);
  });

  it('should return the same state to all hook instances', () => {
    const { result: result1 } = renderHook(() => useToast());
    const { result: result2 } = renderHook(() => useToast());

    act(() => {
      result1.current.toast({ title: 'Shared Toast' });
    });

    expect(result1.current.toasts.length).toBe(1);
    expect(result1.current.toasts[0].title).toBe('Shared Toast');
    expect(result2.current.toasts.length).toBe(1);
    expect(result2.current.toasts[0].title).toBe('Shared Toast');

    act(() => {
      result1.current.dismiss();
    });
  });

  it('should handle toast callbacks correctly', () => {
    const { result } = renderHook(() => useToast());

    let dismissFn: (() => void) | undefined;

    act(() => {
      const response = result.current.toast({ title: 'Callback Test' });
      dismissFn = response.dismiss;
    });

    expect(typeof dismissFn).toBe('function');

    act(() => {
      if (dismissFn) dismissFn();
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('should clean up listeners when component unmounts', () => {
    const { unmount } = renderHook(() => useToast());
    const listeners = jest.spyOn(Array.prototype, 'splice');

    unmount();

    expect(listeners).toHaveBeenCalled();
  });

  it('should support global toast function', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      globalToast({ title: 'Global Toast' });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Global Toast');

    act(() => {
      result.current.dismiss();
    });
  });

  it('should handle onOpenChange callback', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Open Change Test' });
    });

    const toast = result.current.toasts[0];

    act(() => {
      if (toast.onOpenChange) {
        toast.onOpenChange(false);
      }
    });

    expect(result.current.toasts[0].open).toBe(false);
  });
});

import { Injectable, signal } from '@angular/core';

export type ToastType =
  'success' | 'error' | 'info' | 'warning';

export interface Toast {

  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  private counter = 0;

  toasts = signal<Toast[]>([]);

  show(
    message: string,
    type: ToastType = 'info',
    duration = 3000
  ) {

    const id = ++this.counter;

    const toast: Toast = {
      id,
      message,
      type
    };

    this.toasts.update(t => [...t, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number) {

    this.toasts.update(t =>
      t.filter(x => x.id !== id)
    );
  }

}

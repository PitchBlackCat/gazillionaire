import {EventEmitter, OnDestroy} from '@angular/core';

export abstract class Destroyable implements OnDestroy {
  protected destroy$ = new EventEmitter<void>();

  ngOnDestroy(): void {
    this.destroy$.emit();
    this.destroy$.complete();
  }
}

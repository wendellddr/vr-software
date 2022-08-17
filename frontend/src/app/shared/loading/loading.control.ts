import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingControl {
  private status$: Subject<boolean> = new Subject();
  private statusInterno = false;

  constructor() {
    this.status$.subscribe((value: boolean) => (this.statusInterno = value));
  }

  get status(): boolean {
    return this.statusInterno;
  }

  show() {
    this.status$.next(true);
  }

  hide() {
    this.status$.next(false);
  }

  subscribe(success: any): Subscription {
    return this.status$.subscribe(success);
  }
}

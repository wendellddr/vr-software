import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingControl } from './loading.control';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  @ViewChild('body', { static: true })
  bodyElement: ElementRef;

  private loadingSubscribe: Subscription = new Subscription();

  get status(): boolean {
    return this.loadingCtrl.status;
  }

  constructor(
    private loadingCtrl: LoadingControl,
    private changesDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingSubscribe.add(
      this.loadingCtrl.subscribe((value: boolean) => {
        if (value) {
          this.show();
        } else {
          this.hide();
        }
        this.changesDetector.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.loadingSubscribe.unsubscribe();
  }

  show() {
    this.bodyElement.nativeElement.hidden = false;
    setTimeout(() => {
      this.bodyElement.nativeElement.classList.remove('hide-loading');
      this.bodyElement.nativeElement.classList.add('show-loading');
    }, 0);
  }

  hide() {
    this.bodyElement.nativeElement.classList.remove('show-loading');
    this.bodyElement.nativeElement.classList.add('hide-loading');
    setTimeout(() => {
      this.bodyElement.nativeElement.hidden = true;
    }, 0);
  }
}

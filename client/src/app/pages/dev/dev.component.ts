import {AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Destroyable} from '../../util/Destroyable';
import {interval, Observable} from 'rxjs/index';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.sass']
})
export class DevComponent extends Destroyable implements AfterViewInit {

  @ViewChild('TV') private tv: ElementRef;

  public controllerUrl$: Observable<SafeResourceUrl>;
  public game$: Observable<string>;

  constructor(readonly sanitizer: DomSanitizer) {
    super();
  }

  ngAfterViewInit(): void {
    this.tv.nativeElement.setAttribute('src', `${environment.client_url}/tv`);
    const iframe = this.tv.nativeElement as HTMLIFrameElement;
    this.game$ = interval(1000).pipe(
      map(() => iframe.contentWindow.location.href.split('?room=')[1] || ''),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    this.controllerUrl$ = this.game$.pipe(
      map(g => `${environment.client_url}/game/${g}`),
      map(u => this.sanitizer.bypassSecurityTrustResourceUrl(u)),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
  }
}

import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[appColumn]'
})
export class ColumnDirective implements OnInit {
  @Input() grow: boolean = false;
  @Input() gutter: boolean = false;

  constructor(readonly renderer: Renderer2, readonly elem: ElementRef) {

  }

  ngOnInit() {
    this.renderer.addClass(this.elem.nativeElement, 'flex');
    this.renderer.addClass(this.elem.nativeElement, 'column');
    if (this.grow) this.renderer.addClass(this.elem.nativeElement, 'grow');
    if (this.gutter) this.renderer.addClass(this.elem.nativeElement, 'gutter');
  }

}

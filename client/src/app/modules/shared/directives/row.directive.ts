import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[appRow]'
})
export class RowDirective implements OnInit {
  @Input() grow: boolean = false;
  @Input() gutter: boolean = false;

  constructor(readonly renderer: Renderer2, readonly elem: ElementRef) {

  }

  ngOnInit() {
    this.renderer.addClass(this.elem.nativeElement, 'flex');
    if (this.grow) this.renderer.addClass(this.elem.nativeElement, 'grow');
    if (this.gutter) this.renderer.addClass(this.elem.nativeElement, 'gutter');
  }

}

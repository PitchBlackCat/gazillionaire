import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[appFlexItem]'
})
export class FlexItemDirective implements OnInit {
  @Input() grow: boolean = false;

  constructor(readonly renderer: Renderer2, readonly elem: ElementRef) {

  }

  ngOnInit() {
    if (this.grow) this.renderer.addClass(this.elem.nativeElement, 'flex-1');
  }

}

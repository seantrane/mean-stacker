import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  protected _elementClass: string[] = [];

  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
  }

  @Input() defaultColor: string;

  // @Input() highlightColor: string;
  // see: https://angular.io/guide/attribute-directives#bind-to-an-input-alias
  @Input('appHighlight') highlightColor: string;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight(null);
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.cursor = 'pointer';
    if (color === null) {
      this._elementClass.splice(this._elementClass.length - 1, 1);
      this.el.nativeElement.style.color = null;
    } else {
      this._elementClass.push('text-uppercase');
      this.el.nativeElement.style.color = '#fff';
    }
  }

}

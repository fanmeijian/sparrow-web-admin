import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { PageElementService } from '@sparrowmini/org-api';

@Directive({
  selector: '[libPgelPermission]',
})
export class PgelPermissionDirective implements AfterViewInit {
  elementTypes = ['input', 'select', 'button'];

  constructor(
    private el: ElementRef<any>,
    private renderer: Renderer2,
    private pageElementService: PageElementService
  ) {}
  ngAfterViewInit(): void {
    this.el.nativeElement.style.display = 'none';
    this.pageElementService
      .hasPageElementPermission(this.libPgelPermission!)
      .subscribe(
        (res) => {
          if (res) {
            this.el.nativeElement.style.display = 'block';
          }
        },
        (err) => {
          this.el.nativeElement.style.display = 'none';
        }
      );
  }

  @Input() libPgelPermission?: string;
}

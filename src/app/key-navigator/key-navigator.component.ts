import {
  AfterContentInit, Component, Directive, ElementRef, EventEmitter,
  HostListener, Input, Output, ContentChildren, QueryList
} from '@angular/core';

import { Subject } from 'rxjs/Rx';

@Directive({
  selector: '[stationKeyNavigatorItem]'
})
export class KeyNavigatorItemDirective {
  private classname: string = 'active';

  constructor(private elementRef: ElementRef) { }

  setActiveClassname(): void {
    let element = this.elementRef.nativeElement;
    let classnames = element.className.split(' ');
    if (classnames.indexOf(this.classname) === -1) {
      classnames.push(this.classname);
    }
    element.className = classnames.join(' ');
  }

  reset(): void {
    let element = this.elementRef.nativeElement;
    let classnames = element.className.split(' ');
    classnames.pop(this.classname);
    element.className = classnames.join(' ');
  }
}

@Component({
  selector: 'station-key-navigator',
  template: `
    <ng-content></ng-content>
    <ul class="key-navigator-legend">
      <li>[&larr;]&nbsp;Back</li>
      <li>[&rarr;]&nbsp;Select</li>
    </ul>
  `
})
export class KeyNavigatorComponent<T> implements AfterContentInit {

  @ContentChildren(KeyNavigatorItemDirective)
  items: QueryList<KeyNavigatorItemDirective>;

  @Input()
  model: T[] = [];

  @Output()
  onSelection = new EventEmitter<T>();

  @Output()
  onGoBack = new EventEmitter<void>();

  private UP: number = 38;
  private DOWN: number = 40
  private LEFT: number = 37;
  private RIGHT: number = 39;
  private RETURN: number = 13;
  private ESCAPE: number = 27;

  private subject = new Subject();
  private navigationIndex: number = 0;

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    console.log("KEYUP:", event.which);

    switch (event.which) {

      case this.UP:
        this.navigationIndex--;
        if (this.navigationIndex < 0) {
          this.navigationIndex = 0;
        }
        this.subject.next();
      break;

      case this.DOWN:
        this.navigationIndex++;
        if (this.navigationIndex > this.model.length - 1) {
          this.navigationIndex = this.model.length - 1;
        }
        this.subject.next();
      break;

      case this.LEFT:
      case this.ESCAPE:
        this.onGoBack.emit();
      break;

      case this.RETURN:
      case this.RIGHT:
        this.onSelection.emit(this.model[this.navigationIndex]);
      break;
    }
  }

  private checkActiveState(): void {
    this.items.forEach((item: KeyNavigatorItemDirective, index: number) => {
      item.reset();
      if (index === this.navigationIndex) {
        item.setActiveClassname();
      }
    });
  }

  ngAfterContentInit(): void {
    // Wait for a keypress to check active states.
    this.subject.subscribe(() => {
      this.checkActiveState();
    });

    // Wait for the queried items to change.
    this.items.changes.subscribe(() => {
      this.subject.next();
    });

    // Trigger to set the first item as active.
    this.subject.next();
  }
}

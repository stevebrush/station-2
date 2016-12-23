import {
  AfterViewInit, Component, Directive, ElementRef, EventEmitter,
  HostListener, Input, OnInit, Output, ContentChildren, QueryList
} from '@angular/core';

import { Subject } from 'rxjs/Rx';

@Directive({
  selector: '[stationKeyNavigatorActive]'
})
export class KeyNavigatorActiveDirective {
  private classname: string = 'active';

  constructor(private elementRef: ElementRef) { }

  public setActiveClassname(): void {
    let element = this.elementRef.nativeElement;
    let classnames = element.className.split(' ');
    if (classnames.indexOf(this.classname) === -1) {
      classnames.push(this.classname);
    }
    element.className = classnames.join(' ');
  }

  public reset(): void {
    let element = this.elementRef.nativeElement;
    let classnames = element.className.split(' ');
    classnames.pop(this.classname);
    element.className = classnames.join(' ');
  }
}




@Component({
  selector: 'station-key-navigator',
  template: `<ng-content></ng-content>`
})
export class KeyNavigatorComponent<T> implements OnInit, AfterViewInit {

  @ContentChildren(KeyNavigatorActiveDirective)
  items: QueryList<KeyNavigatorActiveDirective>;

  @Input()
  model: T[] = [];

  @Output()
  onSelection = new EventEmitter<T>();

  private UP: number = 38;
  private DOWN: number = 40
  private RETURN: number = 13;
  private subject = new Subject();
  private navigationIndex: number = 0;

  @HostListener('document:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
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

      case this.RETURN:
      this.onSelection.emit(this.model[this.navigationIndex]);
      break;
    }
  }

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.subject.subscribe(() => {
      this.items.forEach((item: KeyNavigatorActiveDirective, index: number) => {
        item.reset();
        if (index === this.navigationIndex) {
          item.setActiveClassname();
        }
      });
    });
    this.items.changes.subscribe(() => this.subject.next());
  }
}

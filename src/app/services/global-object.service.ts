import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalObjectService {

  constructor(@Inject(DOCUMENT) private doc: Document ) { }

  getWindow(): Window | null {
    return this.doc.defaultView;
  }

  getLocation(): Location {
    return this.doc.location;
  }

  createElement(tag: string): HTMLElement {
    return this.doc.createElement(tag);
  }
}
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Tag, TagService} from '../../services/tag.service';


@Component({
  selector: 'tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css']
})
export class TagSelectComponent {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<any[]>;
  tags: any[] = [];
  allTags: any;
  @Output() emittingTags = new EventEmitter();
  @Input() inputTags: any[];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(public tagService: TagService) {
    this.tagService.getAllTags().subscribe(items => {
      this.allTags = items;
      if (this.inputTags) {
        this.tags = this.tags.concat(this.inputTags);
      }
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
          map((tag: Tag) => tag ? this._filter(tag) : this.allTags.slice()));
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.tagCtrl.setValue(null);
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.emittingTags.emit(this.tags);
  }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.tags.push(event.option.viewValue);
  //   this.tagInput.nativeElement.value = '';
  //   this.tagCtrl.setValue(null);
  //   this.emittingTags.emit(event.option.viewValue);
  // }
  getTagId(tag) {
    if (this.tags.length) {
      for (const item of this.tags) {
        if (tag.id === item.id) {
          this.tagInput.nativeElement.value = '';
          this.tagCtrl.setValue(null);
          console.log('exists');
          return;
        }
      }
    }
    this.tags.push({
      name: tag.name,
      id: tag.id
    });
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.emittingTags.emit(this.tags);
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentPipe'
})
export class MomentPipe implements PipeTransform {
  transform(date: any, locale?:any) {
    if(!date) {return null};
    return moment(date).locale().fromNow();
  }
}

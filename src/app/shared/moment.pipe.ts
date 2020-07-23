import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/mn';

@Pipe({
  name: 'momentPipe'
})
export class MomentPipe implements PipeTransform {
  transform(date: any) { return date ? moment(date.seconds * 1000).locale('mn').fromNow() : null; }
}

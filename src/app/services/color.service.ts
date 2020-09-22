import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  allColors = [
    {
      color: 'red',
      code: '#ffcdd2'
    },
    {
      color: 'purple',
      code: '#e1bee7'
    },
    {
      color: 'indigo',
      code: '#c5cae9'
    },
    {
      color: 'blue',
      code: '#eeffff'
    },
    {
      color: 'cyan',
      code: '#b2ebf2'
    },
    {
      color: 'green',
      code: '#dcedc8'
    },
    {
      color: 'yellow',
      code: 'fff9c4'
    }

  ];
  constructor() { }
}

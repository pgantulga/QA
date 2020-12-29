import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  allColors = [
    {
      color: 'red',
      code: '#ef9a9a'
    },
    {
      color: 'purple',
      code: '#ce93d8'
    },
    {
      color: 'indigo',
      code: '#9fa8da'
    },
    {
      color: 'blue',
      code: '#90caf9'
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
      code: '#fff59d'
    },
    {
      color: 'orange',
      code: '#ffcc80'
    },
    {
      color: 'pink',
      code: '#f48fb1'
    }


  ];
  constructor() { }
}

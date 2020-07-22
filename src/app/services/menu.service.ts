import { Injectable } from '@angular/core';
import {Menu} from "../interfaces/Menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }
  public topMenu: Menu[] =[
    {
      name: 'Асуултууд',
      link: 'home'
    },
    {
      name: 'Хэрэглэгчид',
      link: 'users'
    },
    {
      name: 'Components',
      link: 'components'
    }
  ]
}

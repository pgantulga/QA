import { Injectable } from '@angular/core';
import {Menu} from "../interfaces/Menu";



@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }
  public dropMenu = [
    {
      name: 'Сүүлд шинэчлэгдсэн',
      sort: 'updatedAt'
    },
    {
      name: 'Идэвхтэй',
      sort: 'answersCount'
    },
    {
      name: 'Сүүлд нэмэгдсэн',
      sort: 'createdAt'
    }
  ];
  public toggleMenu = [
    {
      name: 'Сүүлд шинэчлэгдсэн',
      sort: 'updatedAt',
      icon: 'update'
    },
    {
      name: 'Идэвхтэй',
      sort: 'answersCount',
      icon: 'whatshot'
    },
    {
      name: 'Дахин ачааллах',
      sort: 'updatedAt',
      icon: 'refresh'
    }
  ];
  public topMenu: Menu[] = [
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
  ];
  public adminMenu: Menu [] = [
    {
      name: 'Posts',
      link: '/admin/posts'
    },
    {
      name: 'Articles',
      link: '/admin/articles'
    },
    {
      name: 'Users',
      link: '/admin/users'
    },
    {
      name: 'Tags',
      link: '/admin/tagCategories'
    },
    {
      name: 'Logs',
      link: '/admin/logs'
    }
  ];

}

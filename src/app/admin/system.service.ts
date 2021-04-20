import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private UserService: UserService) { }
  

}

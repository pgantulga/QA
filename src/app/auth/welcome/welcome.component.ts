import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ColorService} from "../../services/color.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  welcomeForm: FormGroup;
  user: any;
  color: any;
  displayName = new FormControl('', [
    Validators.minLength(5)
  ]);
  company = new FormControl('', [
    Validators.maxLength(50)
  ]);
  position = new FormControl('', [
    Validators.maxLength(50)
  ]);
  constructor(public authService: AuthService, public colorService: ColorService) { }

  ngOnInit(): void {
    this.authService.getUser()
        .then(user => {
          this.user = user;
          this.displayName.setValue(user.displayName);
          this.color = this.getRandomColor();
        });
  }
  getRandomColor() {
   const randomIndex =  Math.floor(Math.random() * Math.floor(this.colorService.allColors.length));
   console.log(randomIndex)
   return this.colorService.allColors[randomIndex];
  }
  onSubmit() {

  }
}

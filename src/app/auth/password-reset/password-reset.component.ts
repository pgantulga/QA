import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  user: any;
  isEmailSent: boolean
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser()
        .then((user) => {
          if (user) {
            this.email.setValue(user.email);
          }
        });
  }
  onSubmit() {
    this.authService.passwordReset(this.email.value)
        .then(() => {
          console.log('email sent');
          this.isEmailSent = true
        })
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // email = new FormControl('', [Validators.required, Validators.email]);
  // userName = new FormControl('', [Validators.required]);
  // password = new FormControl('', [Validators.required]);
  // passwordConfirm = new FormControl('', [this.passwordCheck]);
  registerForm: FormGroup;

  constructor(private af: AngularFireAuth, public authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
        {
          firstName: '',
          lastName: '',
          email: ['', Validators.email],
          password: ['', Validators.required],
          confirmPassword: ['']
        }, {validator: this.passwordCheck}
    );
  }

  loginWithGoogle() {
    this.authService.googleLogin()
        .then(() => console.log('Google login successfully'))
        .catch(err => {console.log('Login error: ' + err); });
  }
  getEmailError() {
    return this.registerForm.get('email').hasError('email') ? 'Имэйл байх шаардлагатай!' : '';
  }
  getPasswordError() {
    if (this.registerForm.get('password').hasError('required')) {
      return 'Нууц үгээ оруулна уу';
    }
  }
  getPasswordConfirmError() {
    return this.registerForm.hasError('notSame') ? 'Passwords not same' : '';
  }
  passwordCheck(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value ? null : { notSame: true };
  }
  getUserNameError() {
    if (this.registerForm.get('firstName').hasError('required')) {
      return 'Нэр оруулна уу';
    }
  }
  onSubmit() {

  }
}

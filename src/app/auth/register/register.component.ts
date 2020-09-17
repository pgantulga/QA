import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  serviceErrorMessage: string;

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
  onSubmit() {
    this.authService
        .emailSignUp({
            firstName: this.registerForm.get('firstName').value,
            lastName: this.registerForm.get('lastName').value,
            displayName: this.registerForm.get('firstName').value,
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value
        }, message => {
          this.serviceErrorMessage = message;
        })
        .then(res => {
          console.log(res);
        });
  }
  signOut() {
    this.authService.signOut();
  }
}

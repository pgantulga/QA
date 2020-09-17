import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../../shared/components/snack/snack.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  constructor(private af: AngularFireAuth, public authService: AuthService, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.authService.googleLogin()
        .then(() => console.log('Google login successfully'))
        .catch(err => {console.log('Login error: ' + err); });
  }
  getEmailError() {
    if (this.email.hasError('required')) {
      return 'Имэйл шаардлагатай!';
    }
    return this.email.hasError('email') ? 'Имэйл байх шаардлагатай!' : '';
  }
  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'Нууц үгээ оруулна уу';
    }
  }
  signOut() {
    this.authService.signOut();
  }
  onSubmit() {
    this.authService.signIn({email: this.email.value, password: this.password.value})
        .then(res => {
          this.openSnack('Амжилттай нэвтэрлээ.');
          // window.location.reload();
        })
        .catch(err => {
          this.openSnack(err.message);
        });
  }
  openSnack(data) {
    this.snackbar.openFromComponent(SnackComponent, {data});
  }
}

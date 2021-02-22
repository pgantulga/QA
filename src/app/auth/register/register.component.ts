import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  serviceErrorMessage: string;
  acceptTOC: boolean;
  tocId: string;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private afMessaging: AngularFireMessaging
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: '',
        lastName: '',
        email: ['', Validators.email],
        password: ['', Validators.required],
        confirmPassword: ['']
      }, { validator: this.passwordCheck }
    );
    this.acceptTOC = false;
    this.tocId = '44LFn7kNX5BPkb1RwID5';
  }

  loginWithGoogle() {
    this.authService.googleLogin()
      .then((res) => {
        if (res.firstTime) {
          this.router.navigate(['auth/welcome']).then(() => this.checkNotification(res));
        } else {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
      })
      .catch(err => { console.log('Login error: ' + err); });
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
      })
      .then((res: any) => {
        console.log(res)
        if (res.firstTime) {
          this.router.navigate(['auth/welcome']).then(() => this.checkNotification(res));
        }
      });
  }
  signOut() {
    this.authService.signOut();
  }
  tokenDialog(user) {
    const dialogData = {
      title: 'Вебсайтын мэдэгдлийг зөвшөөрөх',
      content: 'Та веб хөтөчийн мэдэгдийн тохиргоог зөвшөөрснөөр мэдээллүүдийг цаг тухайд нь авах боломжтой.'
    };
    const dialogRef = this.dialog.open(DialogComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('request token');
        this.afMessaging.requestToken
          .subscribe(
            (token) => this.notificationService.savePushNotificationsToUser(token, user),
            (error) => { console.log(error); }
          );
      }
    });
  }
  checkNotification(res) {
    this.notificationService.checkNotificationToken(res)
      .then(isToken => {
        return !isToken ? this.tokenDialog(res) : null;
      });
  }
}

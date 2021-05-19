import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit, OnDestroy {
  afUser: any;
  subscription: any;
  emailSent: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router,
    private af: AngularFireAuth
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.subscription = this.af.authState.subscribe(user => {
      this.afUser = user;
      const interval = setInterval(() => {
        user.reload();
        if (this.afUser.emailVerified) {
          clearInterval(interval);
        }
        console.log('Reloading');
      }, 1000);
    });
  }
  ngOnDestroy() {
  }

  async sendVerificationAgain() {
    this.emailSent = true;
    return (await this.af.currentUser).sendEmailVerification();
  }
  submit() {
    if (this.afUser) {
      this.authService.createUserData(this.afUser)
        .then(() => {
          this.router.navigate(['/auth/welcome']);
        });
    }
  }
}

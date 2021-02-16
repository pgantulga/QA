import { AngularFireMessaging } from '@angular/fire/messaging';
import { DialogComponent } from './../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification.service';
import { PermissionService } from './../../services/permission.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);

    constructor(private af: AngularFireAuth,
                private afMessaging: AngularFireMessaging,
                public authService: AuthService,
                public snackbar: MatSnackBar,
                public router: Router,
                private route: ActivatedRoute,
                private notificationService: NotificationService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    loginWithGoogle() {
        this.authService.googleLogin()
            .then((res) => {
                if (res.firstTime) {
                    this.router.navigate(['auth/welcome']);
                }
                this.notificationService.checkNotificationToken(res)
                    .then(isToken => {
                        return !isToken ? this.tokenDialog(res) : null;
                    });
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                this.router.navigate([returnUrl || '/']);
                
            });
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
        this.authService.signIn({ email: this.email.value, password: this.password.value })
            .then(res => {
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                this.router.navigate([returnUrl || '/']);
                this.openSnack('Амжилттай нэвтэрлээ.');
            });

    }

    openSnack(data) {
        this.snackbar.openFromComponent(SnackComponent, { data });
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
                        (error) => {console.log(error); }
                        );
            }
    });
}
}

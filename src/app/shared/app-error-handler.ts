import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from './components/snack/snack.component';

@Injectable({
    providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
    constructor(private snack: MatSnackBar) {
    }
    errorMessage: string;
    handleError(error: Error): void {
        if (error.message.includes('The email address is already in use by another account.')) {
            this.errorMessage = 'Энэ имэйл хаяг бүртгэлтэй байна.';
        }
        if (error.message.includes('Error: The password is invalid or the user does not have a password.')) {
            this.errorMessage = 'Таны нууц үг буруу байна.';

        }
        if (error.message.includes('There is no user record corresponding to this identifier. The user may have been deleted.')) {
            this.errorMessage = 'Имэйл хаяг бүртгэлгүй байна.';
        }
        if (error.message.includes('Error: The email address is badly formatted.')) {
            this.errorMessage = 'Имэйл хаягийн формат буруу байна.';

        }
        if (error.message.includes('Error: Access to this account has been temporarily disabled due to many failed login attempts.')) {
            this.errorMessage = 'Олон амжилтгүй оролдлого хийсэн байна. Та түр хүлээнэ үү.';
        }
        else {
            console.log(error);
        }
        if (this.errorMessage) {
            this.snack.openFromComponent(SnackComponent, {
                data: this.errorMessage,
                panelClass: ['warn-snack']
            }).afterDismissed()
                .subscribe(() => {
                    this.errorMessage = null;
                })
        }


    }
}


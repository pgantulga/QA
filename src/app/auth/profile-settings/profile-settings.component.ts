import {Component, OnInit} from '@angular/core';
import {ColorService} from '../../services/color.service';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {PermissionService} from "../../services/permission.service";

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
    user: any;
    color: any;
    avatar: string;
    selectedColor: any;
    changePasswordButton = false;
    displayName = new FormControl('', [
        Validators.minLength(5)
    ]);
    company = new FormControl('', [
        Validators.maxLength(50)
    ]);
    position = new FormControl('', [
        Validators.maxLength(50)
    ]);

    constructor(public authService: AuthService, public colorService: ColorService, public snackbar: MatSnackBar, public router: Router, private permissionService: PermissionService) {
    }

    ngOnInit(): void {
        this.authService.getUser()
            .then(user => {
                this.user = user;
                this.displayName.setValue(user.displayName);
                this.company.setValue(user.company);
                this.position.setValue(user.position);
                this.color = this.getRandomColor();
                this.selectedColor = (user.color) ? user.color : null;
            });
    }

    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * Math.floor(this.colorService.allColors.length));
        console.log(randomIndex);
        return this.colorService.allColors[randomIndex];
    }

    onSubmit() {
        this.authService.updateUserInstant(
            {
                displayName: this.displayName.value,
                company: this.company.value,
                position: this.position.value,
                color: this.selectedColor,
            }, this.user.uid
        ).then(res => {
            this.permissionService.changeRole({key: 'subscriber', value: this.user.roles.subscriber}, this.user.uid);
            this.router.navigate(['home'])
                .then(() => {
                        return this.openSnack('Таны мэдээлэл санагдлаа.');
                    }
                );
        })
            .catch(err => {
                return this.openSnack(err.message);
            });
    }

    openSnack(data) {
        // @ts-ignore
        this.snackbar.openFromComponent(SnackComponent, {data, panelClass: ['default-snack']});
    }

    selectColor(color) {
        this.selectedColor = color;
    }

    isSelected(color): boolean {
        if (this.selectedColor) {
            return (color.color === this.selectedColor.color);
        }

    }
    changePassword() {
        this.changePasswordButton = true;
        this.authService.passwordReset(this.user.email).then(() => {
            return this.snackbar.openFromComponent(SnackComponent, {
                data: 'Имэйл илгээгдлээ'
            });
        })
    }
}

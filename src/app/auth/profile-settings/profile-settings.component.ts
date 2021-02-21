import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { PermissionService } from '../../services/permission.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['../welcome/welcome.component.scss', './profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
    user: any;
    color: any;
    avatar: string;
    selectedColor: any;
    changePasswordButton = false;
    idCard: string;
    storagePath: string;
    verified: boolean;
    displayName = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]);
    company = new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
    ]);
    position = new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
    ]);

    constructor(
        public authService: AuthService,
        public colorService: ColorService,
        public snackbar: MatSnackBar,
        public router: Router,
        private permissionService: PermissionService,
        private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.authService.getUser()
            .then(user => {
                this.user = user;
                this.verified = this.user.verified;
                this.storagePath = `images/idCards/${this.user.uid}`;
                this.color = this.getRandomColor();
                this.selectedColor = (user.color) ? user.color : null;
                this.displayName.setValue(user.displayName);
                this.position.setValue(user.position);
                if (user.company) {
                    this.company.setValue(user.company.name);
                }
                this.idCard = (this.user.idCard) ? this.user.idCard : null;
                this.user.idCard = this.user.idCard || null;
            });
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
        });
    }

    getImageFile(ev) {
        this.idCard = ev;
    }

    onSubmit() {
        const data = {
            displayName: this.displayName.value,
            company: this.companyService.setCompanyValue({ name: this.company.value, idCard: this.idCard }, this.user),
            position: this.position.value,
            color: this.selectedColor,
            idCard: (this.idCard || this.user.idCard),
            updatedAt: new Date()
        };
        console.log(data);
        this.authService.updateUserInstant(data, this.user.uid)
        .then(res => {
            if (!(this.user.roles.moderator || this.user.roles.admin)) {
                this.permissionService.setRole({ key: 'subscriber', value: this.user.roles.subscriber }, this.user.uid);
            }
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
    changeRequest() {
        this.verified = false;
    }

    private getRandomColor() {
        const randomIndex = Math.floor(Math.random() * Math.floor(this.colorService.allColors.length));
        return this.colorService.allColors[randomIndex];
    }

    private openSnack(data) {
        this.snackbar.openFromComponent(SnackComponent, { data, panelClass: ['default-snack'] });
    }

}

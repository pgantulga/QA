import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorService } from '../../services/color.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user: any;
  color: any;
  avatar: string;
  selectedColor: any;
  displayName = new FormControl('', [
    Validators.minLength(4)
  ]);
  company = new FormControl('', [
    Validators.maxLength(50)
  ]);
  position = new FormControl('', [
    Validators.maxLength(50)
  ]);
  idCard: string;
  storagePath: string;
  constructor(
    public authService: AuthService,
    public colorService: ColorService,
    public snackbar: MatSnackBar,
    public router: Router,
    private permissionService: PermissionService,) { }

  ngOnInit(): void {
    this.authService.getUser()
      .then(user => {
        this.user = user;
        this.storagePath = `images/idCards/${this.user.uid}`;
        this.displayName.setValue(user.displayName);
        if (user.company) {
          this.company.setValue(user.company.name);
        }
        this.position.setValue(user.position);
        this.color = this.getRandomColor();
        this.idCard = (this.user.idCard) ? this.user.idCard : null;
        this.user.idCard = this.user.idCard || null;
      });
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  isSelected(color): boolean {
    return (color === this.selectedColor);
  }

  getImageFile(ev) {
    this.idCard = ev;
  }

  onSubmit() {
    const data = {
      displayName: this.displayName.value,
      company: {
        name: this.company.value
      },
      position: this.position.value,
      color: this.selectedColor,
      idCard: (this.idCard || this.user.idCard),
      updatedAt: new Date()
    }
    this.authService.updateUserInstant(data, this.user.uid)
      .then(res => {
        if (!(this.user.roles.moderator || this.user.roles.admin)) {
          this.permissionService
            .setRole({ key: 'subscriber', value: this.user.roles.subscriber }, this.user.uid)
            .then(() => {this.router.navigate(['auth/select-category']);});
        }
        return this.openSnack('Таны мэдээлэл санагдлаа.');
      })
      .catch(err => {
        return this.openSnack(err.message);
      });
  }

  private openSnack(data) {
    this.snackbar.openFromComponent(SnackComponent, { data, panelClass: ['default-snack'] });
  }

  private getRandomColor() {
    const randomIndex = Math.floor(Math.random() * Math.floor(this.colorService.allColors.length));
    return this.colorService.allColors[randomIndex];
  }
}

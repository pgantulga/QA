import { Component, OnInit } from '@angular/core';
import {ColorService} from '../../services/color.service';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SnackComponent} from '../../shared/components/snack/snack.component';

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
  displayName = new FormControl('', [
    Validators.minLength(5)
  ]);
  company = new FormControl('', [
    Validators.maxLength(50)
  ]);
  position = new FormControl('', [
    Validators.maxLength(50)
  ]);
  constructor(public authService: AuthService, public colorService: ColorService, public snackbar: MatSnackBar, public router: Router) { }

  ngOnInit(): void {
    this.authService.getUser()
        .then(user => {
          this.user = user;
          this.displayName.setValue(user.displayName);
          this.company.setValue(user.company);
          this.position.setValue(user.position);
          this.color = this.getRandomColor();
        });
  }
  getRandomColor() {
    const randomIndex =  Math.floor(Math.random() * Math.floor(this.colorService.allColors.length));
    console.log(randomIndex);
    return this.colorService.allColors[randomIndex];
  }
  onSubmit() {
    this.authService.updateUserInstant(
        {
          displayName: this.displayName.value,
          company: this.company.value,
          position: this.position.value,
          color: this.selectedColor
        }, this.user.uid
    ).then(res => {
      this.router.navigate(['home']);
      return this.openSnack('Таны мэдээлэл санагдлаа.');
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
    return  (color === this.selectedColor);
  }
}

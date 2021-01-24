import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ColorService} from "../../services/color.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {Router} from '@angular/router';
import {PermissionService} from '../../services/permission.service';

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
    Validators.minLength(5)
  ]);
  company = new FormControl('', [
    Validators.maxLength(50)
  ]);
  position = new FormControl('', [
    Validators.maxLength(50)
  ]);
  constructor(public authService: AuthService, public colorService: ColorService, public snackbar: MatSnackBar, public router: Router, private permissionService: PermissionService) { }

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
          this.permissionService.changeRole({key: 'subscriber', value: this.user.roles.subscriber}, this.user.uid);
          this.router.navigate(['auth/select-category']);
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

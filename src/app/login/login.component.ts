import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFireAuth, public authService: AuthService) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.authService.googleLogin()
        .then(()=> console.log('Google login successfully'))
        .catch(err => {console.log("Login error: "+ err)});
  }

}

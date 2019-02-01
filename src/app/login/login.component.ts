import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';
import { SnackBarService } from 'src/services/shared/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _snackService: SnackBarService,
    private _router: Router
  ) {
    this.formLogin = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this._router.navigate(['/dashboard']);
    }
  }

  login() {
    this._userService.login(this.formLogin.value).subscribe(
      response => {
        localStorage.setItem('token', response.token)
        this._router.navigate(['/dashboard']);
      },
      error => {
        console.error(error)
        this._snackService.messageBar('Email o Contraseña incorrectas.', 4000);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';
import { SnackBarService } from 'src/services/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [UserService]
})
export class RegisterUserComponent implements OnInit {

  public formRegister: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _snackService: SnackBarService
  ) {
    this.formRegister = this._fb.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  registerUser() {
    this._userService.createUser(this.formRegister.value).subscribe(
      response => {
        console.log(response);
        console.log(JSON.stringify(response));
        this._snackService.messageBar('Se creo correctamente el usuario', 4000);
        this.formRegister.reset();
      },
      error => {
        console.error(error);
        this._snackService.messageBar('Ocurrio un error al crear al usuario', 4000);
      }
    )
  }

}

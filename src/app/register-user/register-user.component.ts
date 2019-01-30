import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public formRegister: FormGroup;

  constructor(
    private _fb: FormBuilder
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
    console.log(this.formRegister.value);
  }

}

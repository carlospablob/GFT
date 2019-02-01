import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/models/createUser';
import { Login } from 'src/models/login';

@Injectable()
export class UserService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
   }

  createUser(user: CreateUser): Observable<string> {
    return this._http.post<string>(`${this.url}auth/user/create`, user,)
  }

  login(user: Login): Observable<any> {
    return this._http.post(`${this.url}auth/user/authenticate`, user)
  }
}

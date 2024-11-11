import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenCheckserviceService } from './token-checkservice.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RsltnntddsService {

  constructor(private _http: AuthService, public _auth: AuthService, public _checkToken: TokenCheckserviceService, private router: Router) {
    this._checkToken.check_token_session();
  }

  

}

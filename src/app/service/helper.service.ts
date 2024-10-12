import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokenCheckserviceService } from './token-checkservice.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HelperService {

  constructor(
    private _basichttp: Http,
    private _http: HttpClient,
    public _auth: AuthService,
    public _checkToken: TokenCheckserviceService,
    private router: Router
  ) {
    this._checkToken.check_token_session();
  }

  getQuery(route: string): Observable<any> {

    return this._http.get(`${environment.api_url}` + route, { headers: this._checkToken.returnHeaders() })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw({ message: "Error del Servidor" } || this.router.navigateByUrl('/')));

  }
  getQueryrespaldo(route: string): Observable<any> {

    return this._http.get(`${environment.api_urlresp}` + route, { headers: this._checkToken.returnHeaders() })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw({ message: "Error del Servidor" } || this.router.navigateByUrl('/')));

  }
  getQueryfinal(route: string): Observable<any> {

    return this._http.get('https://systemresolution.com/recibir.php')
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw({ message: "Error del Servidor" } || this.router.navigateByUrl('/')));

  }
  
  postQuery(item, route): Observable<any> {
    return this._http.post(`${environment.api_url}` + route, { item }, { headers: this._checkToken.returnHeaders() })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw(/*alert("Ha ocurrido un error") ||*/ { message: "Error del Servidor" } || this.router.navigateByUrl('/')));

  }
  postQueryrespaldo(item, route): Observable<any> {
    return this._http.post(`${environment.api_urlresp}` + route, { item }, { headers: this._checkToken.returnHeaders() })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw(/*alert("Ha ocurrido un error") ||*/ { message: "Error del Servidor" } || this.router.navigateByUrl('/')));

  }
  public postForm(fdt,route): Observable<any> {
    return this._http.post<any>(`${environment.api_url}` + route, fdt, { headers: this._checkToken.returnHeadersMulti() }).do(data => {
      if (data.error == 'token_expired') {
        this.router.navigateByUrl('/');
      } else {
        console.log(data);
      }
    });

  }


  search_word(term, route) {
    return this._http.post(`${environment.api_url}` + route, { term: '' }, { headers: this._checkToken.returnHeaders() })
      .subscribe(data => console.log(data));
  }

  put(route: string, item: any) {
    return this._http.put(`${environment.api_url}` + route, { item }, { headers: this._checkToken.returnHeaders() })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw({ message: "Error del Servidor" } || this.router.navigateByUrl('/')));

  }

  delete(route: string) {
    return this._http.delete(`${environment.api_url}` + route, { headers: this._checkToken.returnHeaders() })
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw({ message: "Error del Servidor" }));
  }
}

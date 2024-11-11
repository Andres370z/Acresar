import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { TokenCheckserviceService } from './token-checkservice.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";


import { Router } from '@angular/router';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _http: HttpClient, public _auth: AuthService, public _checkToken: TokenCheckserviceService, private router: Router) {
    this._checkToken.check_token_session();

  }

  public uploadFileAse(fdt): Observable<any> {
    return this._http.post<any>(`${environment.api}/upload/aseguradoras`, fdt, {
      headers: this._checkToken.returnHeadersMulti()
    }).pipe(
      tap(data => {
        if (data.error === 'token_expired') {
          this.router.navigateByUrl('/');
        } else {
          console.log(data);
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
  public getQuery(route: string): Observable<any> {
    return this._http.get(`${environment.api}` + route, { headers: this._checkToken.returnHeaders() }).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        return throwError({ message: "Error del Servidor" } || this.router.navigateByUrl('/'));
      })
    );
  }

  public uploadFile(fdt): Observable<any> {
    return this._http.post<any>(`${environment.api}upload/reacoex`, fdt, { headers: this._checkToken.returnHeadersMulti() }).pipe(
      tap(data => {
        if (data.error === 'token_expired') {
          this.router.navigateByUrl('/');
        } else {
          console.log(data);
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  public uploadFileMonitoring(fdt): Observable<any> {
    return this._http.post<any>(`${environment.api}upload/monitoring`, fdt, { headers: this._checkToken.returnHeadersMulti() }).pipe(
      tap(data => {
        if (data.error === 'token_expired') {
          this.router.navigateByUrl('/');
        } else {
          console.log(data);
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  public uploadGetFileMonitoring(): Observable<any> {
    return this._http.get<any>(`${environment.api}upload/getmonitoring`).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  public uploadFilePrimas(fdt): Observable<any> {
    return this._http.post<any>(`${environment.api}primas/carga`, fdt, { headers: this._checkToken.returnHeadersMulti() }).pipe(
      tap(data => {
        if (data.error === 'token_expired') {
          this.router.navigateByUrl('/');
        } else {
          console.log(data);
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  public upload(fdt, url): Observable<any> {
    return this._http.post<any>(`${environment.api}` + url, fdt, { headers: this._checkToken.returnHeadersMulti() }).pipe(
      tap(data => {
        if (data.error === 'token_expired') {
          this.router.navigateByUrl('/');
        } else {
          console.log(data);
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getAll(): Observable<any> {
    return this._http.get(`${environment.api}/entidades`, { headers: this._checkToken.returnHeaders() }).pipe(
      map((response: any) => response), // Tipar el response según lo que devuelva tu API
      catchError((error: any) => {
        alert("Error: " + error.message || "Error del Servidor");
        this.router.navigateByUrl('/');
        return throwError(error);
      })
    );
  }
}

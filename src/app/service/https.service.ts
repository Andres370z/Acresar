import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstoreService } from './localstore.service';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  private api = environment.api
  private api2 = environment.api2
  private api2Respaldo = environment.apiRespaldo
  constructor(
    private localstorage: LocalstoreService,
    private http: HttpClient) {
    
  }
  public headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  POST = async (sub: string, obj: any) => await this.http.post<any>(this.api + sub, obj).toPromise();
  POSTDATA = async (sub: string, obj: any) => await this.http.post<any>(this.api + sub, obj, { headers: this.headers }).toPromise();
  GET = async (sub: string) => await this.http.get<any>(this.api + sub).toPromise();
  PUT = async (sub: string, obj: any) => await this.http.put<any>(this.api + sub, obj).toPromise();
  DELETE = async (sub: string) => await this.http.delete<any>(this.api + sub).toPromise();


  GETER = async (sub: string) => await this.http.get<any>(this.api + sub).toPromise();
  GETERESPALDO = async (sub: string) => await this.http.get<any>(this.api2 + sub).toPromise();
  POSTS = async (sub: string, obj: any) => await this.http.post<any>(this.api + sub, obj).toPromise();
  POSTRESPALDO = async (sub: string, obj: any) => await this.http.post<any>(this.api2Respaldo + sub, obj).toPromise()
  DELETED = async (sub: string) => await this.http.delete<any>(this.api2Respaldo + sub).toPromise();
  PUTS = async (sub: string, obj: any) => await this.http.put<any>(this.api2Respaldo + sub, obj).toPromise();


  getRes() {
    console.log('desde el servicio');

  }
  getProd(){
    console.log('desde el servicio produccion');

  }
  actualizarURLs(entorno: 'pruebas' | 'produccion') {
    if (entorno === 'pruebas') {
      this.api = 'https://systemresolutiondesarrollo.softsaenz.com.co/api/';
      this.api2 = 'https://www.api.acresarconsultores.com/api';
      this.api2Respaldo = 'https://systemresolutiondesarrollo.softsaenz.com.co/api/';
    } else if (entorno === 'produccion') {
      this.api = 'https://api.produccion.com';
      this.api2 = 'https://api2.produccion.com';
      this.api2Respaldo = 'https://apiRespaldo.produccion.com';
    }
  }

} 

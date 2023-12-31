import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  private api = environment.api
  private api2 = environment.api2
  constructor( 
    private http: HttpClient) { }
    public headers=new HttpHeaders().set('Content-Type','multipart/form-data');
    POST =async (sub: string, obj: any) => await this.http.post<any>(this.api + sub , obj).toPromise();
    POSTDATA =async (sub: string, obj: any) => await this.http.post<any>(this.api + sub , obj, {headers: this.headers}).toPromise();
    GET = async (sub: string) => await this.http.get<any>(this.api + sub).toPromise();
    PUT = async (sub: string,obj:any) => await this.http.put<any>(this.api + sub, obj).toPromise();
    DELETE = async(sub: string) => await this.http.delete<any>(this.api + sub).toPromise();

    GETER = async (sub: string) => await this.http.get<any>(this.api2 + sub).toPromise();
    POSTS = async (sub: string, obj: any) => await this.http.post<any>(this.api2 + sub, obj).toPromise();
}

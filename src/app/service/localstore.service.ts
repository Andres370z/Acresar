import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {
  private authUser: any;
  public uName: string;
  public uPhoto: string;
  public uProfile: string;
  public uDate: Date;
  private _router: any;
  public login: string = "token"
  public customerDetail: string = "customerDetail"
  constructor() { }

  setSuccessLogin(item: any) {
    localStorage.setItem(this.login, JSON.stringify(item))
  }

  getSuccessLogin(): any {
    let dataUSers: string = `${localStorage.getItem(this.login)}`;
    return JSON.parse(dataUSers);
  }

  setItem(item: any, data: string) {
    localStorage.setItem(data, JSON.stringify(item))
  }

  getItem(data: string): any {
    let dataUSers: string = `${localStorage.getItem(data)}`;
    return JSON.parse(dataUSers);
  }
  clear() {
    localStorage.clear();
  }
  removeEnd(data: string) {
    localStorage.removeItem(data)
  }
  getAuthUser() {

    let data = atob(localStorage.getItem('rsltnsri'));
    this.authUser = JSON.parse(data);
    this.uName = this.authUser.name + ' ' + this.authUser.lastName;
    this.uPhoto = this.authUser.photo;
    this.uDate = this.authUser.created_at;
  }
}

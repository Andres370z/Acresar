import { Injectable } from '@angular/core';
import { HttpsService } from './https.service';
import { LocalstoreService } from './localstore.service';
import { RoutersLink } from '../models/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private registeresquest: HttpsService,
    private localStore: LocalstoreService,
  ) { }


  resgisterMenu(inform:any){
    return  this.registeresquest.POST(RoutersLink.menuList, inform)
  }
  
  getMenu(id:number){
    return  this.registeresquest.GET(RoutersLink.getMenu+'/'+id)
  }
  
  createMenu(inform:any){
    return  this.registeresquest.POST(RoutersLink.getMenu, inform)
  }

  editMenu(inform:any){
    return  this.registeresquest.POST(RoutersLink.editList, inform)
  }
  
}

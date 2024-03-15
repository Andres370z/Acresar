import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menssage, RoutersLink } from 'src/app/models/router';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  img = environment.img;
  public menu: any = [];
  constructor(
    private router: Router,
    private localStore: LocalstoreService,
  ) { 
    this.menu = this.localStore.getItem(Menssage.menuSelect);
    if (this.menu == null) {
      this.router.navigate([RoutersLink.content])
    }
    console.log(this.menu)
  }
  ngOnDestroy(): void {
    //this.localStore.removeEnd(Menssage.menuSelect);
  }

  ngOnInit(): void {
  }
  navigate(item: string){
    this.router.navigate([item]);
  }
}
